<!-- markdownlint-disable MD024 -->

# Change Log

## [1.1.3] - 2023-08-24

### Changed

- Feature Contributions: Settings

### Docs

- Updated readme file

## [1.1.2] - 2023-08-23

### Docs

- Updated readme file
- Fixed version number in change log

## [1.1.1] - 2023-08-23

### Fixed

- named-color should be case-insensitive

## [1.1.0] - 2023-08-23

### Added

- new extension name

## [1.0.1] - unreleased

### Added

- new extension icon
- `rgbWithNoFunctionLanguages` option: default value updated
- `matchNamedColorsLanguages` option: Language IDs to highlight named colors in these language files.

## [1.0.0-base-2.6.0] - unreleased

### Added

- Full support the syntax of functions `rbg()`, `hsl()`, `hwb()` in CSS Color Module Level 4.
  - `rbg()`: [RGB functions](https://www.w3.org/TR/css-color-4/#rgb-functions)
  - `hsl()`: [HSL Colors](https://www.w3.org/TR/css-color-4/#the-hsl-notation)
  - `hwb()`: [HWB Colors](https://www.w3.org/TR/css-color-4/#the-hwb-notation)
- **`markerBackground` option:** Background color for highlighting colors with alpha value less than 1. Use #RGB, #RGBA, #RRGGBB, #RRGGBBAA or `none`.
- **Dynamic text color:** full support the syntax of functions `rbg()`, `hsl()`, `hwb()` in CSS Color Module Level 4.
- **`rgbaOnlyLanguages` option:** Language IDs for rgba only. This setting is not affected by the useARGB setting.

### Fixed

- Highlight variables in style sheets
- ARGB hex formats: support ARGB & AARRGGBB

## [2.6.0] - unreleased

### Added

- Support for css color module level 4
- "useARGB" option to toggle between RGBA and ARGB hex formats

## [2.5.0] - 2021-09-13

### Added

- Build for the web

## [2.4.0] - 2021-07-15

### Added

- Workspace Trust support (Supported completely in untrusted workspaces)
- Support for whitespace format
- Support for RGB format without rgb() and configuration options for it (Disabled by default)
- License

### Changed

- Configuration option for marker type is now a list of options

### Fixed

- Fixed contrast ratio computation to follow WCAG 2.0 guidelines

## [2.3.0] - 2017-07-11

### Added

- Highlight variables imported from the files (sass, scss)
- Configuration option for the sass imports lookup folders

## [2.2.0] - 2017-05-15

### Added

- "dot-before" marker type

## [2.1.3] - 2017-04-20

### Added

- Google form to collect the user preffered setting defaults

### Fixed

- Underline style: correct text color in comments

## [2.1.2] - 2017-04-18

### Fixed

- Correct the highlighted offset if context is analyzed

## [2.1.1] - 2017-04-18

### Fixed

- Partial variable matching in sass, less and stylus

## [2.1.0] - 2017-04-18

### Added

- hsl() and hsla() support
- Description for the configuration properties
- Basic variables support within the file (for css, sass, less, stylus)

### Fixed

- Matches in non-color contexts like link with hashes or other places
- White in white-space is colored

### Changed

- Color word matching is always "on" in the style languages (css, less, scss, sass, stylus)

## [2.0.1] - 2017-04-12

### Changed

- Default value for matchWords to false

## [2.0.0] - 2017-04-12

### Added

- Document type filters
- Two new styles for color highlight: "dot" and "foreground"
- Moved list of changes to the CHANGELOG.md file

### Changed

- Extension enabled on all documents
- Complete rewrite to gain maximum performance
- Updated to the latest vscode library

## [1.3.2] - 0000-00-00

- Feat: Add stylus

## [1.3.1] - 0000-00-00

- Feat: Add typescript language to the list
- Feat: Add option to disable the colors in ruler

## [1.3.0] - 0000-00-00

- Feat: Support hex alpha
- Fix: Accidental highlighting of strings like "#1234567890"
- Fix: Highlights non-color array keys in Drupal PHP code

## [1.2.1] - 0000-00-00

- Added new option to disable color words highlight

## [1.2] - 0000-00-00

- New styling modes for the marker: background, underline. Default is "background" now

## [1.1] - 0000-00-00

- Refactored code to prevent memory leaks
- Added configuration for the extension
- Added command highlight current file (if it's not configured to be highlighted automatically)
