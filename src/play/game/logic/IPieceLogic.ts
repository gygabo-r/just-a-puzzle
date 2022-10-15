export interface IPieceLogic {
  pieceHeight: number;
  pieceWidth: number;
  y: number;
  x: number;
  row: number;
  column: number;
  set: IPieceLogic[];
  getAdjustedX(): number;
  getAdjustedY(): number;

  canLeftConnectTo(leftChance: IPieceLogic): boolean;
  moveForLeftConnectWith(leftChance: IPieceLogic): void;
  canBottomConnectTo(bottomChance: IPieceLogic): boolean;
  moveForBottomConnectWith(bottomChance: IPieceLogic): void;
  canRightConnectTo(rightChance: IPieceLogic): boolean;
  moveForRightConnectWith(rightChance: IPieceLogic): void;
  canTopConnectTo(upperChance: IPieceLogic): boolean;
  moveForTopConnectWith(upperChance: IPieceLogic): void;
}
