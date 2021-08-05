/**
 * @documents https://redux-saga.js.org/docs/basics/DeclarativeEffects/
 * redux saga 是一个用于处理应用中 异步操作列如：data fetching 和 非纯操作 列如访问浏览器
 * 缓存 side effects 的库， 在redux saga 中，采用 Generator 函数来实现 Saga。 我们通过
 * Generator 函数返回一个被 称为 Effects 的简单 Javascript 对象，来实现 saga 逻辑。 而每
 * 个 Effect 都是一个包含一些可以被 middleware 解析的信息的对象。 你可以把 Effect 当做一个
 * 可以命令 middleware 做出某些操作的对象。
 */

import React from "react";

// 通过 redux-saga 中的 effects 包创建saga;
import createSagaMiddleware from 'redux-saga'
import { call, takeEvery, fork } from "redux-saga/effects";
import { configureStore as createStore } from "@reduxjs/toolkit";
import counter from "../../models/counter";
import { pokemonApi } from "../../models/pokemon";
import { Provider } from "react-redux";


// an api
const fetchProduction = function () {
  return new Promise((resolve) => setTimeout(() => {
    resolve(console.log("promise filled"));
  }, 1000))
}

function *watchFetchProduction() {
  yield takeEvery('PRODUCTS_REQUESTED', fetchProduction)
}


// 用call 方法调用并传递参数
const method = function *(...args: any[]): Generator<any[]> {
  return args
};
const params: any[] = [];

function *fetchProductionV2(): any {
  return yield call(method, ...params);
}

// configureStore
function configureStore(initialState?: any) {
  const sagaMiddleware = createSagaMiddleware();
  return {
    ...createStore({
      reducer: {
        counter,
        [pokemonApi.reducerPath]: pokemonApi.reducer
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([ pokemonApi.middleware, sagaMiddleware ]),
    }),
    runSaga: sagaMiddleware.run,
  }
}

const store = configureStore();
const task = store.runSaga(watchFetchProduction);

const SagaBox = function ({ children }: any) {
  return( <Provider store={store}>
      {children}
    </Provider> )
}


export default function Saga() {
  return (
    <SagaBox>
      <div>this is a saga box</div>
    </SagaBox>
  )
}
Saga.menu = {
  name: "Saga",
  icon: "dashboard",
  sort: 4
}


