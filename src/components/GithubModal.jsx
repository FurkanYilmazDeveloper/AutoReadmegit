import React, { useState } from 'react';

function GithubModal({ isOpen, onClose, onAuthorize }) {
  const [step, setStep] = useState(1); // 1: Login Form, 2: Auth Permissions
  const [username, setUsername] = useState('furkan.demir');
  const [password, setPassword] = useState('password123');
  const [isConnecting, setIsConnecting] = useState(false);

  if (!isOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      setStep(2);
    }, 1000);
  };

  const handleAuthorize = () => {
    setIsConnecting(true);
    setTimeout(() => {
      // Mock data to import back into the SaaS app
      const githubUserData = {
        name: 'Furkan Demir',
        title: 'Open Source Contributor & Developer',
        bio: 'Building things for the web. Love Open Source, React and modern web architectures.',
        company: '@saasify-labs',
        location: 'Istanbul',
        pronouns: 'He/Him',
        githubUrl: 'https://github.com/furkandemir',
        githubUsername: 'furkandemir',
        avatarUrl: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?auto=format&fit=crop&w=150&h=150&q=80',
      };
      
      onAuthorize(githubUserData);
      setIsConnecting(false);
      setStep(1); // Reset
      onClose();
    }, 1200);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ width: '450px', background: '#0d1117', border: '1px solid #30363d' }} onClick={(e) => e.stopPropagation()}>
        
        {/* Header styling specifically like GitHub branding */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid #21262d', paddingBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ background: '#ffffff', color: '#000', padding: '4px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', fontSize: '18px' }}>
              🐙
            </span>
            <span style={{ fontSize: '16px', fontWeight: '600', color: '#c9d1d9' }}>GitHub Yetkilendirme</span>
          </div>
          <button className="close-btn" onClick={onClose} style={{ color: '#8b949e' }}>×</button>
        </div>

        {step === 1 ? (
          <form onSubmit={handleLoginSubmit}>
            <p style={{ fontSize: '13.5px', color: '#8b949e', marginBottom: '20px' }}>
              ReadmeCraft'a yetki vererek GitHub profil verilerinizi (Kullanıcı Adı, Biyografi, İstatistikler) anında projenize çekin.
            </p>

            <div className="form-group">
              <label style={{ color: '#c9d1d9' }}>Kullanıcı Adı veya E-posta</label>
              <input 
                type="text" 
                className="form-input"
                style={{ background: '#010409', borderColor: '#30363d', color: '#c9d1d9' }}
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label style={{ color: '#c9d1d9' }}>Şifre</label>
              <input 
                type="password" 
                className="form-input"
                style={{ background: '#010409', borderColor: '#30363d', color: '#c9d1d9' }}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isConnecting}
              style={{ width: '100%', marginTop: '16px', background: '#238636', borderColor: '#2ea043', boxShadow: 'none', color: '#ffffff' }}
            >
              {isConnecting ? '⏳ Giriş Yapılıyor...' : 'Sign in'}
            </button>
          </form>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 'bold' }}>R</div>
              <span style={{ fontSize: '24px', color: '#8b949e' }}>⇄</span>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#ffffff', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>🐙</div>
            </div>
            
            <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#c9d1d9' }}>Authorize ReadmeCraft</h4>
            <p style={{ fontSize: '13px', color: '#8b949e', lineHeight: '1.5', background: '#010409', padding: '12px', borderRadius: '8px', border: '1px solid #30363d', textAlign: 'left', marginBottom: '24px' }}>
              ✔ Profil bilgileriniz (İsim, Bio, Kurum)<br />
              ✔ Açık istatistikleriniz ve Kullanıcı adınız<br />
              ✔ Diğer açık bağlantılarınız
            </p>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={() => setStep(1)}
                style={{ flex: 1, background: '#21262d', borderColor: '#30363d', color: '#c9d1d9' }}
              >
                Cancel
              </button>
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={handleAuthorize}
                disabled={isConnecting}
                style={{ flex: 1, background: '#238636', borderColor: '#2ea043', boxShadow: 'none', color: '#ffffff' }}
              >
                {isConnecting ? '⏳ Aktarılıyor...' : 'Authorize'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GithubModal;
