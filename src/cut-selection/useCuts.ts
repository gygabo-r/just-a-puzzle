import { CutOption } from '../interfaces/CutOption';
import { useEffect, useMemo, useState } from 'react';

const emptyCuts: CutOption[] = [];
const cutArray = [2, 3, 4, 5, 6, 7, 8, 9, 10];
type Size = { width: number; height: number };

const useCuts = (image: string) => {
    const [size, setSize] = useState<Size | null>(null);

    useEffect(() => {
        setSize(null);
        if (image) {
            const handleLoad = () => setSize({ width: imgElement.width, height: imgElement.height });
            const imgElement = new Image();
            imgElement.addEventListener('load', handleLoad);
            imgElement.src = image;
            return () => imgElement.removeEventListener('load', handleLoad);
        }
    }, [image]);

    const cuts: CutOption[] = useMemo(() => {
        if (!size) return emptyCuts;
        return cutArray.map((cutY) => {
            const height = Math.floor(size.height / cutY);
            const width = Math.floor(height / 5) * 6;
            const lowerCutX = Math.floor(size.width / width);
            const upperCutX = lowerCutX + 1;
            const lowerDiff = size.width - width * lowerCutX;
            const upperDiff = width * upperCutX - size.width;
            return lowerDiff < upperDiff ? { x: lowerCutX, y: cutY } : { x: upperCutX, y: cutY };
        });
    }, [size]);
    return cuts;
};

export default useCuts;
