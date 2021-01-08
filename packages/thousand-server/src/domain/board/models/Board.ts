class Board {
  private _tiles: string[];

  get tiles() {
    return this._tiles;
  }

  constructor(size?: number) {
    this._tiles = Array((size || 3) ** 2).fill('');
  }

  setTile(index: number, value: string) {
    this._tiles[index] = value;
  }
}

export default Board;
