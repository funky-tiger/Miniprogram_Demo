import * as homeApi from "./service";

export default {
  namespace: "home",
  state: {
    homeDataList: []
  },
  reducers: {
    saveHomeData(state, { payload }) {
      console.log("payload", payload);
      return { ...state, homeDataList: state.homeDataList.concat(payload) };
    }
  },
  effects: {
    *asyncGetData(_, { call, put }) {
      console.log("_:::", _);
      const { code, data } = yield call(homeApi.getHomeData, {});
      if (code === "OK") {
        yield put({
          type: "saveHomeData",
          payload: data
        });
      }
    },
    *product(_, { call, put, select }) {
      const { page, products_list } = yield select(state => state.home);
      const { status, data } = yield call(homeApi.getProductList, {
        page,
        mode: 1,
        type: 0,
        filter: "sort:recomm|c:330602"
      });
      if (status === "ok") {
        yield put({
          type: "save",
          payload: {
            products_list:
              page > 1 ? [...products_list, ...data.rows] : data.rows
          }
        });
      }
    }
  }
};
