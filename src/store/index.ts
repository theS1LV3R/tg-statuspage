import { createStore } from "vuex";
import axios from "axios";

import { TestCase, Server, ServerPoll } from "@/types";

const api = axios.create({
  baseURL: "https://techo.gathering.org/api/custom/station-tasks-tests/net/",
});

export default createStore({
  state: {
    servers: [
      {
        success: true,
        testCases: [],
        lastUpdated: undefined,
      },
      {
        success: true,
        testCases: [],
        lastUpdated: undefined,
      },
      {
        success: true,
        testCases: [],
        lastUpdated: undefined,
      },
      {
        success: true,
        testCases: [],
        lastUpdated: undefined,
      },
      {
        success: true,
        testCases: [],
        lastUpdated: undefined,
      },
      {
        success: true,
        testCases: [],
        lastUpdated: undefined,
      },
    ] as Array<ServerPoll>,
    polling: {
      active: true,
      interval: 10 * 1000, // default to 10 seconds
      id: undefined,
    } as {
      active: boolean;
      interval: number;
      id?: number;
    },
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
      const actions: Array<Promise<void>> = [];

      for (let i = 0; i < 6; i++) {
        actions.push(
          api
            .get<Server>(`${i + 1}`)
            .then((res) => {
              const tests: TestCase[] = [];

              res.data.tasks.forEach((task) =>
                task.tests.forEach((test) => {
                  tests.push(test);
                })
              );

              state.commit("updateStatus", {
                index: i,
                testCases: tests,
              });
              state.commit("updateServerStatus", { index: i, success: true });
              state.commit("updateLastUpdated", { index: i });
            })
            .catch((err) => {
              console.error("Failed to fetch info stuffs");
              console.warn(err);
              state.commit("updateServerStatus", { index: i, success: false });
            })
        );
      }

      await Promise.allSettled(actions);
    },
  },
  getters: {},
  modules: {},
});
