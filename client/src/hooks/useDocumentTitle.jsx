import { useEffect } from 'react';

const useDocumentTitle = (title) => {
    useEffect(() => {
        document.title = `${title} | DigiLab SMEKDA`;
        
        return () => {
            document.title = "DigiLab SMEKDA - Perpustakaan Digital";
        };
    }, [title]);
};

export default useDocumentTitle;