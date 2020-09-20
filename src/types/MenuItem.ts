import Engine from "@/engine";
import { VueConstructor } from "vue/types/umd";

export type MenuItemType = "NULL" | "Box";

export interface MenuItem {
  component: VueConstructor<Vue> | null;
  cost: number;
  icon?: VueConstructor<Vue>;
  label: string;
  onClick: (engine: Engine, siblings: MenuItem[]) => boolean;
  type: MenuItemType;
}
