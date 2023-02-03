import {PathMaker} from './PathMaker';
import {IBlockConfiguration} from '../helpers/IBlockConfiguration';
import {ILeftPieceVisual} from './ILeftPieceVisual';

export class LeftPathMaker extends PathMaker {

    constructor(piece: ILeftPieceVisual, config: IBlockConfiguration) {
        super(config);
        this.isEmpty = piece.isLeftEmpty();
        this.isOut = piece.isLeftOut();
        this.isIn = piece.isLeftIn();
    }

    public drawFirstPartOfLine = () => `v ${ this.isEmpty ? -this.height * 3 : -this.height * 5 / 4} `;

    public drawBottomHorizontalLine = () =>  `h ${ this.isIn ? this.height / 4 : - this.height / 4} `;

    public drawLowArc() {
        const r = this.height / 2;

        return this.isIn
            ? `c ${0} ${r} ${ r} ${r} ${ r} ${0} `
            : `c ${0} ${r} ${-r} ${r} ${-r} ${0} `;
    }

    public drawVerticalConnectorLine = () =>  `v ${-this.height / 2} `;

    public drawTopArc() {
        const r = this.height / 2;
        return this.isIn
            ? `c ${0} ${-r} ${-r} ${-r} ${-r} ${0} `
            : `c ${0} ${-r} ${ r} ${-r} ${ r} ${0} `;
    }

    public drawTopHorizontalLine = () => `h ${ this.isIn ? -this.height / 4 : this.height / 4} `;

    public finishLine = () => `v ${-this.height * 5 / 4} `;

    public draw(): string {
        let dContent = this.drawFirstPartOfLine();

        if (!this.isEmpty) {
          dContent += this.drawBottomHorizontalLine();
          dContent += this.drawLowArc();
          dContent += this.drawVerticalConnectorLine();
          dContent += this.drawTopArc();
          dContent += this.drawTopHorizontalLine();
          dContent += this.finishLine();
        }

        return dContent;
    }
}
