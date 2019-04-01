import { all, takeLatest, call, put, select } from "redux-saga/effects";
import api from "../../services/api";
import { navigate } from "../../services/navigation";

import { Creators as LoginActions, Types as LoginTypes } from "../ducks/login";
import {
  Creators as RepositoriesActions,
  Types as RepositoriesTypes
} from "../ducks/repositories";

function* login(action) {
  const { username } = action.payload;

  try {
    yield call(api.get, `/users/${username}`);
    yield put(LoginActions.loginSuccess(username));
    navigate("Repositories");
  } catch (err) {
    yield put(LoginActions.loginFailure());
    console.tron.log("Deu Erro");
  }
}

function* loadRepositories() {
  try {
    const { username } = yield select(state => state.login);
    const response = yield call(api.get, `/users/${username}/repos`);
    yield put(RepositoriesActions.loadRepositoriesSuccess(response.data));
  } catch (err) {
    yield put(RepositoriesActions.loadRepositoriesFailure());
  }
}

export default function* rootSaga() {
  return yield all([
    takeLatest(LoginTypes.REQUEST, login),
    takeLatest(RepositoriesTypes.LOAD_REQUEST, loadRepositories)
  ]);
}
