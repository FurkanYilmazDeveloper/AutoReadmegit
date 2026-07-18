import React, { useState } from 'react';
import { WIDGET_TYPES, PLATFORMS, TECH_LIST } from '../constants/widgets';

const THEME_PRESETS = [
  { id: 'obsidian', name: 'Obsidian Violet', color1: '#6366f1', color2: '#a855f7' },
  { id: 'synthwave', name: 'Synthwave Neon', color1: '#ec4899', color2: '#8b5cf6' },
  { id: 'ocean', name: 'Ocean Glass', color1: '#0ea5e9', color2: '#14b8a6' },
  { id: 'emerald', name: 'Emerald Aura', color1: '#10b981', color2: '#84cc16' },
];

function ConfigPanel({ selectedWidget, onUpdateWidget, globalTheme, onUpdateGlobalTheme, onConnectLinkedIn, onConnectGithub }) {
  const [techSearch, setTechSearch] = useState('');

  if (!selectedWidget) {
    return (
      <aside className="app-config-sidebar">
        <h3 className="config-section-title">Genel Tema Ayarları</h3>
        
        <div className="form-group" style={{ marginBottom: '20px' }}>
          <label style={{ marginBottom: '8px', display: 'block' }}>Tasarım Preseti</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {THEME_PRESETS.map((t) => {
              const isSelected = globalTheme.themeName === t.id;
              return (
                <button
                  key={t.id}
                  className={`theme-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => onUpdateGlobalTheme({ themeName: t.id })}
                  type="button"
                >
                  <div 
                    className="theme-card-preview" 
                    style={{ 
                      background: `linear-gradient(135deg, ${t.color1}, ${t.color2})`,
                      boxShadow: isSelected ? `0 0 12px ${t.color1}cc` : 'none'
                    }}
                  ></div>
                  <span>{t.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="form-group slider-group">
          <div className="slider-group-header">
            <span>Kart Köşe Yuvarlaklığı</span>
            <span>{globalTheme.radius}px</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="32" 
            className="slider-control"
            value={globalTheme.radius}
            onChange={(e) => onUpdateGlobalTheme({ radius: parseInt(e.target.value) })}
          />
        </div>

        <div className="form-group slider-group">
          <div className="slider-group-header">
            <span>Cam Bulanıklığı (Blur)</span>
            <span>{globalTheme.blur}px</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="24" 
            className="slider-control"
            value={globalTheme.blur}
            onChange={(e) => onUpdateGlobalTheme({ blur: parseInt(e.target.value) })}
          />
        </div>

        <div className="form-group slider-group">
          <div className="slider-group-header">
            <span>Neon Parlama Gücü</span>
            <span>{globalTheme.glow}px</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="30" 
            className="slider-control"
            value={globalTheme.glow}
            onChange={(e) => onUpdateGlobalTheme({ glow: parseInt(e.target.value) })}
          />
        </div>

        <div style={{ marginTop: '20px', padding: '16px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '13px' }}>
          <h4 style={{ margin: '0 0 6px 0', color: 'var(--text-secondary)' }}>⚙️ Bileşen Düzenleme</h4>
          <p style={{ margin: 0, color: 'var(--text-muted)' }}>Düzenleme yapmak istediğiniz bileşenin üzerine tıklayarak o bileşene özel ayarları burada görüntüleyebilirsiniz.</p>
        </div>
      </aside>
    );
  }

  const { type, data } = selectedWidget;

  const handleDataChange = (key, value) => {
    onUpdateWidget(selectedWidget.id, {
      ...data,
      [key]: value
    });
  };

  const handleCvFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleDataChange('cvFileName', file.name);
      handleDataChange('cvUrl', 'https://example.com/mock-cv-download/' + encodeURIComponent(file.name));
    }
  };

  const renderAlignmentControl = () => (
    <div className="form-group" style={{ marginBottom: '18px' }}>
      <label>Bileşen Hizalaması</label>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginTop: '4px' }}>
        <button 
          className={`btn ${data.align === 'left' ? 'btn-primary' : 'btn-secondary'}`} 
          onClick={() => handleDataChange('align', 'left')}
          style={{ padding: '6px 10px', fontSize: '12px' }}
        >
          ⬅️ Sola
        </button>
        <button 
          className={`btn ${data.align === 'center' ? 'btn-primary' : 'btn-secondary'}`} 
          onClick={() => handleDataChange('align', 'center')}
          style={{ padding: '6px 10px', fontSize: '12px' }}
        >
          ↕️ Ortala
        </button>
        <button 
          className={`btn ${data.align === 'right' ? 'btn-primary' : 'btn-secondary'}`} 
          onClick={() => handleDataChange('align', 'right')}
          style={{ padding: '6px 10px', fontSize: '12px' }}
        >
          ➡️ Sağa
        </button>
      </div>
    </div>
  );

  return (
    <aside className="app-config-sidebar">
      <h3 className="config-section-title">Bileşen Ayarları</h3>

      {renderAlignmentControl()}

      {type === WIDGET_TYPES.PROFILE_CARD && (
        <>
          {/* Bağlantılar (Sadece Çıkarma İşlemi İçin) */}
          {(data.githubUrl || data.linkedinUrl || data.cvUrl) && (
            <div style={{ border: '1px solid rgba(255, 255, 255, 0.1)', padding: '14px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.02)', marginBottom: '18px' }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '13px', color: '#c9d1d9' }}>Bağlı Hesaplar & Dosyalar</h4>
              
              {data.githubUrl && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>🐙 GitHub Bağlı</span>
                  <button className="btn btn-danger" onClick={() => handleDataChange('githubUrl', '')} style={{ padding: '4px 8px', fontSize: '10px' }}>Kaldır</button>
                </div>
              )}
              {data.linkedinUrl && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>in LinkedIn Bağlı</span>
                  <button className="btn btn-danger" onClick={() => handleDataChange('linkedinUrl', '')} style={{ padding: '4px 8px', fontSize: '10px' }}>Kaldır</button>
                </div>
              )}
              {data.cvUrl && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>📄 {data.cvFileName || 'Özgeçmiş'}</span>
                  <button className="btn btn-danger" onClick={() => { handleDataChange('cvUrl', ''); handleDataChange('cvFileName', ''); }} style={{ padding: '4px 8px', fontSize: '10px' }}>Kaldır</button>
                </div>
              )}
            </div>
          )}

          <div className="form-group">
            <label>Adınız Soyadınız</label>
            <input 
              type="text" 
              className="form-input" 
              value={data.name || ''} 
              onChange={(e) => handleDataChange('name', e.target.value)} 
            />
          </div>

          <div className="form-group">
            <label>Ünvanınız (Title)</label>
            <input 
              type="text" 
              className="form-input" 
              value={data.title || ''} 
              onChange={(e) => handleDataChange('title', e.target.value)} 
            />
          </div>

          <div className="form-group">
            <label>Biyografi (Bio)</label>
            <textarea 
              className="form-textarea" 
              value={data.bio || ''} 
              onChange={(e) => handleDataChange('bio', e.target.value)} 
            />
          </div>

          <div className="form-group">
            <label>Profil Resmi Linki (Avatar URL)</label>
            <input 
              type="text" 
              className="form-input" 
              value={data.avatarUrl || ''} 
              onChange={(e) => handleDataChange('avatarUrl', e.target.value)} 
            />
          </div>

          <div className="form-group">
            <label>Şirket / Kurum</label>
            <input 
              type="text" 
              className="form-input" 
              value={data.company || ''} 
              onChange={(e) => handleDataChange('company', e.target.value)} 
            />
          </div>

          <div className="form-group">
            <label>Konum</label>
            <input 
              type="text" 
              className="form-input" 
              value={data.location || ''} 
              onChange={(e) => handleDataChange('location', e.target.value)} 
            />
          </div>

          <div className="form-group">
            <label>Zamirler (Pronouns)</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g. He/Him, She/Her" 
              value={data.pronouns || ''} 
              onChange={(e) => handleDataChange('pronouns', e.target.value)} 
            />
          </div>
        </>
      )}

      {type === WIDGET_TYPES.SOCIAL_BADGES && (
        <>
          <div className="form-group">
            <label>Rozet Stili</label>
            <select 
              className="form-select" 
              value={data.style || 'flat'}
              onChange={(e) => handleDataChange('style', e.target.value)}
            >
              <option value="flat">Düz (Flat)</option>
              <option value="flat-square">Köşeli Düz</option>
              <option value="plastic">Kabartmalı (Plastic)</option>
              <option value="for-the-badge">Geniş (For the Badge)</option>
              <option value="social">Sosyal Sayaçlı</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
            <label style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-secondary)' }}>Kullanıcı Adlarınız</label>
            {PLATFORMS.map((platform) => {
              const activePlat = data.platforms.find((p) => p.id === platform.id);
              const usernameValue = activePlat ? activePlat.username : '';

              const handlePlatformUsernameChange = (val) => {
                let updatedPlatforms = [...data.platforms];
                const existIndex = updatedPlatforms.findIndex((p) => p.id === platform.id);

                if (val.trim() === '') {
                  if (existIndex > -1) {
                    updatedPlatforms.splice(existIndex, 1);
                  }
                } else {
                  if (existIndex > -1) {
                    updatedPlatforms[existIndex] = { ...updatedPlatforms[existIndex], username: val, color: platform.color };
                  } else {
                    updatedPlatforms.push({ id: platform.id, username: val, color: platform.color });
                  }
                }
                handleDataChange('platforms', updatedPlatforms);
              };

              return (
                <div key={platform.id} className="form-group" style={{ marginBottom: '8px' }}>
                  <label style={{ fontSize: '12px' }}>{platform.name}</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder={platform.baseUrl ? `Kullanıcı adı` : `URL / Link girin`}
                    value={usernameValue} 
                    onChange={(e) => handlePlatformUsernameChange(e.target.value)} 
                  />
                </div>
              );
            })}
          </div>
        </>
      )}

      {type === WIDGET_TYPES.TECH_STACK && (
        <>
          <div className="form-group">
            <label>Bileşen Başlığı</label>
            <input 
              type="text" 
              className="form-input" 
              value={data.title || ''} 
              onChange={(e) => handleDataChange('title', e.target.value)} 
            />
          </div>

          <div className="form-group">
            <label>Rozet Stili</label>
            <select 
              className="form-select" 
              value={data.style || 'flat-square'}
              onChange={(e) => handleDataChange('style', e.target.value)}
            >
              <option value="flat">Düz (Flat)</option>
              <option value="flat-square">Köşeli Düz</option>
              <option value="plastic">Kabartmalı (Plastic)</option>
              <option value="for-the-badge">Geniş (For the Badge)</option>
            </select>
          </div>

          <div className="form-group">
            <label>Teknoloji Arama</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="🔍 Hızlı arama... (e.g. React)" 
              value={techSearch}
              onChange={(e) => setTechSearch(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Teknolojiler</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxHeight: '300px', overflowY: 'auto', paddingRight: '8px', marginTop: '8px' }}>
              {['Frontend', 'Backend', 'DevOps & Databases', 'Tools & DevOps'].map((cat) => {
                const filteredTechs = TECH_LIST.filter(
                  (t) => t.category === cat && t.name.toLowerCase().includes(techSearch.toLowerCase())
                );
                
                if (filteredTechs.length === 0) return null;

                return (
                  <div key={cat}>
                    <h5 style={{ margin: '0 0 6px 0', fontSize: '12px', color: 'var(--primary-color)', textTransform: 'uppercase' }}>{cat}</h5>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      {filteredTechs.map((tech) => {
                        const isChecked = data.selectedTech.includes(tech.id);
                        
                        const handleCheckboxToggle = () => {
                          let updatedTech = [...data.selectedTech];
                          if (isChecked) {
                            updatedTech = updatedTech.filter((id) => id !== tech.id);
                          } else {
                            updatedTech.push(tech.id);
                          }
                          handleDataChange('selectedTech', updatedTech);
                        };

                        return (
                          <label key={tech.id} className="form-checkbox">
                            <input 
                              type="checkbox" 
                              checked={isChecked}
                              onChange={handleCheckboxToggle} 
                            />
                            {tech.name}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {type === WIDGET_TYPES.GITHUB_STATS && (
        <>
          <div className="form-group">
            <label>GitHub Kullanıcı Adınız</label>
            <input 
              type="text" 
              className="form-input" 
              value={data.username || ''} 
              onChange={(e) => handleDataChange('username', e.target.value)} 
            />
          </div>

          <div className="form-group">
            <label>Grafik Teması</label>
            <select 
              className="form-select" 
              value={data.theme || 'dark'}
              onChange={(e) => handleDataChange('theme', e.target.value)}
            >
              <option value="dark">Karanlık (Dark)</option>
              <option value="radical">Radical</option>
              <option value="synthwave">Synthwave</option>
              <option value="tokyonight">Tokyo Night</option>
              <option value="meridiandark">Meridian Dark</option>
              <option value="transparent">Şeffaf (Transparent)</option>
            </select>
          </div>

          <div className="form-group" style={{ marginTop: '12px' }}>
            <label className="form-checkbox">
              <input 
                type="checkbox" 
                checked={data.showPrivateCommits} 
                onChange={(e) => handleDataChange('showPrivateCommits', e.target.checked)} 
              />
              Özel Commit'leri (Private) Dahil Et
            </label>
          </div>

          <div className="form-group">
            <label className="form-checkbox">
              <input 
                type="checkbox" 
                checked={data.hideTitle} 
                onChange={(e) => handleDataChange('hideTitle', e.target.checked)} 
              />
              Başlığı Gizle
            </label>
          </div>

          <div className="form-group">
            <label className="form-checkbox">
              <input 
                type="checkbox" 
                checked={data.hideRank} 
                onChange={(e) => handleDataChange('hideRank', e.target.checked)} 
              />
              Derecemi (S, A, B) Gizle
            </label>
          </div>

          <div className="form-group">
            <label className="form-checkbox">
              <input 
                type="checkbox" 
                checked={data.showLanguages} 
                onChange={(e) => handleDataChange('showLanguages', e.target.checked)} 
              />
              En Çok Kullanılan Diller Kartını Göster
            </label>
          </div>

          <div className="form-group">
            <label className="form-checkbox">
              <input 
                type="checkbox" 
                checked={data.showStreak} 
                onChange={(e) => handleDataChange('showStreak', e.target.checked)} 
              />
              GitHub Streak Kartını Göster
            </label>
          </div>
        </>
      )}
    </aside>
  );
}

export default ConfigPanel;
