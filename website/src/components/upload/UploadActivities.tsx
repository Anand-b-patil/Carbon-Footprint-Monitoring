'use client';

import { useState } from 'react';
import FileDropzone from '@/components/upload/FileDropzone';
import AlternativeStates from '@/components/upload/AlternativeStates';

export default function UploadActivityContent() {
  const [uploadState, setUploadState] = useState<'idle' | 'ready' | 'uploading' | 'complete' | 'error'>('idle');
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setUploadState('ready');
  };

  const handleFileRemove = () => {
    setFile(null);
    setUploadState('idle');
  };

  const handleUpload = () => {
    if (!file) return;

    setUploadState('uploading');
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadState('complete');
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          Upload Activity Data
        </h1>
        <p className="text-gray-400">
          Upload your activity data via CSV to calculate emissions.
        </p>
      </div>

      {/* Main Upload Section */}
      {uploadState === 'idle' && (
        <>
          <FileDropzone onFileSelect={handleFileSelect} />
          <div className="text-center mt-4">
            <a href="#" className="text-sm text-gray-400 hover:text-gray-300 underline">
              Don't have a template? Download sample file.
            </a>
          </div>
        </>
      )}

      {/* Alternative States */}
      {uploadState !== 'idle' && (
        <AlternativeStates
          state={uploadState}
          file={file}
          progress={uploadProgress}
          onRemove={handleFileRemove}
          onUpload={handleUpload}
        />
      )}
    </div>
  );
}