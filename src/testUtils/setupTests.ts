import '@testing-library/jest-dom';

import 'utils/common/requestIdlePolyfill';
// @ts-ignore
import getRandomValues from 'polyfill-crypto.getrandomvalues';

import server from './mocks/server';

// @ts-ignore
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
// @ts-ignore
globalThis.crypto = { getRandomValues };

const defineFontFaceSetMockAPI = () => {
  const FontFaceSet: object[] = [];
  Object.defineProperties(FontFaceSet, {
    ready: {
      value: Promise.resolve({}),
    },
    forEach: { value: jest.fn() },
    values: { value: () => [] },
  });

  Object.defineProperty(document, 'fonts', {
    value: FontFaceSet,
  });
};

beforeAll(() => {
  // Establish API mocking before all tests.
  server.listen({ onUnhandledRequest: 'bypass' });

  defineFontFaceSetMockAPI();
});

// Cleanup sessionStorage after each test
beforeEach(() => window.sessionStorage.clear());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());
