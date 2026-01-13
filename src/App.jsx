import React from 'react';
import { AuthSection } from './components/AuthSection';
import { UploadSection } from './components/UploadSection';
import { useAuth } from './hooks/useAuth';
import { useAuth as useMessage } from './hooks/useMessage';
import './App.css';

function App() {
  const { user, loading, login, logout } = useAuth();
  const { message, showMessage } = useMessage();

  return (
    <div className="container">
      <h1>📁 File Upload</h1>

      <AuthSection user={user} onLogin={login} onLogout={logout} loading={loading} />

      <UploadSection user={user} onMessage={showMessage} />

      {message.text && (
        <div className={`message active ${message.type}`}>{message.text}</div>
      )}
    </div>
  );
}

export default App;
