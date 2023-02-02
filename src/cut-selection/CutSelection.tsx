import React, { useMemo } from 'react';
import './CutSelection.css';
import { CutOption } from '../interfaces/CutOption';

type Props = {
    image: string;
    selectedCut: CutOption | undefined;
    onCutChange: (c: CutOption) => void;
    onCancel: () => void;
    onStartPlay: () => void;
};

const cutArray = [2, 3, 4, 5, 6, 7, 8, 9, 10];

export const CutSelection: React.FC<Props> = (p) => {
    const { image, onCutChange, selectedCut, onStartPlay, onCancel } = p;

    const cuts: CutOption[] = useMemo(() => {
        const imgElement = new Image();
        imgElement.src = image;
        return cutArray.map((cutY) => {
            const height = Math.floor(imgElement.height / cutY);
            const width = Math.floor(height / 5) * 6;
            const lowerCutX = Math.floor(imgElement.width / width);
            const upperCutX = lowerCutX + 1;
            const lowerDiff = imgElement.width - width * lowerCutX;
            const upperDiff = width * upperCutX - imgElement.width;

            return lowerDiff < upperDiff ? { x: lowerCutX, y: cutY } : { x: upperCutX, y: cutY };
        });
    }, [image]);

    console.log(cuts);

    return (
        <div className="cut-selection-container">
            <div className="image-container">
                <img src={image} className="displayImage" alt="the selected one" />
            </div>
            <div className="cuts-container">
                {cuts.map((cut) => (
                    <label className="cut-label" key={JSON.stringify(cut)}>
                        <input
                            type="radio"
                            name="cut-option"
                            id={`${cut.x} x ${cut.y}`}
                            checked={selectedCut?.x === cut.x && selectedCut?.y === cut.y}
                            onChange={() => onCutChange(cut)}
                        />
                        {`${cut.x} x ${cut.y}`}
                    </label>
                ))}
            </div>
            <div className="cut-actions">
                <button onClick={onCancel}>Cancel</button>
                <button onClick={onStartPlay} disabled={!selectedCut}>
                    Start
                </button>
            </div>
        </div>
    );
};
