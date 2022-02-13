<template>
  <div class="server">
    <div class="failing" v-if="!success">
      <h2>⚠️Warning⚠️</h2>
      <p>
        The request to get this API's status failed on the last request. Data
        may not be accurate.
      </p>
    </div>
    <h2
      class="status"
      :class="{
        booked: station.timeslot,
        active: station.status === 'active',
        maintenance: station.status === 'maintenance',
        dirty: station.status === 'dirty',
      }"
    >
      {{ station.name }}
    </h2>
    <h3
      class="status"
      :class="{
        booked: station.timeslot,
        active: station.status === 'active',
        maintenance: station.status === 'maintenance',
        dirty: station.status === 'dirty',
      }"
    >
      {{ capitalize(station.status) }}
    </h3>
    <p>Last updated: {{ lastUpdated.toLocaleString("nb-NO") }}</p>
    <div class="server-list">
      <Test
        v-for="(test, index) in testCases"
        :key="index"
        :name="test.name"
        :status="test.status_success"
        :description="getDesc(test)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import Test from "@/components/test.vue";
import { TestCase, Station, LocalStation } from "@/types";

export default Vue.extend({
  name: "Server",
  props: {
    testCases: Array as () => Array<TestCase>,
    lastUpdated: Date,
    success: Boolean,
    station: Object as () => Station,
  },

  methods: {
    getDesc(test: TestCase) {
      if (test.status_description !== "") {
        return test.status_description;
      } else {
        return "No description defined";
      }
    },

    capitalize(string: string) {
      return string.trim().replace(/^\w/, (c) => c.toUpperCase());
    },
  },
  components: {
    Test,
  },
});
</script>

<style lang="scss" scoped>
.server-list {
  margin-left: auto;
  margin-right: auto;
}

.status {
  &.active {
    color: #39dd6d;
  }

  &.booked {
    color: #ed2939;
  }

  &.maintenance {
    color: gray;
  }

  &.dirty {
    color: orange;
  }
}
</style>

<style lang="scss">
.server {
  padding: 5px;
}

.failing {
  font-weight: bold;
  border: black solid 1px;
  border-radius: 0.25rem;
  background-color: #ed2939;
  color: white;
}
</style>
