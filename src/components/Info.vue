<template>
  <div class="info" v-show="visible">
    <button @click="this.visible = false">Close</button>
    <div class="item" v-for="(item, idx) in items" :key="idx">
      <component :is="item" />
      <hr v-if="idx < items.length - 1" />
    </div>
  </div>
</template>
<script lang="ts">
import events from "@/engine/events";
import Vue, { VueConstructor } from "vue";

export default Vue.extend({
  name: "Info",
  props: {
    items: [] as VueConstructor<Vue>[]
  },
  data: function() {
    return { visible: false };
  },
  mounted: function() {
    this.$on(events.SHOW_INFO_PANEL, () => {
      this.visible = true;
    });

    this.$on(events.HIDE_INFO_PANEL, () => {
      this.visible = false;
    });
  }
});
</script>
<style lang="scss" scoped>
.info {
  display: flex;
  flex-direction: column;
  position: fixed;

  .item {
    display: flex;
    flex-direction: column;
  }
}
</style>
