import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

export function setupAuth(auth) {
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const provider = new GoogleAuthProvider();

    // ログインボタン
    loginBtn.addEventListener('click', async () => {
        try {
            loginBtn.disabled = true;
            loginBtn.textContent = 'ログイン中...';
            
            await signInWithPopup(auth, provider);
            showMessage('ログインに成功しました', 'success');
        } catch (error) {
            console.error('Login error:', error);
            showMessage(`ログインエラー: ${error.message}`, 'error');
        } finally {
            loginBtn.disabled = false;
            loginBtn.textContent = 'Googleでログイン';
        }
    });

    // ログアウトボタン
    logoutBtn.addEventListener('click', async () => {
        try {
            await signOut(auth);
            showMessage('ログアウトしました', 'success');
        } catch (error) {
            console.error('Logout error:', error);
            showMessage(`ログアウトエラー: ${error.message}`, 'error');
        }
    });
}

function showMessage(text, type) {
    const message = document.getElementById('message');
    message.textContent = text;
    message.className = `message active ${type}`;
    
    setTimeout(() => {
        message.classList.remove('active');
    }, 5000);
}
