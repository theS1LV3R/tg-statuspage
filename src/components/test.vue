<template>
  <div
    class="testCase"
    v-bind:class="{
      ok: status === true,
      fail: status === false,
    }"
    @click.prevent="extended = !extended"
  >
    <h4 class="testCaseTitle">{{ name }}</h4>
    <p v-if="extended" class="test-description">{{ description }}</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Test",
  props: {
    status: Boolean,
    name: String,
    description: String,
  },
  data() {
    return {
      extended: false,
    };
  },
});
</script>

<style lang="scss" scoped>
.ok {
  background-color: lightgreen;
}

.fail {
  background-color: #ed2939;
}

.skipped {
  background-color: orange;
}

.testCase {
  border-radius: 0.25rem;
}

.testCaseTitle {
  padding: 3px;
}
</style>
