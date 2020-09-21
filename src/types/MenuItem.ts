import Engine from "@/engine";
import Vue, { VueConstructor } from "vue";

export type MenuItemType = "NULL" | "Box" | "Clear";

export interface MenuItem {
  component?: VueConstructor<Vue>;
  cost: number;
  icon?: VueConstructor<Vue>;
  infoComponent?: VueConstructor<Vue>;
  label: string;
  onClick: (engine: Engine, siblings: MenuItem[]) => boolean;
  type: MenuItemType;
}
