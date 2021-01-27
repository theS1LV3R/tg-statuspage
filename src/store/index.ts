import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { TestCase } from "@/types";

Vue.use(Vuex);

const api = axios.create({
  baseURL: "https://techo.gathering.org/api/status",
});

export default new Vuex.Store({
  state: {
    servers: [
      {
        success: true,
        testCases: [] as Array<TestCase>,
        lastUpdated: new Date(),
      },
      {
        success: true,
        testCases: [] as Array<TestCase>,
        lastUpdated: new Date(),
      },
      {
        success: true,
        testCases: [] as Array<TestCase>,
        lastUpdated: new Date(),
      },
      {
        success: true,
        testCases: [] as Array<TestCase>,
        lastUpdated: new Date(),
      },
    ],
  },
  mutations: {
    updateStatus(state, data: { index: number; testCases: Array<TestCase> }) {
      state.servers[data.index].testCases = data.testCases;
    },

    updateServerStatus(state, data: { index: number; success: boolean }) {
      state.servers[data.index].success = data.success;
    },

    updateLastUpdated(state, data: { index: number }) {
      state.servers[data.index].lastUpdated = new Date();
    },
  },
  actions: {
    async updateStatus(state) {
      for (let i = 0; i < 4; i++) {
        await api
          .get(`/station/${i + 1}`)
          .then((res) => {
            state.commit("updateStatus", {
              index: i,
              testCases: res.data.Tests,
            });
            state.commit("updateServerStatus", { index: i, success: true });
            state.commit("updateLastUpdated", { index: i });
          })
          .catch((_) => {
            console.error("Failed to fetch info stuffs");
            state.commit("updateServerStatus", { index: i, success: false });
          });
      }
    },
  },
});
