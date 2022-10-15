import {PathMaker} from './PathMaker';
import {IBottomPieceVisual} from './IBottomPieceVisual';
import {IBlockConfiguration} from '../helpers/IBlockConfiguration';

export class BottomPathMaker extends PathMaker {

    constructor(piece: IBottomPieceVisual, config: IBlockConfiguration) {
        super(config);
        this.isEmpty = piece.isBottomEmpty();
        this.isOut = piece.isBottomOut();
        this.isIn = piece.isBottomIn();
    }

    public drawFirstPartOfLine(): string {
        if (this.isEmpty)
            return `h ${(-3 * this.width)} `;

        return `h ${(-( 1.5 * this.width - this.height / 4))} `;
    }

    public drawRightVerticalLine = () =>  `v ${ this.isOut ? this.height / 4 : -this.height / 4} `;

    public drawRightArc(): string {
        const r = this.height / 2;
        return this.isOut
            ? `c ${r} ${0} ${r} ${ r} ${0} ${ r} `
            : `c ${r} ${0} ${r} ${-r} ${0} ${-r} `;
    }

    public drawHorizontalConnectorLine = () => `h ${-this.height / 2} `;

    public drawLeftArc(): string {
        const r = this.height / 2;

        return this.isOut
            ? `c ${-r} ${0} ${-r} ${-r} ${0} ${-r} `
            : `c ${-r} ${0} ${-r} ${ r} ${0} ${ r} `;
    }

    public drawLeftVerticalLine = () => `v ${ this.isOut ? -this.height / 4 : this.height / 4} `;

    public finishLine = () =>  `h ${-(this.width + this.width / 2 - this.height / 4)} `;

    public draw(): string {
        let dContent = this.drawFirstPartOfLine();

        if (!this.isEmpty) {
            dContent += this.drawRightVerticalLine();
            dContent += this.drawRightArc();
            dContent += this.drawHorizontalConnectorLine();
            dContent += this.drawLeftArc();
            dContent += this.drawLeftVerticalLine();
            dContent += this.finishLine();
        }

        return dContent;
    }
}
