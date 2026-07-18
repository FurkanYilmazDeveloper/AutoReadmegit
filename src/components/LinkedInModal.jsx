import React, { useState } from 'react';

function LinkedInModal({ isOpen, onClose, onAuthorize }) {
  const [step, setStep] = useState(1); // 1: Login Form, 2: Auth Permissions
  const [email, setEmail] = useState('furkan.demir@example.com');
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
      const linkedinUserData = {
        name: 'Furkan Demir',
        title: 'Senior Software Engineer & SaaS Architect',
        bio: 'Bulut mimarisi ve yüksek performanslı modern web teknolojileri üzerinde uzmanlaşmış kıdemli yazılım mühendisi. SaaS startup modelleri geliştiriyorum.',
        company: 'Saasify Labs',
        location: 'İstanbul, Türkiye',
        pronouns: 'He/Him',
        linkedinUrl: 'https://linkedin.com/in/furkan-demir-saasify',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
      };
      
      onAuthorize(linkedinUserData);
      setIsConnecting(false);
      setStep(1); // Reset
      onClose();
    }, 1200);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ width: '450px', background: '#0e111a', border: '1px solid #0077b5' }} onClick={(e) => e.stopPropagation()}>
        
        {/* Header styling specifically like LinkedIn branding */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ background: '#0077b5', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold', fontSize: '18px', fontFamily: 'sans-serif' }}>in</span>
            <span style={{ fontSize: '16px', fontWeight: '600', color: '#fff' }}>LinkedIn Yetkilendirme</span>
          </div>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {step === 1 ? (
          <form onSubmit={handleLoginSubmit}>
            <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
              LinkedIn hesabınızdaki profil verilerini (Ad, Ünvan, Biyografi, Kurum) <b>ReadmeCraft</b> editörüne aktarmak için giriş yapın.
            </p>

            <div className="form-group">
              <label>E-posta Adresi</label>
              <input 
                type="email" 
                className="form-input"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Şifre</label>
              <input 
                type="password" 
                className="form-input"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isConnecting}
              style={{ width: '100%', marginTop: '16px', background: '#0077b5', boxShadow: 'none' }}
            >
              {isConnecting ? '⏳ Giriş Yapılıyor...' : 'Giriş Yap'}
            </button>
          </form>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '8px', background: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 'bold' }}>R</div>
              <span style={{ fontSize: '24px', color: 'var(--text-muted)' }}>⇄</span>
              <div style={{ width: '50px', height: '50px', borderRadius: '8px', background: '#0077b5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 'bold' }}>in</div>
            </div>
            
            <h4 style={{ margin: '0 0 12px 0', fontSize: '15px' }}>İzin İstenecek Alanlar</h4>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5', background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', textAlign: 'left', marginBottom: '24px' }}>
              ✔ Adınız ve Soyadınız<br />
              ✔ Profil Ünvanınız & Çalıştığınız Şirket<br />
              ✔ Biyografi & Konum Bilgileriniz
            </p>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={() => setStep(1)}
                style={{ flex: 1 }}
              >
                İptal Et
              </button>
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={handleAuthorize}
                disabled={isConnecting}
                style={{ flex: 1, background: '#0077b5', boxShadow: 'none' }}
              >
                {isConnecting ? '⏳ Aktarılıyor...' : 'İzin Ver & Aktar'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LinkedInModal;
