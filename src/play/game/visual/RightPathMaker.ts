import {PathMaker} from './PathMaker';
import {IBlockConfiguration} from '../helpers/IBlockConfiguration';
import {IRightPieceVisual} from './IRightPieceVisual';

export class RightPathMaker extends PathMaker {

    constructor(piece: IRightPieceVisual, config: IBlockConfiguration) {
        super(config);
        this.isEmpty = piece.isRightEmpty();
        this.isOut = piece.isRightOut();
        this.isIn = piece.isRightIn();
    }

    public drawFirstPartOfLine = () =>  `v ${ this.isEmpty ? this.height * 3 : this.height * 5 / 4} `;

    public drawTopHorizontalLine = () => `h ${ this.isIn ? -this.height / 4 : this.height / 4} `;

    public drawTopArc(): string {
        const r = this.height / 2;
        return this.isIn
            ? `c ${0} ${-r} ${-r} ${-r} ${-r} ${0} `
            : `c ${0} ${-r} ${ r} ${-r} ${ r} ${0} `;
    }

    public drawVerticalConnectorLine = () => `v ${this.height / 2} `;

    public drawLowArc(): string {
        const r = this.height / 2;
        return this.isIn
            ? `c ${0} ${r} ${ r} ${r} ${ r} ${0} `
            : `c ${0} ${r} ${-r} ${r} ${-r} ${0} `;
    }

    public drawLowHorizontalLine = () => `h ${ this.isIn ? this.height / 4 : -this.height / 4} `;

    public finishLine = () => `v ${this.height * 5 / 4} `;

    public draw(): string {
        let dContent = this.drawFirstPartOfLine();

        if (!this.isEmpty) {
            dContent += this.drawTopHorizontalLine();
            dContent += this.drawTopArc();
            dContent += this.drawVerticalConnectorLine();
            dContent += this.drawLowArc();
            dContent += this.drawLowHorizontalLine();
            dContent += this.finishLine();
        }

        return dContent;
    }

}
