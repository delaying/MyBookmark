import axios from "axios";
import {
  all,
  delay,
  fork,
  put,
  takeLatest,
  throttle,
  call,
} from "redux-saga/effects";

import {
  ADD_SITE_FAILURE,
  ADD_SITE_REQUEST,
  ADD_SITE_SUCCESS,
  REMOVE_SITE_FAILURE,
  REMOVE_SITE_REQUEST,
  REMOVE_SITE_SUCCESS,
  ADD_FOLDER_FAILURE,
  ADD_FOLDER_REQUEST,
  ADD_FOLDER_SUCCESS,
  ADD_SUBFOLDER_FAILURE,
  ADD_SUBFOLDER_REQUEST,
  ADD_SUBFOLDER_SUCCESS,
  LOAD_FOLDERS_FAILURE,
  LOAD_FOLDERS_REQUEST,
  LOAD_FOLDERS_SUCCESS,
  LOAD_HASHTAGS_SITES_FAILURE,
  LOAD_HASHTAGS_SITES_REQUEST,
  LOAD_HASHTAGS_SITES_SUCCESS,
  REMOVE_FOLDER_FAILURE,
  REMOVE_FOLDER_REQUEST,
  REMOVE_FOLDER_SUCCESS,
  REMOVE_SUBFOLDER_FAILURE,
  REMOVE_SUBFOLDER_REQUEST,
  REMOVE_SUBFOLDER_SUCCESS,
  CHANGE_FOLDER_FAILURE,
  CHANGE_FOLDER_REQUEST,
  CHANGE_FOLDER_SUCCESS,
  CHANGE_SUBFOLDER_FAILURE,
  CHANGE_SUBFOLDER_REQUEST,
  CHANGE_SUBFOLDER_SUCCESS,
  CHANGE_SITE_FAILURE,
  CHANGE_SITE_REQUEST,
  CHANGE_SITE_SUCCESS,
} from "../reducers/post";
import {
  ADD_FOLDER_TO_ME,
  ADD_SITE_TO_ME,
  ADD_SUBFOLDER_TO_ME,
  REMOVE_FOLDER_OF_ME,
  REMOVE_SITE_OF_ME,
  REMOVE_SUBFOLDER_OF_ME,
} from "../reducers/user";

function loadFoldersAPI(data) {
  return axios.get(`/folder/${data}`);
}

function* loadFolders(action) {
  try {
    const result = yield call(loadFoldersAPI, action.data);
    yield put({
      type: LOAD_FOLDERS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_FOLDERS_FAILURE,
      data: err.response.data,
    });
  }
}

function loadHashtagSitesAPI(data) {
  return axios.get(`/hashtag/${encodeURIComponent(data)}`);
}

function* loadHashtagSites(action) {
  try {
    const result = yield call(loadHashtagSitesAPI, action.data);
    yield put({
      type: LOAD_HASHTAGS_SITES_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_HASHTAGS_SITES_FAILURE,
      data: err.response,
    });
  }
}

function addFolderAPI(data) {
  return axios.post("/folder", data);
}

function* addFolder(action) {
  try {
    const result = yield call(addFolderAPI, action.data);
    console.log(result);
    yield put({
      type: ADD_FOLDER_SUCCESS,
      data: result.data,
    });
    // yield put({
    //   type: ADD_FOLDER_TO_ME,
    //   data: result.data,
    // });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_FOLDER_FAILURE,
      data: err.response.data,
    });
  }
}

function addSubfolderAPI(data) {
  return axios.post(`/folder/${data.folderId}/subfolder`, data);
}

function* addSubfolder(action) {
  try {
    const result = yield call(addSubfolderAPI, action.data);
    yield put({
      type: ADD_SUBFOLDER_SUCCESS,
      data: result.data,
    });
    yield put({
      type: ADD_SUBFOLDER_TO_ME,
      data: action.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_SUBFOLDER_FAILURE,
      data: err.response.data,
    });
  }
}

function removeFolderAPI(data) {
  return axios.delete(`/folder/${data}`);
}

function* removeFolder(action) {
  try {
    const result = yield call(removeFolderAPI, action.data);
    yield put({
      type: REMOVE_FOLDER_SUCCESS,
      data: result.data,
    });
    yield put({
      type: REMOVE_FOLDER_OF_ME,
      data: action.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_FOLDER_FAILURE,
      data: err.response.data,
    });
  }
}

function removeSubfolderAPI(data) {
  return axios.delete(`/folder/subfolder/${data}`);
}

function* removeSubfolder(action) {
  try {
    const result = yield call(removeSubfolderAPI, action.data);
    yield put({
      type: REMOVE_SUBFOLDER_SUCCESS,
      data: result.data,
    });
    yield put({
      type: REMOVE_SUBFOLDER_OF_ME,
      data: action.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_SUBFOLDER_FAILURE,
      data: err.response.data,
    });
  }
}

function changeFolderAPI(data) {
  return axios.patch(`/folder/${data.FolderId}`, data);
}

function* changeFolder(action) {
  try {
    const result = yield call(changeFolderAPI, action.data);
    yield put({
      type: CHANGE_FOLDER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CHANGE_FOLDER_FAILURE,
      data: err.response.data,
    });
  }
}

function changeSubfolderAPI(data) {
  return axios.patch(
    `/folder/${data.FolderId}/subfolder/${data.SubfolderId}`,
    data
  );
}

function* changeSubfolder(action) {
  try {
    const result = yield call(changeSubfolderAPI, action.data);
    yield put({
      type: CHANGE_SUBFOLDER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CHANGE_SUBFOLDER_FAILURE,
      data: err.response.data,
    });
  }
}

function changeSiteAPI(data) {
  return axios.patch(
    `/folder/subfolder/${data.SubfolderId}/site/${data.SiteId}`,
    data
  );
}

function* changeSite(action) {
  try {
    const result = yield call(changeSiteAPI, action.data);
    yield put({
      type: CHANGE_SITE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CHANGE_SITE_FAILURE,
      data: err.response.data,
    });
  }
}

function addSiteAPI(data) {
  return axios.post(
    `/folder/${data.folderId}/subfolder/${data.subfolderId}/site`,
    data
  );
}

function* addSite(action) {
  try {
    const result = yield call(addSiteAPI, action.data);
    yield put({
      type: ADD_SITE_SUCCESS,
      data: result.data,
    });
    yield put({
      type: ADD_SITE_TO_ME,
      data: action.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_SITE_FAILURE,
      data: err.response.data,
    });
  }
}

function removeSiteAPI(data) {
  return axios.delete(`/folder/site/${data}`);
}

function* removeSite(action) {
  try {
    const result = yield call(removeSiteAPI, action.data);
    yield put({
      type: REMOVE_SITE_SUCCESS,
      data: result.data,
    });
    yield put({
      type: REMOVE_SITE_OF_ME,
      data: action.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_SITE_FAILURE,
      data: err.response.data,
    });
  }
}

function* watchLoadFolders() {
  yield takeLatest(LOAD_FOLDERS_REQUEST, loadFolders);
}
function* watchLoadHashtagSits() {
  yield takeLatest(LOAD_HASHTAGS_SITES_REQUEST, loadHashtagSites);
}

function* watchAddFolder() {
  yield takeLatest(ADD_FOLDER_REQUEST, addFolder);
}

function* watchAddSubfolder() {
  yield takeLatest(ADD_SUBFOLDER_REQUEST, addSubfolder);
}

function* watchRemoveFolder() {
  yield takeLatest(REMOVE_FOLDER_REQUEST, removeFolder);
}

function* watchRemoveSubfolder() {
  yield takeLatest(REMOVE_SUBFOLDER_REQUEST, removeSubfolder);
}

function* watchChangeFolder() {
  yield takeLatest(CHANGE_FOLDER_REQUEST, changeFolder);
}

function* watchChangeSubfolder() {
  yield takeLatest(CHANGE_SUBFOLDER_REQUEST, changeSubfolder);
}

function* watchChangeSite() {
  yield takeLatest(CHANGE_SITE_REQUEST, changeSite);
}

function* watchAddSite() {
  yield takeLatest(ADD_SITE_REQUEST, addSite);
}

function* watchRemoveSite() {
  yield takeLatest(REMOVE_SITE_REQUEST, removeSite);
}

export default function* postSaga() {
  yield all([
    fork(watchAddFolder),
    fork(watchAddSubfolder),
    fork(watchLoadFolders),
    fork(watchLoadHashtagSits),
    fork(watchRemoveFolder),
    fork(watchRemoveSubfolder),
    fork(watchChangeFolder),
    fork(watchChangeSubfolder),
    fork(watchChangeSite),
    fork(watchAddSite),
    fork(watchRemoveSite),
  ]);
}
