import shortId from "shortid";

import produce from "../util/produce";

export const initialState = {
  mainPosts: [],
  imagePaths: [],
  hasMorePosts: true,
  loadFoldersLoading: false,
  loadFoldersDone: false,
  loadFoldersError: null,
  addFolderLoading: false,
  addFolderDone: false,
  addFolderError: null,
  addSubolderLoading: false,
  addSubfolderDone: false,
  addSubfolderError: null,
  removeFolderLoading: false,
  removeFolderDone: false,
  removeFolderError: null,
  removeSubfolderLoading: false,
  removeSubfolderDone: false,
  removeSubfolderError: null,
  changeFolderLoading: false,
  changeFolderDone: false,
  changeFolderError: null,
  addSiteLoading: false,
  addSiteDone: false,
  addSiteError: null,
  removeSiteLoading: false,
  removeSiteDone: false,
  removeSiteError: null,
};

export const LOAD_FOLDERS_REQUEST = "LOAD_FOLDERS_REQUEST";
export const LOAD_FOLDERS_SUCCESS = "LOAD_FOLDERS_SUCCESS";
export const LOAD_FOLDERS_FAILURE = "LOAD_FOLDERS_FAILURE";

export const LOAD_HASHTAGS_SITES_REQUEST = "LOAD_HASHTAGS_SITES_REQUEST";
export const LOAD_HASHTAGS_SITES_SUCCESS = "LOAD_HASHTAGS_SITES_SUCCESS";
export const LOAD_HASHTAGS_SITES_FAILURE = "LOAD_HASHTAGS_SITES_FAILURE";

export const ADD_FOLDER_REQUEST = "ADD_FOLDER_REQUEST";
export const ADD_FOLDER_SUCCESS = "ADD_FOLDER_SUCCESS";
export const ADD_FOLDER_FAILURE = "ADD_FOLDER_FAILURE";

export const ADD_SUBFOLDER_REQUEST = "ADD_SUBFOLDER_REQUEST";
export const ADD_SUBFOLDER_SUCCESS = "ADD_SUBFOLDER_SUCCESS";
export const ADD_SUBFOLDER_FAILURE = "ADD_SUBFOLDER_FAILURE";

export const REMOVE_FOLDER_REQUEST = "REMOVE_FOLDER_REQUEST";
export const REMOVE_FOLDER_SUCCESS = "REMOVE_FOLDER_SUCCESS";
export const REMOVE_FOLDER_FAILURE = "REMOVE_FOLDER_FAILURE";

export const REMOVE_SUBFOLDER_REQUEST = "REMOVE_SUBFOLDER_REQUEST";
export const REMOVE_SUBFOLDER_SUCCESS = "REMOVE_SUBFOLDER_SUCCESS";
export const REMOVE_SUBFOLDER_FAILURE = "REMOVE_SUBFOLDER_FAILURE";

export const CHANGE_FOLDER_REQUEST = "CHANGE_FOLDER_REQUEST";
export const CHANGE_FOLDER_SUCCESS = "CHANGE_FOLDER_SUCCESS";
export const CHANGE_FOLDER_FAILURE = "CHANGE_FOLDER_FAILURE";

export const CHANGE_SUBFOLDER_REQUEST = "CHANGE_SUBFOLDER_REQUEST";
export const CHANGE_SUBFOLDER_SUCCESS = "CHANGE_SUBFOLDER_SUCCESS";
export const CHANGE_SUBFOLDER_FAILURE = "CHANGE_SUBFOLDER_FAILURE";

export const CHANGE_SITE_REQUEST = "CHANGE_SITE_REQUEST";
export const CHANGE_SITE_SUCCESS = "CHANGE_SITE_SUCCESS";
export const CHANGE_SITE_FAILURE = "CHANGE_SITE_FAILURE";

export const ADD_SITE_REQUEST = "ADD_SITE_REQUEST";
export const ADD_SITE_SUCCESS = "ADD_SITE_SUCCESS";
export const ADD_SITE_FAILURE = "ADD_SITE_FAILURE";

export const REMOVE_SITE_REQUEST = "REMOVE_SITE_REQUEST";
export const REMOVE_SITE_SUCCESS = "REMOVE_SITE_SUCCESS";
export const REMOVE_SITE_FAILURE = "REMOVE_SITE_FAILURE";

export const addFolder = (data) => ({
  type: ADD_FOLDER_REQUEST,
  data,
});

export const addSubfolder = (data) => ({
  type: ADD_SUBFOLDER_REQUEST,
  data,
});

export const addSite = (data) => ({
  type: ADD_SITE_REQUEST,
  data,
});

// 이전 상태를 액션을 통해 다음 상태로 만들어내는 함수(불변성은 지키면서)
const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOAD_FOLDERS_REQUEST:
      case LOAD_HASHTAGS_SITES_REQUEST:
        draft.loadFoldersLoading = true;
        draft.loadFoldersDone = false;
        draft.loadFoldersError = null;
        break;
      case LOAD_FOLDERS_SUCCESS:
      case LOAD_HASHTAGS_SITES_SUCCESS:
        draft.loadFoldersLoading = false;
        draft.loadFoldersDone = true;
        draft.mainPosts = draft.mainPosts.concat(action.data);
        break;
      case LOAD_FOLDERS_FAILURE:
      case LOAD_HASHTAGS_SITES_FAILURE:
        draft.loadFoldersLoading = false;
        draft.loadFoldersError = action.error;
        break;
      case ADD_FOLDER_REQUEST:
        draft.addFolderLoading = true;
        draft.addFolderDone = false;
        draft.addFolderError = null;
        break;
      case ADD_FOLDER_SUCCESS:
        draft.addFolderLoading = false;
        draft.addFolderDone = true;
        draft.mainPosts.push(action.data);
        break;
      case ADD_FOLDER_FAILURE:
        draft.addFolderLoading = false;
        draft.addFolderError = action.error;
        break;
      case ADD_SUBFOLDER_REQUEST:
        draft.addSubfolderLoading = true;
        draft.addSubfolderDone = false;
        draft.addSubfolderError = null;
        break;
      case ADD_SUBFOLDER_SUCCESS:
        draft.addSubfolderLoading = false;
        draft.addSubfolderDone = true;
        break;
      case ADD_SUBFOLDER_FAILURE:
        draft.addSubfolderLoading = false;
        draft.addSubfolderError = action.error;
        break;
      case REMOVE_FOLDER_REQUEST:
        draft.removeFolderLoading = true;
        draft.removeFolderDone = false;
        draft.removeFolderError = null;
        break;
      case REMOVE_FOLDER_SUCCESS:
        draft.removeFolderLoading = false;
        draft.removeFolderDone = true;
        draft.mainPosts = draft.mainPosts.filter(
          (v) => v.id !== action.data.FolderId
        );
        break;
      case REMOVE_FOLDER_FAILURE:
        draft.removeFolderLoading = false;
        draft.removeFolderError = action.error;
        break;
      case REMOVE_SUBFOLDER_REQUEST:
        draft.removeSubfolderLoading = true;
        draft.removeSubfolderDone = false;
        draft.removeSubfolderError = null;
        break;
      case REMOVE_SUBFOLDER_SUCCESS:
        draft.removeSubfolderLoading = false;
        draft.removeSubfolderDone = true;
        draft.mainPosts = draft.mainPosts.filter(
          (v) => v.id !== action.data.SubfolderId
        );
        break;
      case REMOVE_SUBFOLDER_FAILURE:
        draft.removeSubfolderLoading = false;
        draft.removeSubfolderError = action.error;
        break;
      case CHANGE_FOLDER_REQUEST:
      case CHANGE_SUBFOLDER_REQUEST:
      case CHANGE_SITE_REQUEST:
        draft.changeFolderLoading = true;
        draft.changeFolderError = null;
        draft.changeFolderDone = false;
        break;
      case CHANGE_FOLDER_SUCCESS:
      case CHANGE_SUBFOLDER_SUCCESS:
      case CHANGE_SITE_SUCCESS:
        draft.changeFolderLoading = false;
        draft.changeFolderDone = true;
        break;
      case CHANGE_FOLDER_FAILURE:
      case CHANGE_SUBFOLDER_FAILURE:
      case CHANGE_SITE_FAILURE:
        draft.changeFolderLoading = false;
        draft.changeFolderError = action.error;
        break;
      case ADD_SITE_REQUEST:
        draft.addSiteLoading = true;
        draft.addSiteDone = false;
        draft.addSiteError = null;
        break;
      case ADD_SITE_SUCCESS: {
        draft.addSubfolderLoading = false;
        draft.addSubfolderDone = true;
        break;
        // const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId);
        // const post = { ...state.mainPosts[postIndex] };
        // post.Comments = [dummyComment(action.data.content), ...post.Comments];
        // const mainPosts = [...state.mainPosts];
        // mainPosts[postIndex] = post;
        // return {
        //   ...state,
        //   mainPosts,
        //   addCommentLoading: false,
        //   addCommentDone: true,
        // };
      }
      case ADD_SITE_FAILURE:
        draft.addSiteLoading = false;
        draft.addSiteError = action.error;
        break;
      case REMOVE_SITE_REQUEST:
        draft.removeSiteLoading = true;
        draft.removeSiteDone = false;
        draft.removeSiteError = null;
        break;
      case REMOVE_SITE_SUCCESS:
        draft.removeSiteLoading = false;
        draft.removeSiteDone = true;
        draft.mainPosts = draft.mainPosts.filter(
          (v) => v.id !== action.data.SiteId
        );
        break;
      case REMOVE_SITE_FAILURE:
        draft.removeSiteLoading = false;
        draft.removeSiteError = action.error;
        break;
      default:
        break;
    }
  });

export default reducer;
