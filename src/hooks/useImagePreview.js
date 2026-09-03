import { useState, useEffect, useCallback } from 'react';

export function useImagePreview(initialImage = '') {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(initialImage);

  useEffect(() => {
    if (!file && initialImage) {
      setPreviewUrl(initialImage);
    }
  }, [initialImage, file]);

  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = useCallback((e) => {
    const selectedFile = e?.target?.files?.[0] || (e instanceof File ? e : null);
    if (!selectedFile) return;

    setPreviewUrl((prev) => {
      if (prev && prev.startsWith('blob:')) {
        URL.revokeObjectURL(prev);
      }
      return URL.createObjectURL(selectedFile);
    });

    setFile(selectedFile);
  }, []);

  const reset = useCallback((fallbackUrl = initialImage) => {
    setPreviewUrl((prev) => {
      if (prev && prev.startsWith('blob:')) {
        URL.revokeObjectURL(prev);
      }
      return fallbackUrl;
    });
    setFile(null);
  }, [initialImage]);

  return {
    file,
    previewUrl,
    handleFileChange,
    reset,
    setFile,
  };
}