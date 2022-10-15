import {PathMaker} from './PathMaker';
import {IBlockConfiguration} from '../helpers/IBlockConfiguration';
import {ITopPieceVisual} from './ITopPieceVisual';

export class TopPathMaker extends PathMaker {

    private readonly isLeftOut: boolean;

    constructor(piece: ITopPieceVisual, config: IBlockConfiguration) {
        super(config);
        this.isEmpty = piece.isTopEmpty();
        this.isOut = piece.isTopOut();
        this.isIn = piece.isTopIn();
        this.isLeftOut = piece.isLeftOut();
    }

    public moveToStartPoint(): string {
        let startPoint = this.isLeftOut ? `M ${this.height} ` : 'M 0 ';
        startPoint += this.isOut ? `${this.height} ` : '0 ';
        return startPoint;
    }

    public drawFirstPartOfLine(): string {
        let length: number;
        if (this.isEmpty)
            length = 3 * this.width;
        else
            length = this.width + this.width / 2 - this.height / 4;

        return `h ${length} `;
    }

    public drawLeftVerticalLine = () => `v ${this.isOut ? -this.height / 4 : this.height / 4} `;

    public drawLeftArc(): string {
        const r = this.height / 2;

        return this.isOut
            ? `c ${-r} ${0} ${-r} ${-r} ${0} ${-r} `
            : `c ${-r} ${0} ${-r} ${ r} ${0} ${ r} `;
    }

    public drawHorizontalConnectorLine = () => `h ${this.height / 2} `;

    public drawRightArc() {
        const r = this.height / 2;
        return this.isOut
            ? `c ${ r} ${0} ${ r} ${ r} ${0} ${ r} `
            : `c ${ r} ${0} ${ r} ${-r} ${0} ${-r} `;

    }

    public drawRightVerticalLine = () => `v ${this.isOut ? this.height / 4 : -this.height / 4 } `;

    public finishLine = () => `h ${this.width + this.width / 2 - this.height / 4} `;

    public draw(): string {
        let dContent = '';
        dContent += this.moveToStartPoint();
        dContent += this.drawFirstPartOfLine();

        if (!this.isEmpty) {
            dContent += this.drawLeftVerticalLine();
            dContent += this.drawLeftArc();
            dContent += this.drawHorizontalConnectorLine();
            dContent += this.drawRightArc();
            dContent += this.drawRightVerticalLine();
            dContent += this.finishLine();
        }

        return dContent;
    }
}
