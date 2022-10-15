import React from 'react';
import { CutOption } from './App';

type Props = {
    imageData: string;
    cut: CutOption;
};

export const Play: React.FC<Props> = (p) => {
    const { imageData, cut } = p;
    return (
        <div>
            <img src={imageData} alt="play" style={{ width: '50%', height: '50%' }} />
        </div>
    );
};
