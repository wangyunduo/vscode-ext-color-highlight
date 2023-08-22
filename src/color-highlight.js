'use strict';
import { workspace, window, Range } from 'vscode';
import { findScssVars } from './strategies/scss-vars';
import { findLessVars } from './strategies/less-vars';
import { findStylVars } from './strategies/styl-vars';
import { findCssVars } from './strategies/css-vars';
import { getColorFinders } from './strategies/functions';
import { getRgbNoFnFinders } from './strategies/specialColorFindFunctions/rgbWithoutFunction';
import { findHexARGB, findHexRGBA } from './strategies/specialColorFindFunctions/hex';
import { findWords } from './strategies/specialColorFindFunctions/words';
import { DecorationMap } from './lib/decoration-map';
import { dirname } from 'path';

const colorWordsLanguages = ['css', 'scss', 'sass', 'less', 'stylus'];

export class DocumentHighlight {
  /**
   * Creates an instance of DocumentHighlight.
   * @param {TextDocument} document
   * @param {any} viewConfig
   *
   * @memberOf DocumentHighlight
   */
  constructor(document, viewConfig) {
    this.disposed = false;

    this.document = document;
    this.strategies = getColorFinders();

    if (viewConfig.useARGB == true) {
      this.strategies.push(findHexARGB);
    } else {
      this.strategies.push(findHexRGBA);
    }

    if (colorWordsLanguages.indexOf(document.languageId) > -1 || viewConfig.matchWords) {
      this.strategies.push(findWords);
    }

    if (viewConfig.matchRgbWithNoFunction) {
      let isValid = false;

      if (viewConfig.rgbWithNoFunctionLanguages.indexOf('*') > -1) {
        isValid = true;
      }

      if (viewConfig.rgbWithNoFunctionLanguages.indexOf(document.languageId) > -1) {
        isValid = true;
      }

      if (viewConfig.rgbWithNoFunctionLanguages.indexOf(`!${document.languageId}`) > -1) {
        isValid = false;
      }

      if (isValid) this.strategies.push(...getRgbNoFnFinders());
    }

    // todo: coupling findXxxVars together
    switch (document.languageId) {
      case 'css':
        this.strategies.push(findCssVars);
        break;
      case 'less':
        this.strategies.push(findLessVars);
        break;
      case 'stylus':
        this.strategies.push(findStylVars);
        break;
      case 'sass':
      case 'scss':
        this.strategies.push(text =>
          findScssVars(text, {
            data: text,
            cwd: dirname(document.uri.fsPath),
            extensions: ['.scss', '.sass'],
            includePaths: viewConfig.sass.includePaths || [],
          }),
        );
        break;
    }

    this.initialize(viewConfig);
  }

  initialize(viewConfig) {
    this.decorations = new DecorationMap(viewConfig);
    this.listener = workspace.onDidChangeTextDocument(({ document }) => this.onUpdate(document));
  }

  /**
   *
   * @param {TextDocumentChangeEvent} e
   *
   * @memberOf DocumentHighlight
   */
  onUpdate(document = this.document) {
    if (this.disposed || this.document.uri.toString() !== document.uri.toString()) {
      return;
    }

    const text = this.document.getText();
    const version = this.document.version.toString();

    return this.updateRange(text, version);
  }

  /**
   * @param {string} text
   * @param {string} version
   *
   * @memberOf DocumentHighlight
   */
  async updateRange(text, version) {
    try {
      const result = await Promise.all(this.strategies.map(fn => fn(text)));

      const actualVersion = this.document.version.toString();
      if (actualVersion !== version) {
        if (process.env.COLOR_HIGHLIGHT_DEBUG) throw new Error('Document version already has changed');

        return;
      }

      const colorRanges = groupByColor(concatAll(result));

      if (this.disposed) {
        return false;
      }

      const updateStack = this.decorations.keys().reduce((state, color) => {
        state[color] = [];
        return state;
      }, {});

      for (const color in colorRanges) {
        updateStack[color] = colorRanges[color].map(item => {
          return new Range(this.document.positionAt(item.start), this.document.positionAt(item.end));
        });
      }

      for (const color in updateStack) {
        const decoration = this.decorations.get(color);

        window.visibleTextEditors
          .filter(({ document }) => document.uri === this.document.uri)
          .forEach(editor => editor.setDecorations(decoration, updateStack[color]));
      }
    } catch (error) {
      console.error(error);
    }
  }

  dispose() {
    this.disposed = true;
    this.decorations.dispose();
    this.listener.dispose();

    this.decorations = null;
    this.document = null;
    this.colors = null;
    this.listener = null;
  }
}

function groupByColor(results) {
  return results.reduce((collection, item) => {
    if (!collection[item.color]) {
      collection[item.color] = [];
    }

    collection[item.color].push(item);

    return collection;
  }, {});
}

function concatAll(arr) {
  return arr.reduce((result, item) => result.concat(item), []);
}
