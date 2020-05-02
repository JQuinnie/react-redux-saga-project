import { all } from 'redux-saga/effects';

import imagesSaga from './imagesSaga';
import statsSaga from './statsSaga';

// watcher saga -> listens to actions -> invoke worker saga

export default function* rootSaga() {
  yield all([imagesSaga(), statsSaga()]);
}
