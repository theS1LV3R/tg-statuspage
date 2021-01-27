<template>
  <div class="home">
    <input v-model="pollingRate" />
    <br />
    <button @click.prevent="stopPolling" v-if="polling">Stop polling</button>
    <button @click.prevent="startPolling" v-else>Start polling</button>
    <button @click.prevent="updateStatus">Update</button>
    <div id="server-list">
      <Server
        v-for="(server, index) of servers"
        :key="index"
        :id="index"
        :tests="server.testCases"
        :success="server.success"
        :lastUpdated="server.lastUpdated"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import state from "@/store";
import Server from "@/components/server.vue";

export default Vue.extend({
  name: "Home",
  data() {
    return {
      servers: state.state.servers,
      pollingRate: 2500,
      pollingID: 0,
      polling: true,
    };
  },

  methods: {
    async updateStatus() {
      await this.$store.dispatch("updateStatus");
    },

    async startPolling() {
      this.pollingID = setInterval(
        async () => await this.updateStatus(),
        this.pollingRate
      );
      this.polling = true;
    },
    async stopPolling() {
      clearInterval(this.pollingID);
      this.polling = false;
    },
  },

  beforeDestroy() {
    this.stopPolling();
  },
  async created() {
    await this.updateStatus();
  },

  components: {
    Server,
  },
});
</script>

<style lang="scss" scoped>
#server-list {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
</style>
