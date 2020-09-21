import { MenuItem, MenuItemType } from "@/types";
import Box from "@/components/menuItems/box/Box.vue";
import BoxIcon from "@/components/menuItems/box/BoxIcon.vue";
import BoxInfo from "@/components/menuItems/box/BoxInfo.vue";
import ClearIcon from "@/components/menuItems/clear/ClearIcon.vue";

const items: { [k in MenuItemType]: MenuItem } = {
  Box: {
    component: Box,
    cost: 100,
    icon: BoxIcon,
    infoComponent: BoxInfo,
    label: "Box",
    onClick: (_, siblings) => {
      const boxIdx = siblings.findIndex(i => i.type === "Box");
      if (boxIdx === -1) siblings.push(items.Box);

      return boxIdx === -1;
    },
    type: "Box"
  },
  Clear: {
    cost: 0,
    icon: ClearIcon,
    label: "Clear",
    onClick: (engine, siblings) => {
      const removed = siblings.splice(0);
      engine.currency += Math.floor(
        removed.reduce((acc, cur) => acc + cur.cost, 0) * 0.2
      );
      return true;
    },
    type: "Clear"
  },
  NULL: {
    cost: 0,
    label: "",
    onClick: () => false,
    type: "NULL"
  }
};

export default items;
