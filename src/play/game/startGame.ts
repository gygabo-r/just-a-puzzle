// https://stackoverflow.com/questions/8912917/cutting-an-image-into-pieces-through-javascript
import { GameBuilder } from './builders/GameBuilder';
import { BackgroundBrightnessService } from '../background-brightness.service';
import { CutOption } from '../../interfaces/CutOption';

export const startGame = (
    brightnessService: BackgroundBrightnessService,
    selectedCut: CutOption,
    imageData: string
) => {
    const sourceImage = new Image();
    sourceImage.id = 'sourceImage';
    sourceImage.onload = () => {
        const builder = new GameBuilder(sourceImage, brightnessService);
        builder.initialize(selectedCut.x, selectedCut.y);
        builder.setViewHeight();
        builder.setResizedDimension();
        builder.resizeImage();
    };
    sourceImage.src = imageData;
};
