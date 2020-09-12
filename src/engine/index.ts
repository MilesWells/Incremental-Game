import { VueConstructor } from "vue/types/umd";

import Box from "../components/Box.vue";

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

const MAX_GRID_ITEM_SIZE = 50;
const MIN_GRID_ITEM_SIZE = 20;

export default class Engine {
  grid: VueConstructor<Vue>[][];
  readonly gridItemSize: number;
  readonly view: ViewDimensions;

  gridItemClick = (idx: number) => () => {
    const gridItem = this.grid[idx];
    if (gridItem.length === 0) gridItem.push(Box);
    else gridItem.pop();
  };

  constructor({ gridItemSize, menuHeight = 200 }: EngineOptions) {
    if (
      !gridItemSize ||
      gridItemSize > MAX_GRID_ITEM_SIZE ||
      gridItemSize < MIN_GRID_ITEM_SIZE
    )
      this.gridItemSize = MAX_GRID_ITEM_SIZE;
    else this.gridItemSize = gridItemSize;

    const [vw, vh] = [window.innerWidth, window.innerHeight];
    const xItems = Math.floor(vw / this.gridItemSize);
    const xOffset = vw % this.gridItemSize;
    const yItems = Math.floor((vh - menuHeight) / this.gridItemSize);
    const yOffset = (vh - menuHeight) % this.gridItemSize;

    this.view = {
      border: {
        thickness: xOffset / 2
      },
      grid: {
        height: yItems * this.gridItemSize,
        width: xItems * this.gridItemSize
      },
      menu: {
        height: menuHeight + yOffset - xOffset
      }
    };

    this.grid = [];
    for (let y = 0; y < yItems * xItems; y++) {
      this.grid.push([]);
    }
  }
}
