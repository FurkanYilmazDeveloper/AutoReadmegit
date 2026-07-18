import React from 'react';

function Header({ activeTab, setActiveTab, onClear, onDownload, onCopy, hasItems, onConnectGithub, onConnectLinkedIn, onUploadCv }) {
  return (
    <header className="app-header">
      <div className="logo-section">
        <div className="logo-icon">R</div>
        <span className="logo-text">ReadmeCraft</span>
        <span className="logo-badge">Pro</span>
      </div>

      <div className="canvas-tabs">
        <button 
          className={`tab-btn ${activeTab === 'visual' ? 'active' : ''}`}
          onClick={() => setActiveTab('visual')}
        >
          ✨ Tasarım Ekranı
        </button>
        <button 
          className={`tab-btn ${activeTab === 'markdown' ? 'active' : ''}`}
          onClick={() => setActiveTab('markdown')}
        >
          📝 Markdown Kodu
        </button>
        <button 
          className={`tab-btn ${activeTab === 'html' ? 'active' : ''}`}
          onClick={() => setActiveTab('html')}
        >
          🌐 HTML Çıktısı
        </button>
      </div>

      <div className="header-integrations" style={{ display: 'flex', gap: '8px', marginLeft: 'auto', marginRight: '16px' }}>
        <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px', background: '#238636', borderColor: '#2ea043', color: 'white' }} onClick={onConnectGithub}>
          🐙 GitHub
        </button>
        <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px', background: '#0077b5', borderColor: '#0077b5', color: 'white' }} onClick={onConnectLinkedIn}>
          in LinkedIn
        </button>
        <label className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px', cursor: 'pointer', margin: 0, background: 'rgba(99, 102, 241, 0.1)', borderColor: 'rgba(99, 102, 241, 0.4)', color: '#c9d1d9' }}>
          📄 CV
          <input 
            type="file" 
            accept=".pdf,.doc,.docx" 
            style={{ display: 'none' }} 
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                onUploadCv(file.name, 'https://example.com/mock-cv-download/' + encodeURIComponent(file.name));
              }
            }} 
          />
        </label>
      </div>

      <div className="header-actions">
        {hasItems && (
          <button className="btn btn-danger" onClick={onClear}>
            🧹 Temizle
          </button>
        )}
        <button 
          className="btn btn-secondary" 
          onClick={onCopy}
          disabled={!hasItems}
          style={{ opacity: hasItems ? 1 : 0.5, cursor: hasItems ? 'pointer' : 'not-allowed' }}
        >
          📋 Kopyala
        </button>
        <button 
          className="btn btn-primary" 
          onClick={onDownload}
          disabled={!hasItems}
          style={{ opacity: hasItems ? 1 : 0.5, cursor: hasItems ? 'pointer' : 'not-allowed' }}
        >
          📥 İndir (.md)
        </button>
      </div>
    </header>
  );
}

export default Header;
