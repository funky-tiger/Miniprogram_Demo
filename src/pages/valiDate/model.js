import * as valiDateApi from './apis';

export default {
  namespace: 'valiDate',
  state: {},

  reducers: {
    save(state, { payload }) {
      return { ...state, userDataList: [].concat(payload) };
    }
  },
  effects: {
    *effectsDemo(action, { call, put }) {
      const { status, data } = yield call(valiDateApi.demo, {});
      if (status === "OK") {
        yield put({
          type: "save",
          payload: {
            topData: data
          }
        });
      }
    }
  }
};

