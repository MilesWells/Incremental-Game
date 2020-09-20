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
      :is="engine.activeMenuItem.icon"
      :style="{
        position: 'fixed',
        left: `${engine.mousePosition.x + 10}px`,
        top: `${engine.mousePosition.y + 10}px`
      }"
    ></component>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Engine from "./engine";
import events from "./engine/events";
import GameMenu from "./components/GameMenu.vue";

export default Vue.extend({
  name: "Entrypoint",
  components: {
    GameMenu
  },
  data: function() {
    return {
      engine: new Engine({}),
      events
    };
  },
  mounted: function() {
    for (const [idx] of this.engine.grid.entries()) {
      this.$on(
        `${events.GRID_ITEM_CLICK}-${idx}`,
        this.engine.gridItemClick(idx)
      );
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
}
</style>
