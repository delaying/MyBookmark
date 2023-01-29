import { createWrapper } from "next-redux-wrapper";
import { applyMiddleware, compose, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";

// 미들웨어는 리덕스 기능을 확장시켜주는 느낌!
import reducer from "../reducers";
import rootSaga from "../sagas";

function configureStore({ context }) {
  console.log(context);
  const sagaMiddleware = createSagaMiddleware();
  // 미들웨어 작성 ~~ ? 배포용 : 개발용
  //   배포할때 변동사항이 노출되면 안되므로 개발용에만 보이도록!
  const middlewares = [sagaMiddleware];
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(reducer, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
}

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === "development",
});

export default wrapper;
