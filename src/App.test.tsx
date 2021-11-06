import * as React from 'react';
import { act } from 'react-dom/test-utils';
import * as ReactDOM from 'react-dom';
import App from './App';

describe('App', function () {
  it('Pure unit test', function () {
    const a = 1;
    expect(a).toBe(1);
  });
});
