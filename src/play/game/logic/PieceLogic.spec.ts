import { PieceLogic } from './PieceLogic';
import { GameConfiguration } from '../helpers/GameConfiguration';
import { Point } from '../helpers/Point';
import { ConnectLimits } from './ConnectLimits';
import { IPieceLogic } from './IPieceLogic';

describe('Piecelogic', () => {
    const config = new GameConfiguration();
    config.blockHeight = 10;
    config.blockWidth = 10;
    config.cutY = 10;
    config.cutX = 10;
    config.playImageHeight = 100;
    config.viewHeight = 1000;
    config.viewWidth = 1000;

    const someDifference = new Point(10, 10);
    const noDifference = new Point(0, 0);
    Math.random = () => 1;
    const limits = new ConnectLimits(config);

    let logic: PieceLogic;

    beforeEach(() => {
        logic = new PieceLogic(0, 0, config, limits);
        logic.pieceWidth = 10;
        logic.pieceHeight = 10;
        logic.x = 0;
        logic.y = 0;
    });

    it('setStartPoint puts the piece on the playing area at random position', function () {
        logic.setStartPoint();
        expect(logic.x).toBe(Math.random() * (config.viewWidth - logic.pieceWidth));
        expect(logic.y).toBe(Math.random() * (config.viewHeight - logic.pieceHeight));
    });

    it('getAdjustedX returns x + the set x difference for the piece', function () {
        logic.setAnchorPointDifference(someDifference);
        expect(logic.getAdjustedX()).toBe(logic.x + someDifference.x);
    });

    it('getAdjustedY returns y + the set y difference for the piece', function () {
        logic.setAnchorPointDifference(someDifference);
        expect(logic.getAdjustedY()).toBe(logic.y + someDifference.y);
    });

    it('can connect on the top connector if the top piece is close enough', () => {
        const topPiece: IPieceLogic = <IPieceLogic>(<unknown>{
            x: 1,
            y: 1,
            row: 1,
            column: 1,
            getAdjustedX: () => limits.xLimitForYChecks,
            getAdjustedY: () => -limits.ySmallLimitForYChecks,
            set: [this],
        });

        logic.setAnchorPointDifference(noDifference);
        const can = logic.canTopConnectTo(topPiece);
        expect(can).toBe(true);
    });

    it('moveForTopConnectWith moves the whole set up', () => {
        const expectedDiff = 3;

        // explanation for the y a piece is at least 3 * blockheight, up is a negative number, so a top piece that can connect
        // is at a  -(3 * blockheight up + some diff) vertical coordinate for it to be able to connect
        const topPiece: IPieceLogic = <IPieceLogic>(<unknown>{
            x: 0,
            y: 0,
            row: 0,
            column: 0,
            getAdjustedX: () => expectedDiff,
            getAdjustedY: () => -(3 * config.blockHeight) - expectedDiff,
            set: [this],
        });

        const inSetPiece: IPieceLogic = <IPieceLogic>(<unknown>{
            x: 0,
            y: 0,
            row: 0,
            column: 0,
            getAdjustedX: () => 0,
            getAdjustedY: () => 0,
            set: [this],
        });

        logic.set.push(inSetPiece);
        logic.setAnchorPointDifference(noDifference);

        logic.moveForTopConnectWith(topPiece);

        expect(logic.x).toBe(expectedDiff);
        expect(logic.y).toBe(-expectedDiff);
        expect(inSetPiece.x).toBe(expectedDiff);
        expect(inSetPiece.y).toBe(-expectedDiff);
    });

    it('can connect on the right connector if the right piece is close enough', () => {
        const rightPiece: IPieceLogic = <IPieceLogic>(<unknown>{
            x: 0,
            y: 0,
            row: 0,
            column: 0,
            getAdjustedX: () => limits.xSmallLimitForXChecks,
            getAdjustedY: () => limits.yLimitForXChecks,
            set: [this],
        });

        logic.setAnchorPointDifference(noDifference);
        const can = logic.canRightConnectTo(rightPiece);
        expect(can).toBe(true);
    });

    it('moveForRightConnectWith moves the whole set to the right', () => {
        const expectedDiff = 3;

        // for the right to connect the piece should be on the right at minimum 3 * blockwidth + some diff
        const rightPiece: IPieceLogic = <IPieceLogic>(<unknown>{
            x: 0,
            y: 0,
            row: 0,
            column: 0,
            getAdjustedX: () => 3 * config.blockWidth + expectedDiff,
            getAdjustedY: () => expectedDiff,
            set: [this],
        });

        const inSetPiece: IPieceLogic = <IPieceLogic>(<unknown>{
            x: 0,
            y: 0,
            row: 0,
            column: 0,
            getAdjustedX: () => 0,
            getAdjustedY: () => 0,
            set: [this],
        });

        logic.set.push(inSetPiece);
        logic.setAnchorPointDifference(noDifference);

        logic.moveForRightConnectWith(rightPiece);

        expect(logic.x).toBe(expectedDiff);
        expect(logic.y).toBe(expectedDiff);
        expect(inSetPiece.x).toBe(expectedDiff);
        expect(inSetPiece.y).toBe(expectedDiff);
    });

    it('can connect on the left connector if the left piece is close enough', () => {
        const leftPiece: IPieceLogic = <IPieceLogic>(<unknown>{
            x: 0,
            y: 0,
            row: 0,
            column: 0,
            getAdjustedX: () => -limits.xSmallLimitForXChecks,
            getAdjustedY: () => limits.yLimitForXChecks,
            set: [this],
        });

        logic.setAnchorPointDifference(noDifference);
        const can = logic.canLeftConnectTo(leftPiece);
        expect(can).toBe(true);
    });

    it('moveForLeftConnectWith moves the whole set to the left', () => {
        const expectedDiff = -3;

        // for the right to connect the piece should be on the right at minimum 3 * blockwidth + some diff
        const left: IPieceLogic = <IPieceLogic>(<unknown>{
            x: 0,
            y: 0,
            row: 0,
            column: 0,
            getAdjustedX: () => -(3 * config.blockWidth) + expectedDiff,
            getAdjustedY: () => expectedDiff,
            set: [this],
        });

        const inSetPiece: IPieceLogic = <IPieceLogic>(<unknown>{
            x: 0,
            y: 0,
            row: 0,
            column: 0,
            getAdjustedX: () => 0,
            getAdjustedY: () => 0,
            set: [this],
        });

        logic.set.push(inSetPiece);
        logic.setAnchorPointDifference(noDifference);

        logic.moveForLeftConnectWith(left);

        expect(logic.x).toBe(expectedDiff);
        expect(logic.y).toBe(expectedDiff);
        expect(inSetPiece.x).toBe(expectedDiff);
        expect(inSetPiece.y).toBe(expectedDiff);
    });

    it('can connect on the bottom connector if the bottom piece is close enough', () => {
        const bottomPiece: IPieceLogic = <IPieceLogic>(<unknown>{
            x: 0,
            y: 0,
            row: 0,
            column: 0,
            getAdjustedX: () => limits.xLimitForYChecks,
            getAdjustedY: () => limits.ySmallLimitForYChecks,
            set: [this],
        });

        logic.setAnchorPointDifference(noDifference);
        const can = logic.canBottomConnectTo(bottomPiece);
        expect(can).toBe(true);
    });

    it('moveForBottomConnectWith moves the whole set down', () => {
        const expectedDiff = 3;

        // for the right to connect the piece should be on the right at minimum 3 * blockwidth + some diff
        const left: IPieceLogic = <IPieceLogic>(<unknown>{
            x: 0,
            y: 0,
            row: 0,
            column: 0,
            getAdjustedX: () => expectedDiff,
            getAdjustedY: () => 3 * config.blockHeight + expectedDiff,
            set: [this],
        });

        const inSetPiece: IPieceLogic = <IPieceLogic>(<unknown>{
            x: 0,
            y: 0,
            row: 0,
            column: 0,
            getAdjustedX: () => 0,
            getAdjustedY: () => 0,
            set: [this],
        });

        logic.set.push(inSetPiece);
        logic.setAnchorPointDifference(noDifference);

        logic.moveForBottomConnectWith(left);

        expect(logic.x).toBe(expectedDiff);
        expect(logic.y).toBe(expectedDiff);
        expect(inSetPiece.x).toBe(expectedDiff);
        expect(inSetPiece.y).toBe(expectedDiff);
    });
});
