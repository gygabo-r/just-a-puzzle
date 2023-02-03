import { Point } from '../helpers/Point';
import { GameConfiguration } from '../helpers/GameConfiguration';
import { RightPathMaker } from './RightPathMaker';
import { LeftPathMaker } from './LeftPathMaker';
import { TopPathMaker } from './TopPathMaker';
import { BottomPathMaker } from './BottomPathMaker';
import { PieceLogic } from '../logic/PieceLogic';
import { IBottomPieceVisual } from './IBottomPieceVisual';
import { ILeftPieceVisual } from './ILeftPieceVisual';
import { IRightPieceVisual } from './IRightPieceVisual';
import { ITopPieceVisual } from './ITopPieceVisual';
import { ConnectLimits } from '../logic/ConnectLimits';

export class PieceVisual implements IBottomPieceVisual, ILeftPieceVisual, IRightPieceVisual, ITopPieceVisual {
    private readonly outConst = 'out';
    private readonly inConst = 'in';
    private readonly emptyConst = 'empty';

    public paddingLeft = 0;
    public paddingTop = 0;

    public imageDataUrl: string = '';

    private leftConnector: string = '';
    private rightConnector: string = '';
    private topConnector: string = '';
    private bottomConnector: string = '';

    public logic: PieceLogic;

    constructor(public row: number, public column: number, public config: GameConfiguration, limits: ConnectLimits) {
        this.calculateConnectors();
        this.calculateSizePaddings();
        this.logic = new PieceLogic(row, column, config, limits);
        this.logic.pieceWidth = this.getWidth();
        this.logic.pieceHeight = this.getHeight();
        this.logic.setStartPoint();
    }

    private calculateConnectors(): void {
        if ((this.row + this.column) % 2 === 0) {
            this.leftConnector = this.outConst;
            this.rightConnector = this.outConst;
            this.topConnector = this.inConst;
            this.bottomConnector = this.inConst;
        } else {
            this.leftConnector = this.inConst;
            this.rightConnector = this.inConst;
            this.topConnector = this.outConst;
            this.bottomConnector = this.outConst;
        }

        if (this.row === 0) this.topConnector = this.emptyConst;

        if (this.row === this.config.cutY - 1) this.bottomConnector = this.emptyConst;

        if (this.column === 0) this.leftConnector = this.emptyConst;

        if (this.column === this.config.cutX - 1) this.rightConnector = this.emptyConst;
    }

    public getWidth() {
        let x = 0;
        if (this.isLeftOut()) x += 1;
        if (this.isRightOut()) x += 1;
        return this.config.blockWidth * 3 + x * this.config.blockHeight;
    }

    public getHeight() {
        let y = 3;
        if (this.isTopOut()) y += 1;
        if (this.isBottomOut()) y += 1;
        return this.config.blockHeight * y;
    }

    private calculateSizePaddings(): void {
        if (this.isLeftOut()) {
            this.paddingLeft = this.config.blockHeight;
        }

        if (this.isTopOut()) this.paddingTop = this.config.blockHeight;
    }

    public isTopEmpty = () => this.topConnector === this.emptyConst;

    public isTopOut = () => this.topConnector === this.outConst;

    public isTopIn = () => this.topConnector === this.inConst;

    public isLeftEmpty = () => this.leftConnector === this.emptyConst;

    public isLeftOut = () => this.leftConnector === this.outConst;

    public isLeftIn = () => this.leftConnector === this.inConst;

    public isBottomEmpty = () => this.bottomConnector === this.emptyConst;

    public isBottomOut = () => this.bottomConnector === this.outConst;

    public isBottomIn = () => this.bottomConnector === this.inConst;

    public isRightEmpty = () => this.rightConnector === this.emptyConst;

    public isRightOut = () => this.rightConnector === this.outConst;

    public isRightIn = () => this.rightConnector === this.inConst;

    public getStartingPointDifference(): Point {
        let x = 0;
        let y = 0;

        if (this.isTopOut()) y = this.config.blockHeight;

        if (this.isLeftOut()) {
            x = this.config.blockHeight;
        }

        return new Point(x, y);
    }

    public createPath(): string {
        let dContent = new TopPathMaker(this, this.config).draw();
        dContent += new RightPathMaker(this, this.config).draw();
        dContent += new BottomPathMaker(this, this.config).draw();
        dContent += new LeftPathMaker(this, this.config).draw();

        dContent += 'Z';
        return dContent;
    }

    public getHintR(): number {
        const smaller = Math.min(this.getWidth(), this.getHeight());
        return smaller / 3;
    }
}
