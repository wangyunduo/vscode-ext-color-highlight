import { findColors, sortStringsDesc } from './functions';
import { parseImports } from '../lib/sass-importer';

const cssVar = /^\s*(--[-\w]+)\s*:\s*(.*)$/gm;
const lessVar = /^\s*\@([-\w]+)\s*:\s*(.*)$/gm;
const stylusVar = /^\s*\$?([-\w]+)\s*=\s*(.*)$/gm;
const scssVar = /^\s*\$([-\w]+)\s*:\s*(.*)$/gm;

function getCssVarNamesRegex(varNames) {
  return new RegExp(`var\\((${varNames.join('|')})\\)`, 'g');
}

function getLessVarNamesRegex(varNames) {
  return new RegExp(`\\@(${varNames.join('|')})(?!-|\\s*:)`, 'g');
}

function getStylusVarNamesRegex(varNames) {
  return new RegExp(`\\$?(${varNames.join('|')})(?!-|\\s*=)`, 'g');
}

function getScssVarNamesRegex(varNames) {
  return new RegExp(`\\$(${varNames.join('|')})(?!-|\\s*:)`, 'g');
}

export function findCssVars(text) {
  return findVars(text, cssVar, getCssVarNamesRegex);
}

export function findLessVars(text) {
  return findVars(text, lessVar, getLessVarNamesRegex);
}

export function findStylusVars(text) {
  return findVars(text, stylusVar, getStylusVarNamesRegex);
}

export function findScssVars(text, importerOptions) {
  return findVars(text, scssVar, getScssVarNamesRegex, importerOptions);
}

/**
 * @param {string} text
 * @returns {{
 *  start: number,
 *  end: number,
 *  color: string
 * }}
 */
async function findVars(text, varPattern, varNamesRegexGetter, importerOptions) {
  let varText = text;

  // * importer for scss files
  if (importerOptions) {
    try {
      varText = await parseImports(importerOptions);
    } catch (err) {
      console.log('Error during imports loading, falling back to local variables parsing');
    }
  }

  let match = varPattern.exec(varText);
  let result = [];

  const varColor = {};
  let varNames = [];

  while (match !== null) {
    const name = match[1];
    const value = match[2];
    const values = await Promise.all(findColors(value));

    if (values.length) {
      varNames.push(name);
      values.forEach(value => {
        if (value.length) {
          varColor[name] = value[0].color;
        }
      });
    }

    match = varPattern.exec(varText);
  }

  if (!varNames.length) {
    return [];
  }

  varNames = sortStringsDesc(varNames);

  const varNamesRegex = varNamesRegexGetter(varNames);

  match = varNamesRegex.exec(text);

  while (match !== null) {
    const start = match.index;
    const end = varNamesRegex.lastIndex;
    const varName = match[1];

    result.push({
      start,
      end,
      color: varColor[varName],
    });

    match = varNamesRegex.exec(text);
  }

  return result;
}
