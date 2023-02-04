import React from 'react';
import './CutSelection.css';
import { CutOption } from '../interfaces/CutOption';
import useCuts from './useCuts';

type Props = {
    image: string;
    selectedCut: CutOption | undefined;
    onCutChange: (c: CutOption) => void;
    onCancel: () => void;
    onStartPlay: () => void;
};

export const CutSelection: React.FC<Props> = (p) => {
    const { image, onCutChange, selectedCut, onStartPlay, onCancel } = p;
    const cuts = useCuts(image);
    return (
        <div className="cut-selection-container">
            <div className="image-container">
                <img src={image} alt="the selected one" />
            </div>
            <div className="cuts-container">
                {cuts.map((cut) => (
                    <Option key={JSON.stringify(cut)} cut={cut} onCutChange={onCutChange} selectedCut={selectedCut} />
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

const Option: React.FC<{ cut: CutOption; selectedCut?: CutOption; onCutChange: (c: CutOption) => void }> = (p) => {
    const { cut, onCutChange, selectedCut } = p;

    return (
        <label className="cut-label">
            <input
                type="radio"
                name="cut-option"
                id={`${cut.x} x ${cut.y}`}
                checked={selectedCut?.x === cut.x && selectedCut?.y === cut.y}
                onChange={() => onCutChange(cut)}
            />
            {`${cut.x * cut.y}`}
        </label>
    );
};
