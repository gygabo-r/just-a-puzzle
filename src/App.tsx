import React, { useCallback, useState } from 'react';
import { ImageUploader } from './ImageUploader';
import './site.css';
import { CutSelection } from './CutSelection';

type State = 'upload' | 'cut-selection' | 'play';

const App = () => {
    const [imageDataUrl, setImageDataUrl] = useState('');
    const [state, setState] = useState<State>('upload');

    const handleUpload = useCallback((url: string) => {
        setImageDataUrl(url);
        setState('cut-selection');
    }, []);
    return (
        <div className="container">
            {state === 'upload' && <ImageUploader onUpload={handleUpload} />}
            {state === 'cut-selection' && <CutSelection image={imageDataUrl} />}
        </div>
    );
};

export default App;
