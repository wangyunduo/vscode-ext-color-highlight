# [vscode-ext-color-highlight-css-color-4](https://github.com/wangyunduo/vscode-ext-color-highlight)

`Hue show better version` `v1.1.3`

This extension styles css/web colors found in your document.

`Hue show better version` is optimized for styling colors in `hsl` and `hwb` formats. In addition, some useful new features are provided.

> Forked from [enyancc/vscode-ext-color-highlight](https://github.com/enyancc/vscode-ext-color-highlight) [2.6.0](https://github.com/enyancc/vscode-ext-color-highlight/commit/913740fe316bba2bd44b9e15f0461a421f5c382c)

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

## Compared with Color Highlight

| Features                                                     | [Hue show better version](https://marketplace.visualstudio.com/items?itemName=Yunduo.color-highlight-css-color-4) | [Color Highlight](https://marketplace.visualstudio.com/items?itemName=naumovs.color-highlight) | Color Highlight [v2.6.0](https://github.com/enyancc/vscode-ext-color-highlight/commit/913740fe316bba2bd44b9e15f0461a421f5c382c) (unreleased) |
| :----------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------- |
| `rgb()`, `hsl()`, `hwb()` syntax in CSS Color Module Level 4 | ✅ Fully supported                                                                                                | Not supported                                                                                  | Partially supported                                                                                                                          |
| Hex colors in ARGB format                                    | ✅ Supported ARGB and AARRGGBB                                                                                    | Not supported                                                                                  | Supported AARRGGBB only                                                                                                                      |
| Variables in style sheets                                    | ✅ Supported all color formats that can be highlighted                                                            | Supported hex color only                                                                       | Supported hex color only                                                                                                                     |
| Background color for highlighting colors with transparency   | ✅ Supported                                                                                                      | Not supported                                                                                  | Not supported                                                                                                                                |
| Dynamic text color                                           | ✅ Supported all color formats that can be highlighted                                                            | Supported partial hex and rgb colors only                                                      | Supported partial hex and rgb colors only                                                                                                    |

## Install

In VSC press Ctrl+Shift+P (Cmd+Shift+P on Mac) then type ">ext install", hit enter, search "Color Highlight".

Still confused? Click "Get Started" above.

## Useful settings

| ID                                                    | Description                                                                                                      |
| :---------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------- |
| `color-highlight.languagesHighlightNamedColors`       | Language IDs to highlight named colors (red, green, blue, etc.).                                                 |
| `color-highlight.matchArgb`                           | Matching hex colors in ARGB format.                                                                              |
| `color-highlight.languagesHighlightArgb`              | Language IDs to highlight hex color in ARGB format.                                                              |
| `color-highlight.matchRgbWithNoFunction`              | Matching rgb color without using rgb() function (e.g. '255, 255, 255', [100%, 100%, 100%], '255 255 255', etc.). |
| `color-highlight.languagesHighlightRgbWithNoFunction` | Language IDs to highlight rgb color without using the rgb() function                                             |
| `color-highlight.markerBackground`                    | Background color for highlighting colors with alpha value less than 1.                                           |
| `color-highlight.markerType`                          | Style of the highlight. Can be `dot-before`, `dot-after`, `foreground`, `background`, `outline`, `underline`.    |

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
