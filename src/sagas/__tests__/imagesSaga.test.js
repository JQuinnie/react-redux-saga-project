import { runSaga } from 'redux-saga';

import { setImages, setError } from '../../actions';
import { getPage, handleImagesLoad } from '../imagesSaga';
import * as api from '../../api'; // gives back all the exports from api file

beforeEach(() => {
  jest.resetAllMocks();
});

it('should have the getPage selector function give back the page', () => {
  const nextPage = 1;
  const state = { nextPage };
  const result = getPage(state); // pass state into selector function

  expect(result).toBe(nextPage);
});

it('should load images and handle them in case of success', async () => {
  // assertions based on the dispatched actions
  const dispatchedActions = [];

  // mock the api function call
  // api.fetchImages will mutate the dependency which should be reset via cleanup after testing
  // see beforeEach
  const mockedImages = ['abc', 'div'];
  api.fetchImages = jest.fn(() => Promise.resolve(mockedImages));

  // make assertions on a fake store
  const fakeStore = {
    getState: () => ({ nextPage: 1 }),
    dispatch: (action) => dispatchedActions.push(action),
  };

  // wait for saga to finish
  await runSaga(fakeStore, handleImagesLoad).toPromise();

  expect(api.fetchImages.mock.calls.length).toBe(1);
  // assert setImages action was dispatched (images are loaded successfully)
  expect(dispatchedActions).toContainEqual(setImages(mockedImages));
});

it('should handle errors in case of failure', async () => {
  const dispatchedActions = [];

  const error = 'thrown error';
  api.fetchImages = jest.fn(() => Promise.reject(error));

  const fakeStore = {
    getState: () => ({ nextPage: 1 }),
    dispatch: (action) => dispatchedActions.push(action),
  };

  await runSaga(fakeStore, handleImagesLoad).toPromise();

  expect(api.fetchImages.mock.calls.length).toBe(1);
  expect(dispatchedActions).toContainEqual(setError(error));
});
