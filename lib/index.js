'use strict';

const url = require('url');
const postcss = require('postcss');

function addArgToQuery(query, arg) {
  const [key, value] = arg.split('=');
  query[key] = value.replace('|', ',');
  return query;
}

/**
 * Construct the Google Font URL.
 * @param {String} family - The font family.
 * @param {String} styles - The font styles separated by comma.
 * @param {String} args - The args separated by comma
 * @returns {String}
 */
function getGoogleUrl(family, styles, args) {
  const font = `${family}:${styles}`;
  const query = {
    family: font,
  };

  if (args) {
    args.split(',').reduce(addArgToQuery, query);
  }

  /**
   * Decode the URL for human readability and follow
   * the Google Font url examples.
   */
  return decodeURIComponent(
    url.format({
      protocol: 'https',
      slashes: true,
      hostname: 'fonts.googleapis.com',
      pathname: 'css',
      query: query,
    })
  );
}

/**
 * Normalize the font family string. Remove the quotes and
 * replace the spaces with + sign.
 * @param {String} font
 * @returns {String}
 */
function normalizeFontFamily(font) {
  return font.replace(/(\'|\")/g, '').replace(' ', '+');
}

/**
 * Return the parameters from rule as an array.
 * @param {Rule} rule - The rule.
 * @returns {String[]}
 */
function getParams(rule) {
  const params = postcss.list.space(rule.params);

  params[0] = normalizeFontFamily(params[0]);

  return params;
}

/**
 * Replace google-font with the appropriate CSS value.
 * @param {Rule} rule - The rule.
 */
function replaceRule(rule) {
  if (rule.name !== 'google-font') {
    return;
  }

  const params = getParams(rule);
  const googleFontUrl = getGoogleUrl(...params);
  const importRule = postcss.atRule({
    name: 'import',
    params: `url(${googleFontUrl})`,
  });

  rule.replaceWith(importRule);
}

module.exports = postcss.plugin('postcss-google-font', () => (css) => {
  css.walkAtRules(replaceRule);
});
