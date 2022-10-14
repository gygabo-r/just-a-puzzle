import React, { useState } from 'react';
import { ImageUploader } from './ImageUploader';
import './site.css';

const App = () => {
    const [imageDataUrl, setImageDataUrl] = useState('');
    return (
        <div className="container">
            <ImageUploader onUpload={setImageDataUrl} />
            <img src={imageDataUrl} />
        </div>
    );
};

export default App;
