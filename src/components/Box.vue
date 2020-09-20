<template>
  <div class="box"></div>
</template>
<script lang="ts">
import Engine from "@/engine";
import Vue from "vue";
export default Vue.extend({
  name: "Box",
  data: () => ({
    interval: undefined as number | undefined
  }),
  props: {
    engine: Engine
  },
  mounted: function() {
    this.interval = setInterval(() => (this.engine.currency += 1), 1000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
});
</script>
<style lang="scss">
.box {
  background-color: black;
  height: 100%;
  width: 100%;
}
</style>
