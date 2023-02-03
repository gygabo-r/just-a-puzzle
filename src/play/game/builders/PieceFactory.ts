import { GameConfiguration } from '../helpers/GameConfiguration';
import { PieceVisual } from '../visual/PieceVisual';
import { ConnectLimits } from '../logic/ConnectLimits';

export class PieceFactory {
    private readonly limits: ConnectLimits;

    constructor(private image: HTMLImageElement, private config: GameConfiguration) {
        const imageWidth = this.image.width;
        const imageHeight = this.image.height;

        this.config.blockHeight = Math.floor(imageHeight / (3 * this.config.cutY));
        this.config.blockWidth = Math.floor(imageWidth / (3 * this.config.cutX));
        this.limits = new ConnectLimits(config);
    }

    public createPieceVisuals(): PieceVisual[] {
        const data: PieceVisual[] = [];
        for (let row = 0; row < this.config.cutY; row++)
            for (let column = 0; column < this.config.cutX; column++) data.push(this.createPiece(row, column));

        this.addImageToPieces(data);
        return data;
    }

    private createPiece(row: number, column: number): PieceVisual {
        const piece = new PieceVisual(row, column, this.config, this.limits);
        piece.logic.setAnchorPointDifference(piece.getStartingPointDifference());
        return piece;
    }

    private addImageToPieces(data: PieceVisual[]): PieceVisual[] {
        data.forEach((d) => {
            const canvas = document.createElement('canvas');

            canvas.width = d.getWidth();
            canvas.height = d.getHeight();
            const context = canvas.getContext('2d') as CanvasRenderingContext2D;
            const topLeftX = d.column * 3 * this.config.blockWidth - d.paddingLeft;
            const topLeftY = d.row * 3 * this.config.blockHeight - d.paddingTop;

            context.drawImage(
                this.image,
                topLeftX,
                topLeftY,
                canvas.width,
                canvas.height,
                0,
                0,
                canvas.width,
                canvas.height
            );
            d.imageDataUrl = canvas.toDataURL();
        });
        return data;
    }
}
