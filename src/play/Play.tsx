import React, { useLayoutEffect } from 'react';
import { CutOption } from '../interfaces/CutOption';
import { startGame } from './game/startGame';
import { BackgroundBrightnessService } from './background-brightness.service';
import { D3WrapperService } from './d3-wrapper.service';

type Props = {
    selectedCut: CutOption;
    imageData: string;
};

const Play: React.FC<Props> = (p) => {
    const { imageData, selectedCut } = p;
    useLayoutEffect(
        () => startGame(new BackgroundBrightnessService(new D3WrapperService()), selectedCut, imageData),
        [imageData, selectedCut]
    );

    return (
        <div className="container" style={{ padding: '2rem' }}>
            <div id="play-area" className="container" />
        </div>
    );
};

export default Play;
