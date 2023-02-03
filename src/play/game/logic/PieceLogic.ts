import { Point } from '../helpers/Point';
import { GameConfiguration } from '../helpers/GameConfiguration';
import { IPieceLogic } from './IPieceLogic';
import { ConnectLimits } from './ConnectLimits';

export class PieceLogic implements IPieceLogic {
    public set: IPieceLogic[];
    public isDragging: boolean = false;

    public x: number = -1;
    public y: number = -1;

    public pieceWidth: number = -1;
    public pieceHeight: number = -1;

    private difference: Point = new Point(-1, -1);

    constructor(
        public row: number,
        public column: number,
        private config: GameConfiguration,
        private limits: ConnectLimits
    ) {
        this.set = [this];
    }

    public setStartPoint(): void {
        this.x = Math.floor(Math.random() * (this.config.viewWidth - this.pieceWidth));
        this.y = Math.floor(Math.random() * (this.config.viewHeight - this.pieceHeight));
    }

    public setAnchorPointDifference = (difference: Point) => (this.difference = difference);

    // the logic thinks in  3* blockheight * 3 * blockwidth rectangles when it thinks about matching
    // but when there are protrusions on the piece the upper left corner is not at the place needed
    // therefore we need to adjust for that and that is the difference
    // we need this adjustment because the view will place the piece by the real upper left corner
    // and that needs to be deducted
    public getAdjustedX = () => this.x + this.difference.x;
    public getAdjustedY = () => this.y + this.difference.y;

    public canTopConnectTo(upperPiece: IPieceLogic): boolean {
        if (this.set === upperPiece.set) return false;

        const yDiff = this.getAdjustedY() - upperPiece.getAdjustedY();
        const canConnectByY = yDiff >= this.limits.ySmallLimitForYChecks && yDiff <= this.limits.yBigLimitForYChecks;

        const xDiff = Math.abs(this.getAdjustedX() - upperPiece.getAdjustedX());
        const canConnectByX = xDiff <= this.limits.xLimitForYChecks;

        return canConnectByX && canConnectByY;
    }

    public moveForTopConnectWith(upperPiece: IPieceLogic): void {
        const yDiff = -(this.getAdjustedY() - upperPiece.getAdjustedY() - 3 * this.config.blockHeight);
        // should on the negative we will be going up
        const xDiff = upperPiece.getAdjustedX() - this.getAdjustedX();
        this.moveAllInSet(new Point(xDiff, yDiff));
    }

    public canRightConnectTo(pieceToTheRight: IPieceLogic): boolean {
        if (this.set === pieceToTheRight.set) return false;

        // now xdiff is important
        const yDiff = Math.abs(this.getAdjustedY() - pieceToTheRight.getAdjustedY());
        const canConnectByY = yDiff <= this.limits.yLimitForXChecks;

        const xDiff = pieceToTheRight.getAdjustedX() - this.getAdjustedX();
        // basically it determines if the piece that can connect on the right is on the right and close enough
        const canConnectByX = xDiff >= this.limits.xSmallLimitForXChecks && xDiff <= this.limits.xBigLimitForXChecks;
        return canConnectByX && canConnectByY;
    }

    public moveForRightConnectWith(pieceToTheRight: IPieceLogic): void {
        const xDiff = pieceToTheRight.getAdjustedX() - this.getAdjustedX() - 3 * this.config.blockWidth;
        // should on the negative we will be going up
        const yDiff = pieceToTheRight.getAdjustedY() - this.getAdjustedY();
        this.moveAllInSet(new Point(xDiff, yDiff));
    }

    public canBottomConnectTo(bottomPiece: IPieceLogic): boolean {
        if (this.set === bottomPiece.set) return false;

        const yDiff = bottomPiece.getAdjustedY() - this.getAdjustedY();
        const canConnectByY = yDiff >= this.limits.ySmallLimitForYChecks && yDiff <= this.limits.yBigLimitForYChecks;

        const xDiff = Math.abs(this.getAdjustedX() - bottomPiece.getAdjustedX());
        const canConnectByX = xDiff <= this.limits.xLimitForYChecks;
        return canConnectByX && canConnectByY;
    }

    public moveForBottomConnectWith(bottomPiece: IPieceLogic): void {
        const yDiff = bottomPiece.getAdjustedY() - this.getAdjustedY() - 3 * this.config.blockHeight;
        const xDiff = bottomPiece.getAdjustedX() - this.getAdjustedX();
        this.moveAllInSet(new Point(xDiff, yDiff));
    }

    public canLeftConnectTo(leftPiece: IPieceLogic): boolean {
        if (this.set === leftPiece.set) return false;

        const yDiff = Math.abs(this.getAdjustedY() - leftPiece.getAdjustedY());
        const canConnectByY = yDiff <= this.limits.yLimitForXChecks;

        const xDiff = this.getAdjustedX() - leftPiece.getAdjustedX();
        // basically it determines if the piece that can connect on the left is on the left and close enough
        const canConnectByX = xDiff >= this.limits.xSmallLimitForXChecks && xDiff <= this.limits.xBigLimitForXChecks;
        return canConnectByX && canConnectByY;
    }

    public moveForLeftConnectWith(leftPiece: IPieceLogic): void {
        const xDiff = -(this.getAdjustedX() - leftPiece.getAdjustedX() - 3 * this.config.blockWidth);
        const yDiff = leftPiece.getAdjustedY() - this.getAdjustedY();
        this.moveAllInSet(new Point(xDiff, yDiff));
    }

    private moveAllInSet(coordinates: Point) {
        this.set.forEach((l) => {
            l.x += coordinates.x;
            l.y += coordinates.y;
        });
    }

    public getCenterX(): number {
        return this.x + this.pieceWidth / 2;
    }

    public getCenterY(): number {
        return this.y + this.pieceHeight / 2;
    }
}
