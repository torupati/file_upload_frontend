import React from 'react';

export const AuthSection = ({ user, onLogin, onLogout, loading }) => {
  const [isLoggingIn, setIsLoggingIn] = React.useState(false);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      await onLogin();
    } finally {
      setIsLoggingIn(false);
    }
  };

  if (loading) {
    return (
      <div className="auth-section">
        <p>読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="auth-section">
      {user ? (
        <div className="user-info">
          <span>{user.email}</span>
          <button onClick={onLogout}>ログアウト</button>
        </div>
      ) : (
        <div id="loginSection">
          <button onClick={handleLogin} disabled={isLoggingIn}>
            {isLoggingIn ? 'ログイン中...' : 'Googleでログイン'}
          </button>
        </div>
      )}
    </div>
  );
};
