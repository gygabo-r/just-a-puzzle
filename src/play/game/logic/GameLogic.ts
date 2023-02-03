import { PieceLogic } from './PieceLogic';
import { GameConfiguration } from '../helpers/GameConfiguration';
import { IPieceLogic } from './IPieceLogic';

export class GameLogic {
    private pieceMatrix: IPieceLogic[][] = [];
    private pieceSets: IPieceLogic[][] = [];

    constructor(private config: GameConfiguration, private pieces: IPieceLogic[]) {
        for (let row = 0; row < this.config.cutY; row++) this.pieceMatrix[row] = new Array(this.config.cutX);

        pieces.forEach((piece) => (this.pieceMatrix[piece.row][piece.column] = piece));
        pieces.forEach((piece) => this.pieceSets.push(piece.set));
    }

    public areAllPiecesConnected = () => this.pieceSets.length === 1;

    public checkPieces(piece: IPieceLogic) {
        const draggingSet = piece.set.slice(0);
        const matchingSets: PieceLogic[][] = [];

        draggingSet.forEach((draggedPiece: IPieceLogic) => {
            this.connectTop(draggedPiece, matchingSets);
            this.connectRight(draggedPiece, matchingSets);
            this.connectBottom(draggedPiece, matchingSets);
            this.connectLeft(draggedPiece, matchingSets);
        });

        this.removeMatchingSetsFromAllSets(matchingSets);
        this.setDraggingSetForAllPiecesInIt(piece.set);

        if (this.pieceSets.indexOf(piece.set) === -1) this.pieceSets.push(piece.set);

        this.moveBackPiecesIfTheyAreOffScreen(piece.set);
    }

    private connectTop(draggedPiece: IPieceLogic, matchingSets: IPieceLogic[][]) {
        const line = this.pieceMatrix[draggedPiece.row - 1];
        const upperChance = line ? line[draggedPiece.column] : null;
        if (upperChance && draggedPiece.canTopConnectTo(upperChance)) {
            draggedPiece.moveForTopConnectWith(upperChance);
            this.updateSets(matchingSets, upperChance, draggedPiece);
        }
    }

    private connectRight(draggedPiece: IPieceLogic, matchingSets: IPieceLogic[][]) {
        const line = this.pieceMatrix[draggedPiece.row];
        const rightChance = line ? line[draggedPiece.column + 1] : null;
        if (rightChance && draggedPiece.canRightConnectTo(rightChance)) {
            draggedPiece.moveForRightConnectWith(rightChance);
            this.updateSets(matchingSets, rightChance, draggedPiece);
        }
    }

    private connectBottom(draggedPiece: IPieceLogic, matchingSets: IPieceLogic[][]) {
        const line = this.pieceMatrix[draggedPiece.row + 1];
        const bottomChance = line ? line[draggedPiece.column] : null;
        if (bottomChance && draggedPiece.canBottomConnectTo(bottomChance)) {
            draggedPiece.moveForBottomConnectWith(bottomChance);
            this.updateSets(matchingSets, bottomChance, draggedPiece);
        }
    }

    private connectLeft(draggedPiece: IPieceLogic, matchingSets: IPieceLogic[][]) {
        const line = this.pieceMatrix[draggedPiece.row];
        const leftChance = line ? line[draggedPiece.column - 1] : null;
        if (leftChance && draggedPiece.canLeftConnectTo(leftChance)) {
            draggedPiece.moveForLeftConnectWith(leftChance);
            this.updateSets(matchingSets, leftChance, draggedPiece);
        }
    }

    private removeMatchingSetsFromAllSets(matchingsets: IPieceLogic[][]) {
        matchingsets.forEach((set) => {
            const index = this.pieceSets.indexOf(set);

            if (index >= 0) this.pieceSets.splice(index, 1);
        });
    }

    private setDraggingSetForAllPiecesInIt(draggingSet: IPieceLogic[]) {
        draggingSet.forEach((p) => (p.set = draggingSet));
    }

    private updateSets(matchingSets: IPieceLogic[][], upperChance: IPieceLogic, draggedPiece: IPieceLogic) {
        matchingSets.push(upperChance.set);
        upperChance.set.forEach((item) => {
            if (draggedPiece.set.indexOf(item) === -1) draggedPiece.set.push(item);
        });
    }

    private moveBackPiecesIfTheyAreOffScreen(draggingSet: IPieceLogic[]) {
        let mostOffScreenByY: IPieceLogic = null as unknown as IPieceLogic;
        let mostOffScreenByX: IPieceLogic = null as unknown as PieceLogic;

        draggingSet.forEach((piece: IPieceLogic) => {
            if (piece.x + piece.pieceWidth > this.config.viewWidth || piece.x < 0) {
                if (mostOffScreenByX) {
                    if (mostOffScreenByX.x < 0 && mostOffScreenByX.x > piece.x) mostOffScreenByX = piece;

                    if (
                        mostOffScreenByX.x > 0 &&
                        mostOffScreenByX.x + mostOffScreenByX.pieceWidth < piece.x + piece.pieceWidth
                    )
                        mostOffScreenByX = piece;
                } else {
                    mostOffScreenByX = piece;
                }
            }

            if (piece.y + piece.pieceHeight > this.config.viewHeight || piece.y < 0) {
                if (mostOffScreenByY) {
                    if (mostOffScreenByY.y < 0 && mostOffScreenByY.y > piece.y) mostOffScreenByY = piece;

                    if (
                        mostOffScreenByY.y > 0 &&
                        mostOffScreenByY.y + mostOffScreenByY.pieceHeight < piece.y + piece.pieceHeight
                    )
                        mostOffScreenByY = piece;
                } else {
                    mostOffScreenByY = piece;
                }
            }
        });

        if (!mostOffScreenByY && !mostOffScreenByX) return;

        const moveBackX = this.getMoveBackX(mostOffScreenByX);
        const moveBackY = this.getMoveBackY(mostOffScreenByY);

        draggingSet.forEach((piece) => {
            piece.x += moveBackX;
            piece.y += moveBackY;
        });
    }

    private getMoveBackX(mostOffScreenByX: IPieceLogic) {
        if (!mostOffScreenByX) return 0;

        if (mostOffScreenByX.x < 0) return -mostOffScreenByX.x;

        return -(mostOffScreenByX.x + mostOffScreenByX.pieceWidth - this.config.viewWidth);
    }

    private getMoveBackY(mostOffScreenByY: IPieceLogic) {
        if (!mostOffScreenByY) return 0;

        if (mostOffScreenByY.y < 0) return -mostOffScreenByY.y;

        return -(mostOffScreenByY.y + mostOffScreenByY.pieceHeight - this.config.viewHeight);
    }
}
