const postcss = require('postcss');
const plugin = require('./index');

function run(input, output, opts = {}) {
  return postcss([plugin(opts)])
    .process(input, { from: undefined })
    .then((result) => {
      expect(result.css).toEqual(output);
      expect(result.warnings().length).toBe(0);
    });
}

it('with single quotes', () => {
  const input = "@google-font 'Lato' 700;";
  const expectedOutput =
    '@import url(https://fonts.googleapis.com/css?family=Lato:700);';

  return run(input, expectedOutput, {});
});

it('with double quotes', () => {
  const input = '@google-font "Lato" 700;';
  const expectedOutput =
    '@import url(https://fonts.googleapis.com/css?family=Lato:700);';

  return run(input, expectedOutput, {});
});

it('without any quotes', () => {
  const input = '@google-font Lato 700;';
  const expectedOutput =
    '@import url(https://fonts.googleapis.com/css?family=Lato:700);';

  return run(input, expectedOutput, {});
});

it('with multiple styles', () => {
  const input = '@google-font Lato 700,400italic;';
  const expectedOutput =
    '@import url(https://fonts.googleapis.com/css?family=Lato:700,400italic);';

  return run(input, expectedOutput, {});
});

it('with arg', () => {
  const input = '@google-font Lato 700 subset=latin;';
  const expectedOutput =
    '@import url(https://fonts.googleapis.com/css?family=Lato:700&subset=latin);';

  return run(input, expectedOutput, {});
});

it('with multiple args', () => {
  const input = '@google-font Lato 700 subset=latin|latin-ext,display=swap;';
  const expectedOutput =
    '@import url(https://fonts.googleapis.com/css?family=Lato:700&subset=latin,latin-ext&display=swap);';

  return run(input, expectedOutput, {});
});

it('with compound font family name', () => {
  const input = '@google-font "Open Sans" 700;';
  const expectedOutput =
    '@import url(https://fonts.googleapis.com/css?family=Open+Sans:700);';

  return run(input, expectedOutput, {});
});
