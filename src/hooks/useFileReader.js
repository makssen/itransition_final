import { useEffect, useState } from 'react';

export const useFileReader = () => {
    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);

    useEffect(() => {
        if (files.length > 0) {
            setPreviews([]);
            files.forEach(file => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreviews(prev => [...prev, reader.result]);
                }
                reader.readAsDataURL(file);
            });
        } else {
            setPreviews([]);
        }
    }, [files]);

    return { files, setFiles, previews, setPreviews };
}