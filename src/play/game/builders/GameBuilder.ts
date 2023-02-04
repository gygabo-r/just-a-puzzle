import { GameConfiguration } from '../helpers/GameConfiguration';
import { PieceFactory } from './PieceFactory';
import { GameLogic } from '../logic/GameLogic';
import * as d3 from 'd3';
import { BaseType, Selection } from 'd3-selection';
import { PieceLogic } from '../logic/PieceLogic';
import { PieceVisual } from '../visual/PieceVisual';
import { BackgroundBrightnessService } from '../../background-brightness.service';
import { IPieceLogic } from '../logic/IPieceLogic';

export class GameBuilder {
    private svgTargetId = 'play-area';
    private config: GameConfiguration = new GameConfiguration();
    private resizedWidth: number = 0;
    private resizedHeight: number = 0;
    // @ts-ignore
    private resizedImage: HTMLImageElement;
    // @ts-ignore
    private gameLogic: GameLogic;
    public isGameFinished = false;

    constructor(private sourceImage: HTMLImageElement, private brightnessService: BackgroundBrightnessService) {}

    public initialize(cutX: number, cutY: number): void {
        this.config.cutX = cutX;
        this.config.cutY = cutY;
    }

    public setViewHeight(): void {
        const element = document.getElementById(this.svgTargetId) as HTMLElement;
        const clientRect = element.getBoundingClientRect();
        console.log(clientRect);
        this.config.playImageHeight = clientRect.height / 2;
        this.config.viewHeight = clientRect.height;
        this.config.viewWidth = clientRect.width;
    }

    public setResizedDimension(): void {
        const ratio = this.config.playImageHeight / this.sourceImage.height;
        this.resizedWidth = this.sourceImage.width * ratio;
        this.resizedHeight = this.sourceImage.height * ratio;
    }

    public resizeImage(): void {
        const canvas = document.createElement('canvas');
        canvas.height = this.resizedHeight;
        canvas.width = this.resizedWidth;
        const context = canvas.getContext('2d') as CanvasRenderingContext2D;
        context.drawImage(this.sourceImage, 0, 0, this.resizedWidth, this.resizedHeight);
        this.resizedImage = new Image();
        this.resizedImage.src = canvas.toDataURL();
        this.resizedImage.width = this.resizedWidth;
        this.resizedImage.height = this.resizedHeight;
        this.resizedImage.onload = () => this.letsCreate();
    }

    private letsCreate = () => {
        const factory = new PieceFactory(this.resizedImage, this.config);
        const data = factory.createPieceVisuals();
        this.gameLogic = new GameLogic(
            this.config,
            data.map((p) => p.logic)
        );
        this.createD3Parts(data);
    };

    private createD3Parts = (data: PieceVisual[]) => {
        const drag: any = d3
            .drag()
            .on(
                'drag',
                createDragged(() => this.isGameFinished)
            )
            .on('end', this.dragEnd);

        d3.select('svg').remove();

        const svg = d3
            .select(`#${this.svgTargetId}`)
            .append('svg')
            .attr('width', this.config.viewWidth)
            .attr('height', this.config.viewHeight)
            .style('background-color', this.brightnessService.backgroundColor);

        svg.append('defs')
            .selectAll('path')
            .data(data)
            .enter()
            .append('clipPath')
            .attr('id', (d) => `i${d.row}j${d.column}`)
            .append('path')
            .attr('d', (d) => d.createPath());

        svg.selectAll('image')
            .data(data)
            .enter()
            .append('image')
            .attr('transform', (d) => `translate(${[d.logic.x, d.logic.y]})`)
            .attr('width', (d) => d.getWidth())
            .attr('height', (d) => d.getHeight())
            .attr('xlink:href', (d) => d.imageDataUrl)
            .attr('clip-path', (d) => `url(#i${d.row}j${d.column})`)
            .attr('id', (d) => `imi${d.row}j${d.column}`)
            .call(drag)
            .on('mousedown', () => svg.selectAll('circle').remove());

        svg.on('mousedown', () => {
            svg.selectAll('circle').remove();
        });
    };

    private dragEnd = (_: any, piece: unknown) => {
        const typedPiece = piece as PieceVisual;
        if (!this.isGameFinished) this.gameLogic.checkPieces(typedPiece.logic);

        typedPiece.logic.isDragging = false;

        typedPiece.logic.set.forEach((item: IPieceLogic) => {
            d3.select(`#imi${item.row}j${item.column}`).attr('transform', 'translate(' + [item.x, item.y] + ')');
        });

        if (this.gameLogic.areAllPiecesConnected() && !this.isGameFinished) {
            this.isGameFinished = true;
        }
    };
}

function createDragged(isGameFinished: () => boolean) {
    return function (event: DragEvent, piece: any) {
        d3.selectAll('circle').remove();
        const moveElement = (pl: PieceLogic) => {
            const el = d3.select(`#imi${pl.row}j${pl.column}`);
            moveToTop(el);
            //@ts-ignore
            pl.x += event.dx;
            //@ts-ignore
            pl.y += event.dy;
            el.attr('transform', 'translate(' + [pl.x, pl.y] + ')');
        };

        const moveToTop = (el: Selection<BaseType, any, HTMLElement, any>) => {
            if (!piece.logic.isDragging) el.raise();
        };

        piece.logic.set.forEach(moveElement);

        if (!piece.logic.isDragging && !isGameFinished()) {
            piece.logic.isDragging = true;
        }
    };
}
