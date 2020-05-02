import { take, fork, put, call } from 'redux-saga/effects';

import { IMAGES } from '../constants';
import { fetchImageStats } from '../api';
import { loadImageStats, setImageStats, setImageStatsError } from '../actions';

function* handleStatsRequest(id) {
  // edge case, include retry if there was an error
  for (let i = 0; i < 3; i++) {
    try {
      // dispatch action to request
      yield put(loadImageStats(id));
      // call the fetchImageStats for particular image
      const res = yield call(fetchImageStats, id);
      // put image download stats into the Store
      yield put(setImageStats(id, res.downloads.total));
      return true; // exit loop
    } catch (e) {
      // just need to retry and dispatch an error
    }
  }
  yield put(setImageStatsError(id));
}

// once images are loaded into the app, fire request for every image fetching stats
// watch for success action on images (setImages -> IMAGES.LOAD_SUCCESS)
export default function* watchStatsRequest() {
  while (true) {
    const { images } = yield take(IMAGES.LOAD_SUCCESS);

    for (let i = 0; i < images.length; i++) {
      // fork is similar to call but it is non-blocking and in parallel
      yield fork(handleStatsRequest, images[i].id);
    }
  }
}
