import * as formDemoApi from './apis';

export default {
  namespace: 'formDemo',
  state: {},

  reducers: {
    save(state, { payload }) {
      return { ...state, userDataList: [].concat(payload) };
    }
  },
  effects: {
    *effectsDemo(action, { call, put }) {
      const { status, data } = yield call(formDemoApi.demo, {});
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

