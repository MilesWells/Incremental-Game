<template>
  <div
    id="entrypoint"
    v-if="engine !== null"
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
        v-for="(gridItem, idx) in engine.grid"
        :key="idx"
        @click.prevent="$emit(`${events.GRID_ITEM_CLICK}-${idx}`)"
      >
        <component
          v-for="(gameItem, idx) in gridItem"
          :is="gameItem.component"
          :key="idx"
          :engine="engine"
        ></component>
      </div>
    </div>
    <div
      class="menu"
      :style="{
        height: `${engine.view.menu.height}px`
      }"
    >
      <GameMenu :engine="engine" />
    </div>
    <component
      class="tooltip"
      :v-if="engine.activeMenuItem.icon"
      :is="engine.activeMenuItem.icon"
      :style="{
        left: `${engine.mousePosition.x + 10}px`,
        top: `${engine.mousePosition.y + 10}px`
      }"
    ></component>
    <Info :engine="engine" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Engine from "./engine";
import events from "./engine/events";
import GameMenu from "./components/GameMenu.vue";
import Info from "./components/Info.vue";

export default Vue.extend({
  name: "Entrypoint",
  components: {
    GameMenu,
    Info
  },
  data: function() {
    return {
      engine: new Engine({}),
      events
    };
  },
  mounted: function() {
    for (const [idx] of this.engine.grid.entries()) {
      this.$on(`${events.GRID_ITEM_CLICK}-${idx}`, () => {
        this.engine.gridItemClick(idx);
      });
    }
  },
  watch: {
    engine: {
      deep: true,
      handler: function() {
        this.$forceUpdate();
      }
    }
  }
});
</script>

<style lang="scss">
@import "./assets/variables.scss";

#entrypoint {
  .grid {
    background-color: $fg;
    cursor: crosshair;
    display: flex;
    flex-wrap: wrap;
    .gridItem {
      align-items: center;
      display: flex;
      justify-content: center;
    }
  }
  .menu {
    background-color: $bg;
    cursor: pointer;
  }
  .tooltip {
    background-color: $fg;
    border-radius: 0.15em;
    border: thin solid $bg;
    color: $bg;
    padding: 0.2em;
    position: fixed;
  }
}
</style>
