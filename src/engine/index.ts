import { MenuItem, ViewDimensions, EngineOptions } from "@/types";
import DefinedMenuItems from "@/assets/DefinedMenuItems";
import { VueConstructor } from "vue/types/umd";

const MAX_GRID_ITEM_SIZE = 50;
const MIN_GRID_ITEM_SIZE = 20;
const STARTING_CURRENCY = 5000;

export default class Engine {
  readonly gridItemSize: number;
  readonly view: ViewDimensions;
  readonly xItems: number;
  readonly yItems: number;

  currency = STARTING_CURRENCY;
  grid: MenuItem[][];
  activeMenuItem = DefinedMenuItems.NULL;
  infoPanelComponents: VueConstructor<Vue>[] = [];

  mousePosition = {
    x: 0,
    y: 0
  };

  infoPosition = {
    x: 0,
    y: 0
  };

  gridItemClick = (idx: number) => {
    // no menu item selected, show info panel
    if (this.activeMenuItem.type === "NULL") {
      this.infoPosition = {
        x: this.mousePosition.x,
        y: this.mousePosition.y
      };
      this.infoPanelComponents = this.grid[idx].reduce((acc, cur) => {
        if (cur.infoComponent) acc.push(cur.infoComponent);
        return acc;
      }, [] as VueConstructor<Vue>[]);

      return;
    }

    // menu item selected, activate if player can pay cost
    if (this.currency >= this.activeMenuItem.cost)
      if (this.activeMenuItem.onClick(this, this.grid[idx]))
        this.currency -= this.activeMenuItem.cost;
  };

  updateMenuAction = (item: MenuItem) => {
    this.activeMenuItem = item;
  };

  constructor({ gridItemSize, menuHeight = 200 }: EngineOptions) {
    // construct grid and view
    if (
      !gridItemSize ||
      gridItemSize > MAX_GRID_ITEM_SIZE ||
      gridItemSize < MIN_GRID_ITEM_SIZE
    )
      this.gridItemSize = MAX_GRID_ITEM_SIZE;
    else this.gridItemSize = gridItemSize;

    const [vw, vh] = [window.innerWidth, window.innerHeight];
    this.xItems = Math.floor(vw / this.gridItemSize);
    const xOffset = vw % this.gridItemSize;
    this.yItems = Math.floor((vh - menuHeight) / this.gridItemSize);
    const yOffset = (vh - menuHeight) % this.gridItemSize;

    this.view = {
      border: {
        thickness: xOffset / 2
      },
      grid: {
        height: this.yItems * this.gridItemSize,
        width: this.xItems * this.gridItemSize
      },
      menu: {
        height: menuHeight + yOffset - xOffset
      }
    };

    this.grid = [];
    for (let y = 0; y < this.yItems * this.xItems; y++) {
      this.grid.push([]);
    }

    // register hotkeys
    window.addEventListener("keydown", ({ key, repeat }) => {
      if (repeat) return;

      switch (key) {
        case "d":
          this.activeMenuItem = DefinedMenuItems.NULL;
          this.infoPanelComponents = [];
          break;
        default:
          break;
      }
    });

    // track mouse position
    window.addEventListener("mousemove", ({ clientX, clientY }) => {
      this.mousePosition = { x: clientX, y: clientY };
    });
  }
}
