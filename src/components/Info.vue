<template>
  <div
    class="info"
    v-show="engine.infoPanelComponents.length > 0"
    :style="{
      left: `${engine.infoPosition.x}px`,
      top: `${engine.infoPosition.y}px`
    }"
  >
    <button @click="engine.infoPanelComponents = []">Close</button>
    <div
      class="item"
      v-for="(item, idx) in engine.infoPanelComponents"
      :key="idx"
    >
      <component :is="item" />
      <hr v-if="idx < engine.infoPanelComponents.length - 1" />
    </div>
  </div>
</template>
<script lang="ts">
import Engine from "@/engine";
import Vue from "vue";

export default Vue.extend({
  name: "Info",
  props: {
    engine: Engine
  }
});
</script>
<style lang="scss" scoped>
.info {
  position: fixed;

  .item {
    display: flex;
    flex-direction: column;
  }
}
</style>
