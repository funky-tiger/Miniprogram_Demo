import * as calendarApi from './apis';

export default {
  namespace: 'calendar',
  state: {},

  reducers: {
    save(state, { payload }) {
      return { ...state, userDataList: [].concat(payload) };
    }
  },
  effects: {
    *effectsDemo(action, { call, put }) {
      const { status, data } = yield call(calendarApi.demo, {});
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

