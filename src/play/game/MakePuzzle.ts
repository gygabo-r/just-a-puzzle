// https://stackoverflow.com/questions/8912917/cutting-an-image-into-pieces-through-javascript
import { GameBuilder } from './builders/GameBuilder';
import { HintService } from '../hint.service';
import { BackgroundBrightnessService } from '../background-brightness.service';

export class MakePuzzle {
    private sourceImage: HTMLImageElement;
    // @ts-ignore
    private gameBuilder: GameBuilder;

    constructor(
        private sourceImageDataUrl: string,
        private cutX: number,
        private cutY: number,
        hintService: HintService,
        brightnessService: BackgroundBrightnessService
    ) {
        this.sourceImage = new Image();
        this.sourceImage.src = this.sourceImageDataUrl;
        this.sourceImage.id = 'sourceImage';
        this.sourceImage.onload = (event: any) => {
            this.gameBuilder = new GameBuilder(this.sourceImage, hintService, brightnessService);
            this.gameBuilder.initialize(this.cutX, this.cutY);
            this.gameBuilder.setViewHeight();
            this.gameBuilder.setResizedDimension();
            this.gameBuilder.resizeImage();
        };
    }
}
