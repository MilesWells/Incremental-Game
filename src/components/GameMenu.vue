<template>
  <section class="menu">
    <h1>Monies: {{ engine.currency }}</h1>
    <button
      v-for="({ label, fn, type }, idx) in menuItems"
      :key="idx"
      @click="() => engine.updateMenuAction(fn, type)"
      :class="{ active: type === engine.activeMenuItem }"
    >
      {{ label }}
    </button>
  </section>
</template>

<script lang="ts">
import Vue from "vue";

import Engine, { GridItem } from "@/engine";
import Box from "@/components/Box.vue";

export default Vue.extend({
  name: "GameMenu",
  props: {
    engine: Engine
  },
  data: () => ({
    menuItems: [
      {
        label: "Box",
        type: "Box",
        fn: (engine: Engine) => (items: GridItem[]) => {
          const boxIdx = items.findIndex(i => i.type === "Box");
          if (boxIdx === -1) {
            items.push({ type: "Box", component: Box });
            engine.currency -= 100;
          } else items.splice(boxIdx, 1);
        }
      }
    ]
  }),
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
@import "../variables.scss";

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
