# PostCSS Google Font

[PostCSS] plugin for import Google fonts.

***Syntax:*** `@google-font font-family styles [subset]`
- ***font-family***: The name of the font. ***Compound family names*** should be wrapped out
inside quotes or double quotes
- ***styles***: The styles of the font. Use the comma for separated multiples styles: `400,500,700italic`
- ***subset*** (optional): The subset of the font. Use the comma for separated multiples styles: `latin,latin-ext`

```css
@google-font Lato 400 latin;
```

```css
@import url(https://fonts.googleapis.com/css?family=Lato:400?subset=latin);
```

## Usage

```js
postcss([ require('postcss-google-font') ])
```

See [PostCSS] docs for examples for your environment.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/yordis/postcss-google-font.svg
[ci]:      https://travis-ci.org/yordis/postcss-google-font
