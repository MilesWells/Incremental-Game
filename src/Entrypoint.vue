<template>
  <div
    id="entrypoint"
    :style="{
      border: `${engine.view.border.thickness}px solid black`
    }"
  >
    <div class="grid">
      <div
        class="gridItem"
        :style="{
          height: `${engine.gridItemSize}px`,
          width: `${engine.gridItemSize}px`
        }"
        v-for="(gridItem, idx) in engine.grid.flat()"
        :key="idx"
      >
        <div
          class="gameObject"
          v-for="(gameObject, idx2) in gridItem"
          :key="`${idx}-${idx2}`"
        ></div>
      </div>
    </div>
    <div
      class="menu"
      :style="{
        height: `${engine.view.menu.height}px`
      }"
    >
      Menu
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Engine from "./engine";

export default Vue.extend({
  name: "Entrypoint",
  data: () => ({
    engine: new Engine({})
  })
});
</script>

<style lang="scss">
#entrypoint {
  .grid {
    display: flex;
    flex-wrap: wrap;
    .gridItem {
      align-items: center;
      display: flex;
      justify-content: center;
    }
  }
  .menu {
    outline: 1px solid blue;
  }
}
</style>