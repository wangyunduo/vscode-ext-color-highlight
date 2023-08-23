# [vscode-ext-color-highlight-css-color-4](https://github.com/wangyunduo/vscode-ext-color-highlight)

`Hue show better version`

`v1.1.0`

This extension styles css/web colors found in your document.

This particular version is optimized for styling colors in `hsl` and `hwb` formats.

Forked from [enyancc/vscode-ext-color-highlight](https://github.com/enyancc/vscode-ext-color-highlight) [2.6.0](https://github.com/enyancc/vscode-ext-color-highlight/commit/913740fe316bba2bd44b9e15f0461a421f5c382c)

## Features

- Color highlight
  - Full support the syntax of functions `rbg()`, `hsl()`, `hwb()` in CSS Color Module Level 4.
    - `rbg()`: [RGB functions](https://www.w3.org/TR/css-color-4/#rgb-functions)
    - `hsl()`: [HSL Colors](https://www.w3.org/TR/css-color-4/#the-hsl-notation)
    - `hwb()`: [HWB Colors](https://www.w3.org/TR/css-color-4/#the-hwb-notation)
  - Hex colors
    - Default: #RGB, #RGBA, #RRGGBB, #RRGGBBAA
    - ARGB mode: #ARGB, #AARRGGBB
  - All [Named colors](https://www.w3.org/TR/css-color-4/#named-colors) in CSS Color Module Level 4.
  - Variables in style sheets
    - css, less, stylus, scss and sass
    - variables imported from the files (sass, scss)
- Background color
  - Support background color setting to highlight colors with transparency (i.e., alpha values less than 1).
- Dynamic text color
  - Follow [WCAG 2.0 guidelines](https://www.w3.org/TR/WCAG20/)
  - Full support the syntax of functions `rbg()`, `hsl()`, `hwb()` in CSS Color Module Level 4.
  - Support hex colors and variables in style sheets.

## Install

In VSC press Ctrl+Shift+P (Cmd+Shift+P on Mac) then type ">ext install", hit enter, search "Color Highlight".

Still confused? Click "Get Started" above.

## Develop

Feel free to contribute!

### Node version

v16 recommended

The following error occurs when using v18 build.

```plaintext
Error: error:0308010C:digital envelope routines::unsupported
    at new Hash (node:internal/crypto/hash:71:19)
...
```
