'use strict'

import postcss from 'postcss'
import test from 'ava'

import plugin from './../lib/index'

function run(t, input, output, opts = {}) {
  return postcss([plugin(opts)])
    .process(input)
    .then(result => {
      t.same(result.css, output)
      t.same(result.warnings().length, 0)
    })
}


test('should scape single quotes', t => {
  const input = "@google-font 'Lato' 700"
  const expectedOutput = '@import url(https://fonts.googleapis.com/css?family=Lato:700)'

  return run(t, input, expectedOutput, {})
})
//
test('should scape double quotes', t => {
  const input = '@google-font "Lato" 700'
  const expectedOutput = '@import url(https://fonts.googleapis.com/css?family=Lato:700)'

  return run(t, input, expectedOutput, {})
})

test('should work without any quotes', t => {
  const input = '@google-font Lato 700'
  const expectedOutput = '@import url(https://fonts.googleapis.com/css?family=Lato:700)'

  return run(t, input, expectedOutput, {})
})

test('with multiple styles', t => {
  const input = '@google-font Lato 700,400italic'
  const expectedOutput = '@import url(https://fonts.googleapis.com/css?family=Lato:700,400italic)'

  return run(t, input, expectedOutput, {})
})

test('with subset', t => {
  const input = '@google-font Lato 700 latin'
  const expectedOutput = '@import url(https://fonts.googleapis.com/css?family=Lato:700&subset=latin)'

  return run(t, input, expectedOutput, {})
})

test('with multiple subset', t => {
  const input = '@google-font Lato 700 latin,latin-ext'
  const expectedOutput = '@import url(https://fonts.googleapis.com/css?family=Lato:700&subset=latin,latin-ext)'

  return run(t, input, expectedOutput, {})
})

test('with compound font family name', t => {
  const input = '@google-font "Open Sans" 700'
  const expectedOutput = '@import url(https://fonts.googleapis.com/css?family=Open+Sans:700)'

  return run(t, input, expectedOutput, {})
})
