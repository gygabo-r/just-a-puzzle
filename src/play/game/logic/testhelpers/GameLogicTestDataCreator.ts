import { IPieceLogic } from '../IPieceLogic';

export function CreateDraggedForAllPiecesConnected(): IPieceLogic {
    const dragged = {
        row: 0,
        column: 0,
        pieceHeight: 0,
        pieceWidth: 0,
        set: [],
        getAdjustedY: () => 0,
        getAdjustedX: () => 0,
        canRightConnectTo: () => true,
        canBottomConnectTo: () => false,
        canLeftConnectTo: () => false,
        canTopConnectTo: () => false,
        moveForBottomConnectWith: () => {},
        moveForLeftConnectWith: () => {},
        moveForRightConnectWith: () => {},
        moveForTopConnectWith: () => {},
        x: 0,
        y: 0,
    };
    // @ts-ignore
    dragged.set.push(dragged);
    return dragged;
}

export function CreateOtherPieceForAllPiecesConnected(): IPieceLogic {
    const otherPiece: IPieceLogic = <IPieceLogic>(<unknown>{
        row: 0,
        column: 1,
        y: 0,
        x: 1,
        set: [],
        getAdjustedX: () => 1,
        getAdjustedY: () => 0,
    });
    otherPiece.set.push(otherPiece);
    return otherPiece;
}

export function CreateTopChance() {
    const upChance: IPieceLogic = <IPieceLogic>(<unknown>{
        row: 0,
        column: 1,
        y: 1,
        x: 1,
        set: [],
        getAdjustedX: () => 1,
        getAdjustedY: () => 0,
    });
    upChance.set.push(upChance);
    return upChance;
}

export function CreateBottomChance() {
    const downChance: IPieceLogic = <IPieceLogic>(<unknown>{
        row: 2,
        column: 1,
        y: 1,
        x: 1,
        set: [],
        getAdjustedX: () => 1,
        getAdjustedY: () => 0,
    });
    downChance.set.push(downChance);
    return downChance;
}

export function CreateLeftChance() {
    const leftChance: IPieceLogic = <IPieceLogic>(<unknown>{
        row: 1,
        column: 0,
        y: 1,
        x: 1,
        set: [],
        getAdjustedX: () => 1,
        getAdjustedY: () => 0,
    });
    leftChance.set.push(leftChance);
    return leftChance;
}

export function CreateRightChance() {
    const rightChance: IPieceLogic = <IPieceLogic>(<unknown>{
        row: 1,
        column: 2,
        y: 1,
        x: 1,
        set: [],
        getAdjustedX: () => 1,
        getAdjustedY: () => 0,
    });
    rightChance.set.push(rightChance);
    return rightChance;
}

export function CreateDraggedPiece(
    upChance: IPieceLogic,
    leftChance: IPieceLogic,
    downChance: IPieceLogic,
    rightChance: IPieceLogic
) {
    const dragged: IPieceLogic = {
        row: 1,
        column: 1,
        y: 1,
        x: 1,
        set: [],
        getAdjustedX: () => 1,
        getAdjustedY: () => 0,
        moveForTopConnectWith: () => {},
        moveForRightConnectWith: () => {},
        moveForLeftConnectWith: () => {},
        moveForBottomConnectWith: () => {},
        canTopConnectTo: (upper) => upper === upChance,
        canLeftConnectTo: (left) => left === leftChance,
        canBottomConnectTo: (down) => down === downChance,
        canRightConnectTo: (right) => right === rightChance,
        pieceWidth: 10,
        pieceHeight: 10,
    };
    dragged.set.push(dragged);
    return dragged;
}

export function CreateOffScreenPieces(mostOffScreenX: number, mostOffScreenY: number): IPieceLogic[] {
    const pieces = [];
    for (let i = 0; i < 10; i++) {
        const dragged: IPieceLogic = {
            row: 0,
            column: 0,
            y: 0,
            x: 0,
            set: pieces,
            getAdjustedX: () => 1,
            getAdjustedY: () => 0,
            moveForTopConnectWith: () => {},
            moveForRightConnectWith: () => {},
            moveForLeftConnectWith: () => {},
            moveForBottomConnectWith: () => {},
            canTopConnectTo: () => false,
            canLeftConnectTo: () => false,
            canBottomConnectTo: () => false,
            canRightConnectTo: () => false,
            pieceWidth: 10,
            pieceHeight: 10,
        };
        pieces.push(dragged);
    }

    pieces[9].x = mostOffScreenX;
    pieces[9].y = mostOffScreenY;
    return pieces;
}
