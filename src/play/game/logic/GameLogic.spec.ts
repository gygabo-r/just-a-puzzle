import { GameLogic } from './GameLogic';
import { GameConfiguration } from '../helpers/GameConfiguration';
import { IPieceLogic } from './IPieceLogic';
import {
    CreateBottomChance,
    CreateDraggedForAllPiecesConnected,
    CreateDraggedPiece,
    CreateLeftChance,
    CreateOffScreenPieces,
    CreateOtherPieceForAllPiecesConnected,
    CreateRightChance,
    CreateTopChance,
} from './testhelpers/GameLogicTestDataCreator';

describe('GameLogic', () => {
    const config = new GameConfiguration();
    config.blockHeight = 10;
    config.blockWidth = 10;
    config.viewWidth = 1000;
    config.viewHeight = 1000;
    config.playImageHeight = 100;
    config.cutX = 4;
    config.cutY = 3;

    it('all pieces are connected, when there is only one set left', () => {
        const draggedPiece: IPieceLogic = CreateDraggedForAllPiecesConnected();
        const otherPiece = CreateOtherPieceForAllPiecesConnected();
        const pieces: IPieceLogic[] = [otherPiece, draggedPiece];
        const logic = new GameLogic(config, pieces);

        logic.checkPieces(draggedPiece);

        expect(logic.areAllPiecesConnected()).toBe(true);
    });

    it('dragged piece gets connected to all the pieces it can', () => {
        const upChance = CreateTopChance();
        const downChance = CreateBottomChance();
        const leftChance = CreateLeftChance();
        const rightChance = CreateRightChance();
        const dragged = CreateDraggedPiece(upChance, leftChance, downChance, rightChance);
        const pieces = [upChance, downChance, rightChance, leftChance, dragged];
        const logic = new GameLogic(config, pieces);

        logic.checkPieces(dragged);

        expect(logic.areAllPiecesConnected()).toBe(true);
        expect(dragged.set.length).toBe(5);
    });

    it('moves back the pieces if they are off screen', () => {
        const pieceLogics = CreateOffScreenPieces(-500, -500);

        const logic = new GameLogic(config, pieceLogics);

        logic.checkPieces(pieceLogics[0]);

        const lastPiece = pieceLogics.pop();
        for (const piece of pieceLogics) {
            expect(piece.x).toBe(500);
            expect(piece.y).toBe(500);
        }

        expect(lastPiece?.x).toBe(0);
        expect(lastPiece?.y).toBe(0);
    });
});
