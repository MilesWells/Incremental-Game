import { MenuItem, MenuItemType } from "@/types";
import Box from "@/components/Box.vue";

const items: { [k in MenuItemType]: MenuItem } = {
  Box: {
    component: Box,
    cost: 100,
    label: "Box",
    onClick: (_, siblings) => {
      const boxIdx = siblings.findIndex(i => i.type === "Box");
      if (boxIdx === -1) siblings.push(items.Box);

      return boxIdx === -1;
    },
    type: "Box"
  },
  NULL: {
    component: null,
    cost: 0,
    label: "",
    onClick: () => false,
    type: "NULL"
  }
};

export default items;
