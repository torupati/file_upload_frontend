import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

export function setupUpload(storage, auth) {
    const fileInput = document.getElementById('fileInput');
    const uploadBtn = document.getElementById('uploadBtn');
    const progressBar = document.getElementById('progressBar');
    const progressFill = document.getElementById('progressFill');
    const fileList = document.getElementById('fileList');
    const fileItems = document.getElementById('fileItems');

    let selectedFiles = [];

    // ファイル選択時
    fileInput.addEventListener('change', (e) => {
        selectedFiles = Array.from(e.target.files);
        
        if (selectedFiles.length > 0) {
            uploadBtn.disabled = false;
            displaySelectedFiles(selectedFiles, fileItems, fileList);
        } else {
            uploadBtn.disabled = true;
            fileList.classList.add('hidden');
        }
    });

    // アップロードボタン
    uploadBtn.addEventListener('click', async () => {
        if (selectedFiles.length === 0) {
            showMessage('ファイルを選択してください', 'error');
            return;
        }

        uploadBtn.disabled = true;
        progressBar.classList.add('active');

        try {
            await uploadFiles(selectedFiles, storage, auth, progressFill);
            showMessage('すべてのファイルのアップロードが完了しました', 'success');
            
            // リセット
            fileInput.value = '';
            selectedFiles = [];
            fileList.classList.add('hidden');
            progressFill.style.width = '0%';
        } catch (error) {
            console.error('Upload error:', error);
            showMessage(`アップロードエラー: ${error.message}`, 'error');
        } finally {
            uploadBtn.disabled = false;
            setTimeout(() => {
                progressBar.classList.remove('active');
            }, 1000);
        }
    });
}

async function uploadFiles(files, storage, auth, progressFill) {
    const user = auth.currentUser;
    if (!user) {
        throw new Error('ユーザーが認証されていません');
    }

    const totalFiles = files.length;
    let completedFiles = 0;

    for (const file of files) {
        await uploadSingleFile(file, storage, user, (progress) => {
            const fileProgress = (completedFiles + progress) / totalFiles;
            progressFill.style.width = `${fileProgress * 100}%`;
        });
        completedFiles++;
    }
}

function uploadSingleFile(file, storage, user, onProgress) {
    return new Promise((resolve, reject) => {
        // ファイルタイプを判定（テキストかバイナリか）
        const fileType = file.type || 'application/octet-stream';
        const isText = fileType.startsWith('text/');
        
        // ストレージパス: users/{userId}/{timestamp}_{filename}
        const timestamp = Date.now();
        const filePath = `users/${user.uid}/${timestamp}_${file.name}`;
        const storageRef = ref(storage, filePath);

        // メタデータ設定
        const metadata = {
            contentType: fileType,
            customMetadata: {
                uploadedBy: user.email,
                uploadedAt: new Date().toISOString(),
                isText: isText.toString()
            }
        };

        // アップロード開始
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                // 進捗状況
                const progress = snapshot.bytesTransferred / snapshot.totalBytes;
                onProgress(progress);
            },
            (error) => {
                // エラー処理
                console.error('Upload failed:', error);
                reject(error);
            },
            async () => {
                // 完了処理
                try {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    console.log('File uploaded successfully:', {
                        name: file.name,
                        path: filePath,
                        url: downloadURL,
                        type: fileType,
                        isText: isText
                    });
                    resolve(downloadURL);
                } catch (error) {
                    reject(error);
                }
            }
        );
    });
}

function displaySelectedFiles(files, container, listElement) {
    container.innerHTML = '';
    
    files.forEach(file => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        
        const fileName = document.createElement('span');
        fileName.className = 'file-name';
        fileName.textContent = file.name;
        
        const fileSize = document.createElement('span');
        fileSize.className = 'file-size';
        fileSize.textContent = formatFileSize(file.size);
        
        fileItem.appendChild(fileName);
        fileItem.appendChild(fileSize);
        container.appendChild(fileItem);
    });
    
    listElement.classList.remove('hidden');
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

function showMessage(text, type) {
    const message = document.getElementById('message');
    message.textContent = text;
    message.className = `message active ${type}`;
    
    setTimeout(() => {
        message.classList.remove('active');
    }, 5000);
}
