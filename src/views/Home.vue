<template>
  <div class="home">
    <div class="input">
      <h3>Test polling rate (ms)</h3>
      <input v-model="testPollingRate" />
    </div>
    <div class="input">
      <h3>Stack polling rate (ms)</h3>
      <input v-model="stackPollingRate" />
    </div>
    <button @click.prevent="stopPolling" v-if="polling">Stop polling</button>
    <button @click.prevent="startPolling" v-else>Start polling</button>
    <button @click.prevent="updateStatus">Update</button>
    <div id="server-list" v-if="servers !== []">
      <Server
        v-for="(server, index) of servers"
        :key="index"
        :testCases="server.testCases"
        :lastUpdated="server.lastUpdated"
        :success="server.success"
        :station="server.station"
      />
    </div>
    <div v-else><h2>Loading...</h2></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import Server from "@/components/server.vue";
import store from "@/store";

export default Vue.extend({
  name: "Home",
  data() {
    return {
      servers: store.state.servers,
      polling: true,
      loaded: false,

      testPollingRate: 2500,
      testPollingID: 0,

      stackPollingRate: 15_000,
      stackPollingID: 0,
    };
  },

  methods: {
    async updateStatus() {
      await this.$store.dispatch("updateStatus");
    },

    async updateStations() {
      await this.$store.dispatch("updateStations");
    },

    async startPolling() {
      this.testPollingID = setInterval(
        async () => await this.updateStatus(),
        this.testPollingRate
      );
      this.stackPollingID = setInterval(
        async () => await this.updateStations(),
        this.stackPollingRate
      );
      this.polling = true;
    },
    async stopPolling() {
      clearInterval(this.testPollingID);
      clearInterval(this.stackPollingID);
      this.polling = false;
    },
  },

  beforeRouteEnter(_, __, next) {
    store.dispatch("updateStations").then(() => next());
  },

  beforeDestroy() {
    this.stopPolling();
  },
  created() {
    this.updateStations()
      .then(() => (this.loaded = true))
      .then(() => this.startPolling());
  },

  components: {
    Server,
  },
});
</script>

<style lang="scss" scoped>
#server-list {
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
  flex-basis: 100%;
}

.input {
  :first-child {
    display: inline;
    margin: 0.5rem;
  }

  margin: 0.5rem;
}
</style>
