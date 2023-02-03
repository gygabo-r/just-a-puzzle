import React, { useCallback, useState } from 'react';
import { CutOption } from './interfaces/CutOption';
import { ImageUploader } from './cut-selection/ImageUploader';
import { CutSelection } from './cut-selection/CutSelection';
import Play from './play/Play';

type State = 'upload' | 'cut-selection' | 'play';

const App = () => {
    const [imageDataUrl, setImageDataUrl] = useState('');
    const [state, setState] = useState<State>('upload');
    const [selectedCut, setSelectedCut] = useState<CutOption | undefined>();

    const handleUpload = useCallback((url: string) => {
        setImageDataUrl(url);
        setState('cut-selection');
    }, []);

    const handleBackToUpload = useCallback(() => {
        setImageDataUrl('');
        setState('upload');
    }, []);

    const handlePlay = useCallback(() => {
        setState('play');
    }, []);

    return (
        <div className="container">
            {state === 'upload' && <ImageUploader onUpload={handleUpload} />}
            {state === 'cut-selection' && (
                <CutSelection
                    image={imageDataUrl}
                    selectedCut={selectedCut}
                    onCutChange={setSelectedCut}
                    onCancel={handleBackToUpload}
                    onStartPlay={handlePlay}
                />
            )}
            {state === 'play' && !!selectedCut && <Play imageData={imageDataUrl} selectedCut={selectedCut} />}
        </div>
    );
};

export default App;
