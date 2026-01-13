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
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="auth-section">
      {user ? (
        <div className="user-info">
          <span>{user.email}</span>
          <button onClick={onLogout}>Logout</button>
        </div>
      ) : (
        <div id="loginSection">
          <button onClick={handleLogin} disabled={isLoggingIn}>
            {isLoggingIn ? 'Logging in...' : 'Login with Google'}
          </button>
        </div>
      )}
    </div>
  );
};
