import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // 간단한 하드코딩 인증 (실제 서비스 시 Firebase Auth 또는 서버 연동 필요)
    if (username === 'admin' && password === '1234') {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin');
    } else {
      alert('ID 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '360px', margin: '100px auto' }}>
      <h2>🔐 관리자 로그인</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>아이디: </label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div style={{ marginTop: '0.5rem' }}>
          <label>비밀번호: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" style={{ marginTop: '1rem' }}>로그인</button>
      </form>
    </div>
  );
}
