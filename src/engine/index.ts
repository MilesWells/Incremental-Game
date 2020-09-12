export class GameItem {

}

export interface EngineOptions {
  gridItemSize?: number;
  menuHeight?: number;
}

export interface ViewDimensions {
  border: {
    thickness: number;
  },
  grid: {
    height: number;
    width: number;
  },
  menu: {
    height: number;
  }
}

const MAX_GRID_ITEM_SIZE = 50;
const MIN_GRID_ITEM_SIZE = 20;

export default class Engine {
  #grid: GameItem[][][];
  readonly gridItemSize: number;
  readonly view: ViewDimensions;

  gameItemClick = (idx: number) => () => {
    console.log(idx);
  }

  constructor({gridItemSize, menuHeight = 200}: EngineOptions) {
    if (!gridItemSize || gridItemSize > MAX_GRID_ITEM_SIZE || gridItemSize < MIN_GRID_ITEM_SIZE) this.gridItemSize = MAX_GRID_ITEM_SIZE;
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
    }

    this.#grid = [];
    for(let y = 0; y < yItems; y++) {
      const row = [];
      for (let x = 0; x < xItems; x++) {
        row.push([]);
      }
      this.#grid.push(row);
    }
  }

  get grid() {
    return this.#grid;
  }
}