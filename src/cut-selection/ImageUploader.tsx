import React, { ChangeEvent, useCallback } from 'react';
import './ImageUploader.css';

type Props = {
    onUpload: (url: string) => void;
};

export const ImageUploader: React.FC<Props> = (p) => {
    const { onUpload } = p;
    const loadFile = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const { currentTarget } = event;
            const reader = new FileReader();
            const lastListener = () => {
                if (reader.result) {
                    onUpload(reader.result as string);
                }
            };
            reader.addEventListener('load', lastListener);
            const file = currentTarget.files?.[0];
            if (file) {
                reader.readAsDataURL(file);
            }
        },
        [onUpload]
    );

    return (
        <div className="container centered">
            <label htmlFor="upload-image" className="upload_label">
                <input
                    onChange={loadFile}
                    id="upload-image"
                    name="upload-image"
                    type="file"
                    style={{ display: 'none' }}
                />
                <span className="upload_button">Play with new image</span>
            </label>
        </div>
    );
};
