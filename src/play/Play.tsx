import React, { useLayoutEffect, useRef, useState } from 'react';
import { CutOption } from '../interfaces/CutOption';
import { MakePuzzle } from './game/MakePuzzle';
import { BackgroundBrightnessService } from './background-brightness.service';
import { LocalStorageService } from './local-storage.service';
import { D3WrapperService } from './d3-wrapper.service';

type Props = {
    selectedCut: CutOption;
    imageData: string;
};

type Dimension = {
    width: number;
    height: number;
};

const Play: React.FC<Props> = (p) => {
    const { imageData, selectedCut } = p;
    const ref = useRef<HTMLDivElement | null>(null);
    const [dimensions, setDimensions] = useState<Dimension | undefined>();
    useLayoutEffect(() => {
        if (ref.current) {
            const rect = ref.current?.getBoundingClientRect();
            setDimensions({ width: rect.width, height: rect.height });
            new MakePuzzle(
                imageData,
                selectedCut.x,
                selectedCut.y,
                new BackgroundBrightnessService(new LocalStorageService(), new D3WrapperService())
            );
        }
    }, []);

    return <div id="play-area" className="container" ref={ref} />;
};

export default Play;
