<template>
  <section class="menu">
    <h1>Monies: {{ engine.currency }}</h1>
    <h1>x: {{ engine.mousePosition.x }}</h1>
    <h1>y: {{ engine.mousePosition.y }}</h1>
    <button
      v-for="(item, idx) in menuItems"
      :key="idx"
      @click="() => engine.updateMenuAction(item)"
      :class="{
        active: item.type === engine.activeMenuItem.type
      }"
    >
      {{ item.label }}
    </button>
  </section>
</template>

<script lang="ts">
import Vue from "vue";

import Engine from "@/engine";
import DefinedMenuItems from "@/assets/DefinedMenuItems";

export default Vue.extend({
  name: "GameMenu",
  props: {
    engine: Engine
  },
  data: () => {
    return {
      menuItems: [DefinedMenuItems.Box]
    };
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

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.menu {
  align-items: center;
  color: $fg;
  display: flex;
  font-family: $font;
  height: 100%;
  justify-content: space-evenly;
  justify-items: center;

  button {
    background-color: $primary;
    border: none;
    border-radius: 10px;
    color: $fg;
    cursor: pointer;
    font-size: 3em;

    &.active {
      background-color: $secondary;
    }
  }
}
</style>
