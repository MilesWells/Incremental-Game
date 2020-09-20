import { VueConstructor } from "vue/types/umd";

import names from "@/components/names.json";

export interface EngineOptions {
  gridItemSize?: number;
  menuHeight?: number;
}

export interface ViewDimensions {
  border: {
    thickness: number;
  };
  grid: {
    height: number;
    width: number;
  };
  menu: {
    height: number;
  };
}

export interface GridItem {
  component: VueConstructor<Vue>;
  data?: any;
  type: keyof typeof names;
}

type MenuFunction = (items: GridItem[]) => void;

const MAX_GRID_ITEM_SIZE = 50;
const MIN_GRID_ITEM_SIZE = 20;
const STARTING_CURRENCY = 5000;
const NOOP_MENU_FN: MenuFunction = items => items;

export default class Engine {
  readonly gridItemSize: number;
  readonly view: ViewDimensions;
  readonly xItems: number;
  readonly yItems: number;

  currency = STARTING_CURRENCY;
  grid: GridItem[][];
  activeMenuAction: MenuFunction = NOOP_MENU_FN;
  activeMenuItem?: keyof typeof names;

  mouseIcon?: VueConstructor<Vue>;
  mousePosition = {
    x: 0,
    y: 0
  };

  gridItemClick = (idx: number) => () => this.activeMenuAction(this.grid[idx]);

  updateMenuAction = (
    fn: (engine: Engine) => MenuFunction,
    type: keyof typeof names
  ) => {
    this.activeMenuAction = fn(this);
    this.activeMenuItem = type;
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
          this.activeMenuAction = NOOP_MENU_FN;
          this.activeMenuItem = undefined;
          this.mouseIcon = undefined;
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
