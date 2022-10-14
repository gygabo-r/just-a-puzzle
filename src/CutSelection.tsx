import React, { useMemo, useState } from 'react';
import './CutSelection.css';

type CutOption = {
    x: number;
    y: number;
};

type Props = {
    image: string;
};

const cutArray = [2, 3, 4, 5, 6, 7, 8, 9, 10];

export const CutSelection: React.FC<Props> = (p) => {
    const { image } = p;
    const [selectedCut, setSelectedCut] = useState<CutOption | undefined>();

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
    }, []);

    console.log(selectedCut);

    return (
        <div className="cut-selection-container">
            <div className="image-container">
                <img src={image} alt="selected image" />
            </div>
            <div className="cuts-container">
                {cuts.map((cut) => (
                    <label className="cut-label">
                        <input
                            type="radio"
                            name="cut-option"
                            id={`${cut.x} x ${cut.y}`}
                            checked={selectedCut?.x === cut.x && selectedCut?.y === cut.y}
                            onChange={() => setSelectedCut(cut)}
                        />
                        {`${cut.x} x ${cut.y}`}
                    </label>
                ))}
            </div>
        </div>
    );
};
