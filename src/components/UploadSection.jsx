import React, { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

export const UploadSection = ({ user, onMessage }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const uploadFile = (file, user) => {
    return new Promise((resolve, reject) => {
      const fileType = file.type || 'application/octet-stream';
      const isText = fileType.startsWith('text/');
      const timestamp = Date.now();
      const filePath = `users/${user.uid}/${timestamp}_${file.name}`;
      const storageRef = ref(storage, filePath);

      const metadata = {
        contentType: fileType,
        customMetadata: {
          uploadedBy: user.email,
          uploadedAt: new Date().toISOString(),
          isText: isText.toString(),
        },
      };

      const uploadTask = uploadBytesResumable(storageRef, file, metadata);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const fileProgress = snapshot.bytesTransferred / snapshot.totalBytes;
          resolve({ progress: fileProgress, completed: false });
        },
        (error) => {
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log('File uploaded:', {
              name: file.name,
              path: filePath,
              url: downloadURL,
              type: fileType,
              isText: isText,
            });
            resolve({ progress: 1, completed: true });
          } catch (error) {
            reject(error);
          }
        }
      );
    });
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      onMessage('ファイルを選択してください', 'error');
      return;
    }

    setUploading(true);
    setProgress(0);

    try {
      const totalFiles = selectedFiles.length;
      let completedFiles = 0;

      for (const file of selectedFiles) {
        await new Promise((resolve, reject) => {
          const fileType = file.type || 'application/octet-stream';
          const isText = fileType.startsWith('text/');
          const timestamp = Date.now();
          const filePath = `users/${user.uid}/${timestamp}_${file.name}`;
          const storageRef = ref(storage, filePath);

          const metadata = {
            contentType: fileType,
            customMetadata: {
              uploadedBy: user.email,
              uploadedAt: new Date().toISOString(),
              isText: isText.toString(),
            },
          };

          const uploadTask = uploadBytesResumable(storageRef, file, metadata);

          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const fileProgress = snapshot.bytesTransferred / snapshot.totalBytes;
              const totalProgress = ((completedFiles + fileProgress) / totalFiles) * 100;
              setProgress(totalProgress);
            },
            (error) => {
              reject(error);
            },
            async () => {
              completedFiles++;
              resolve();
            }
          );
        });
      }

      onMessage('すべてのファイルのアップロードが完了しました', 'success');
      setSelectedFiles([]);
      setProgress(0);
      // ファイル入力をリセット
      document.getElementById('fileInput').value = '';
    } catch (error) {
      console.error('Upload error:', error);
      onMessage(`アップロードエラー: ${error.message}`, 'error');
    } finally {
      setUploading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="upload-section active">
      <div className="file-input-wrapper">
        <label className="file-input-label">ファイルを選択</label>
        <input
          type="file"
          id="fileInput"
          multiple
          onChange={handleFileSelect}
          disabled={uploading}
        />
      </div>

      <button onClick={handleUpload} disabled={selectedFiles.length === 0 || uploading}>
        {uploading ? 'アップロード中...' : 'アップロード'}
      </button>

      {uploading && (
        <div className="progress-bar active">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
      )}

      {selectedFiles.length > 0 && (
        <div className="file-list">
          <h3>選択されたファイル:</h3>
          <div id="fileItems">
            {selectedFiles.map((file, index) => (
              <div key={index} className="file-item">
                <span className="file-name">{file.name}</span>
                <span className="file-size">{formatFileSize(file.size)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
