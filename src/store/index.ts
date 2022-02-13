import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { Station, LocalStation, TestCase } from "@/types";

Vue.use(Vuex);

const api = axios.create({
  baseURL: "https://techo.gathering.org/api",
});

export default new Vuex.Store({
  state: {
    servers: [] as LocalStation[],
  },
  mutations: {
    updateStatus(state, data: { index: number; testCases: Array<TestCase> }) {
      const server = state.servers.find(
        (server) => parseInt(server.station.shortname, 10) === data.index
      );
      if (server) {
        server.testCases = data.testCases;
      }
    },

    updateServerStatus(state, data: { index: number; success: boolean }) {
      const server = state.servers.find(
        (server) => parseInt(server.station.shortname, 10) === data.index
      );
      if (server) {
        server.success = data.success;
      }
    },

    updateLastUpdated(state, data: { index: number }) {
      const server = state.servers.find(
        (server) => parseInt(server.station.shortname, 10) === data.index
      );
      if (server) {
        server.lastUpdated = new Date();
      }
    },

    setStations(state, stations: LocalStation[]) {
      state.servers = stations;
    },
  },
  actions: {
    async updateStatus(state) {
      state.state.servers.forEach(async (server) => {
        const testCases = await this.getters
          .getTestCasesForStation(server.id)
          .catch((err: unknown) => {
            state.commit("updateServerStatus", {
              index: server.id,
              success: false,
            });
            console.error(err);
          });

        state.commit("updateStatus", { index: server.id, testCases });
        state.commit("updateServerStatus", { index: server.id, success: true });
        state.commit("updateLastUpdated", { index: server.id });
      });
    },

    async updateStations(state) {
      const stations = await api.get("/stations/?track=net").then((res) => {
        let stations: LocalStation[] = res.data.map(
          (station: Station): LocalStation => ({
            id: parseInt(station.shortname),
            success: true,
            testCases: [],
            station,
            lastUpdated: new Date(),
          })
        );
        stations.forEach(async (_station) => {
          const station = stations.find(
            (station) => parseInt(_station.station.shortname, 10) === station.id
          );
          if (station) {
            station.testCases = await this.getters.getTestCasesForStation(
              station.id
            );
          }
        });

        stations = stations.sort((a, b) => a.id - b.id);

        return stations;
      });

      state.commit("setStations", stations);
    },
  },
  getters: {
    getTestCasesForStation: (state) => async (stationID: number) => {
      return await api
        .get(`/custom/station-tasks-tests/net/${stationID}`)
        .then((res) => {
          const tests: TestCase[] = [];

          res.data.tasks.forEach((task: any) =>
            task.tests.forEach((test: TestCase) => {
              tests.push(test);
            })
          );

          return tests;
        })
        .catch();
    },
  },
});
