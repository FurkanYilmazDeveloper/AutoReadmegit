import React from 'react';
import { WIDGET_TYPES } from '../constants/widgets';

function Canvas({ 
  widgets, 
  selectedWidgetId, 
  onSelectWidget, 
  onUpdateWidget,
  onDeleteWidget, 
  onDuplicateWidget,
  onMoveWidget, 
  onOpenAiModal 
}) {
  if (widgets.length === 0) {
    return (
      <div className="app-canvas">
        <div className="canvas-empty">
          <div className="empty-icon">✨</div>
          <h3>Profiliniz Boş Görünüyor</h3>
          <p>Sol taraftaki menüden bileşenler ekleyerek GitHub README veya portföy sayfanızı tasarlamaya başlayın.</p>
        </div>
      </div>
    );
  }

  const getAlignValue = (align) => {
    if (align === 'center') return 'center';
    if (align === 'right') return 'flex-end';
    return 'flex-start';
  };

  return (
    <div className="app-canvas">
      {widgets.map((widget, index) => {
        const isSelected = selectedWidgetId === widget.id;
        const align = widget.data.align || 'center';
        
        let profileFlexDirection = 'row';
        let profileTextAlign = 'left';
        if (align === 'center') {
          profileFlexDirection = 'column';
          profileTextAlign = 'center';
        } else if (align === 'right') {
          profileFlexDirection = 'row-reverse';
          profileTextAlign = 'right';
        }

        const handleInlineChange = (key, value) => {
          onUpdateWidget(widget.id, {
            ...widget.data,
            [key]: value
          });
        };

        return (
          <div 
            key={widget.id} 
            className={`canvas-widget-card ${isSelected ? 'selected' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              onSelectWidget(widget.id);
            }}
          >
            {/* Action controls overlay */}
            <div className="widget-controls" onClick={(e) => e.stopPropagation()}>
              <button 
                className="control-btn" 
                title="Yukarı Taşı"
                onClick={() => onMoveWidget(index, 'up')}
                disabled={index === 0}
                style={{ opacity: index === 0 ? 0.3 : 1 }}
              >
                ▲
              </button>
              <button 
                className="control-btn" 
                title="Aşağı Taşı"
                onClick={() => onMoveWidget(index, 'down')}
                disabled={index === widgets.length - 1}
                style={{ opacity: index === widgets.length - 1 ? 0.3 : 1 }}
              >
                ▼
              </button>
              <button 
                className="control-btn" 
                title="Çoğalt (Duplicate)"
                onClick={() => onDuplicateWidget(widget.id)}
              >
                📋
              </button>
              {widget.type === WIDGET_TYPES.PROFILE_CARD && (
                <button 
                  className="control-btn" 
                  title="AI Biyografi Sihirbazı"
                  onClick={() => onOpenAiModal(widget.id)}
                  style={{ background: 'rgba(168, 85, 247, 0.2)', color: '#d8b4fe' }}
                >
                  🤖
                </button>
              )}
              <button 
                className="control-btn btn-del" 
                title="Sil"
                onClick={() => onDeleteWidget(widget.id)}
              >
                🗑️
              </button>
            </div>

            {/* Widget rendering */}
            {widget.type === WIDGET_TYPES.PROFILE_CARD && (
              <div 
                className="profile-widget" 
                style={{ 
                  flexDirection: profileFlexDirection, 
                  textAlign: profileTextAlign,
                  gap: '24px'
                }}
              >
                <div className="profile-avatar-container" style={{ margin: align === 'center' ? '0 auto' : '' }}>
                  {isSelected ? (
                    <div style={{ position: 'relative' }}>
                      <img 
                        src={widget.data.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80'} 
                        alt="Avatar" 
                        className="profile-avatar" 
                      />
                      <input 
                        type="text" 
                        placeholder="Avatar Resmi URL" 
                        value={widget.data.avatarUrl || ''} 
                        onChange={(e) => handleInlineChange('avatarUrl', e.target.value)}
                        className="inline-avatar-input"
                        title="Resim linkini değiştirmek için yazın"
                      />
                    </div>
                  ) : (
                    <img 
                      src={widget.data.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80'} 
                      alt="Avatar" 
                      className="profile-avatar" 
                    />
                  )}
                </div>
                
                <div className="profile-info" style={{ width: '100%' }}>
                  <div className="profile-name-row" style={{ justifyContent: profileTextAlign }}>
                    {isSelected ? (
                      <input 
                        type="text" 
                        value={widget.data.name || ''} 
                        onChange={(e) => handleInlineChange('name', e.target.value)}
                        className="inline-edit-input inline-name"
                        placeholder="İsminiz"
                        style={{ textAlign: profileTextAlign }}
                      />
                    ) : (
                      <h3 className="profile-name">{widget.data.name || 'İsim Belirtilmedi'}</h3>
                    )}
                    {isSelected ? (
                      <input 
                        type="text" 
                        value={widget.data.pronouns || ''} 
                        onChange={(e) => handleInlineChange('pronouns', e.target.value)}
                        className="inline-edit-input inline-pronouns"
                        placeholder="Zamirler (örn. He/Him)"
                      />
                    ) : (
                      widget.data.pronouns && <span className="profile-pronouns">{widget.data.pronouns}</span>
                    )}
                  </div>
                  
                  {isSelected ? (
                    <input 
                      type="text" 
                      value={widget.data.title || ''} 
                      onChange={(e) => handleInlineChange('title', e.target.value)}
                      className="inline-edit-input inline-title"
                      placeholder="Ünvanınız"
                      style={{ textAlign: profileTextAlign }}
                    />
                  ) : (
                    <h4 className="profile-title">{widget.data.title || 'Ünvan Belirtilmedi'}</h4>
                  )}
                  
                  <div className="profile-meta" style={{ justifyContent: profileTextAlign }}>
                    {isSelected ? (
                      <div style={{ display: 'flex', gap: '8px', width: '100%', justifyContent: profileTextAlign }}>
                        <span>🏢</span>
                        <input 
                          type="text" 
                          value={widget.data.company || ''} 
                          onChange={(e) => handleInlineChange('company', e.target.value)}
                          className="inline-edit-input inline-meta-field"
                          placeholder="Şirket"
                        />
                        <span>📍</span>
                        <input 
                          type="text" 
                          value={widget.data.location || ''} 
                          onChange={(e) => handleInlineChange('location', e.target.value)}
                          className="inline-edit-input inline-meta-field"
                          placeholder="Konum"
                        />
                      </div>
                    ) : (
                      <>
                        {widget.data.company && <span>🏢 {widget.data.company}</span>}
                        {widget.data.location && <span>📍 {widget.data.location}</span>}
                      </>
                    )}
                  </div>

                  {isSelected ? (
                    <textarea 
                      value={widget.data.bio || ''} 
                      onChange={(e) => handleInlineChange('bio', e.target.value)}
                      className="inline-edit-textarea inline-bio"
                      placeholder="Biyografinizi buraya yazın..."
                      style={{ textAlign: profileTextAlign }}
                    />
                  ) : (
                    <p className="profile-bio" style={{ textJustify: 'inter-word' }}>{widget.data.bio || 'Henüz biyografi yazılmadı...'}</p>
                  )}

                  {/* Render CV, LinkedIn, and GitHub Buttons */}
                  {(widget.data.cvFileName || widget.data.linkedinUrl || widget.data.githubUrl) && (
                    <div style={{ display: 'flex', gap: '10px', marginTop: '14px', flexWrap: 'wrap', justifyContent: getAlignValue(align) }} onClick={(e) => e.stopPropagation()}>
                      {widget.data.cvFileName && (
                        <a 
                          href={widget.data.cvUrl || '#'} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="btn btn-secondary" 
                          style={{ padding: '6px 12px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}
                          onClick={(e) => {
                            e.preventDefault();
                            alert(`Simüle Edilen İndirme: ${widget.data.cvFileName}\nCV Linki: ${widget.data.cvUrl}`);
                          }}
                        >
                          📄 CV İndir
                        </a>
                      )}
                      {widget.data.linkedinUrl && (
                        <a 
                          href={widget.data.linkedinUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="btn btn-primary" 
                          style={{ padding: '6px 12px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', background: '#0077b5', borderColor: '#0077b5', boxShadow: 'none' }}
                        >
                          🔗 LinkedIn Profilim
                        </a>
                      )}
                      {widget.data.githubUrl && (
                        <a 
                          href={widget.data.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="btn btn-primary" 
                          style={{ padding: '6px 12px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', background: '#238636', borderColor: '#2ea043', boxShadow: 'none' }}
                        >
                          🐙 GitHub Profilim
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {widget.type === WIDGET_TYPES.SOCIAL_BADGES && (
              <div style={{ textAlign: align }}>
                <h4 className="tech-widget-title" style={{ fontSize: '12px', marginBottom: '8px' }}>Sosyal Bağlantılar</h4>
                <div className="badges-widget" style={{ justifyContent: getAlignValue(align) }}>
                  {widget.data.platforms && widget.data.platforms.length > 0 ? (
                    widget.data.platforms.map((p) => {
                      const platformColor = p.color || 'blue';
                      return (
                        <span key={p.id} className="badge-item">
                          <img 
                            src={`https://img.shields.io/badge/${p.id.toUpperCase()}-${p.username}-${platformColor.replace('#', '')}?style=${widget.data.style || 'flat'}&logo=${p.id}&logoColor=white`} 
                            alt={p.id} 
                          />
                        </span>
                      );
                    })
                  ) : (
                    <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Sosyal platform kullanıcı adı girilmedi.</span>
                  )}
                </div>
                {isSelected && (
                  <div style={{ marginTop: '12px', fontSize: '11px', color: 'var(--primary-color)' }}>
                    ℹ️ Düzenleme yapmak için sağdaki paneli kullanabilirsiniz.
                  </div>
                )}
              </div>
            )}

            {widget.type === WIDGET_TYPES.TECH_STACK && (
              <div style={{ textAlign: align }}>
                {isSelected ? (
                  <input 
                    type="text" 
                    value={widget.data.title || ''} 
                    onChange={(e) => handleInlineChange('title', e.target.value)}
                    className="inline-edit-input inline-tech-title"
                    placeholder="Bileşen Başlığı"
                    style={{ textAlign: align }}
                  />
                ) : (
                  <h4 className="tech-widget-title">{widget.data.title || 'Teknoloji Yığınım'}</h4>
                )}
                <div className="tech-badges-grid" style={{ justifyContent: getAlignValue(align) }}>
                  {widget.data.selectedTech && widget.data.selectedTech.length > 0 ? (
                    widget.data.selectedTech.map((techId) => (
                      <span key={techId} className="badge-item">
                        <img 
                          src={`https://img.shields.io/badge/${techId.toUpperCase()}-333?style=${widget.data.style || 'flat-square'}&logo=${techId}&logoColor=white`}
                          alt={techId} 
                          onError={(e) => {
                            e.target.src = `https://img.shields.io/badge/${techId.toUpperCase()}-informational?style=flat`;
                          }}
                        />
                      </span>
                    ))
                  ) : (
                    <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Teknoloji seçilmedi.</span>
                  )}
                </div>
              </div>
            )}

            {widget.type === WIDGET_TYPES.GITHUB_STATS && (
              <div style={{ textAlign: align }}>
                {isSelected ? (
                  <div style={{ marginBottom: '12px', display: 'flex', gap: '8px', justifyContent: getAlignValue(align) }}>
                    <span style={{ fontSize: '13px', alignSelf: 'center' }}>GitHub Kullanıcı Adı:</span>
                    <input 
                      type="text" 
                      value={widget.data.username || ''} 
                      onChange={(e) => handleInlineChange('username', e.target.value)}
                      className="inline-edit-input inline-github-username"
                      placeholder="kullanici-adi"
                    />
                  </div>
                ) : (
                  <h4 className="tech-widget-title" style={{ fontSize: '12px', marginBottom: '8px' }}>GitHub Geliştirici Kartları</h4>
                )}
                
                {widget.data.username ? (
                  <div 
                    style={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: '16px', 
                      alignItems: getAlignValue(align),
                      width: '100%' 
                    }}
                  >
                    <img 
                      src={`https://github-readme-stats.vercel.app/api?username=${widget.data.username}&show_icons=true&theme=${widget.data.theme || 'dark'}&count_private=${widget.data.showPrivateCommits}&hide_title=${widget.data.hideTitle}&hide_rank=${widget.data.hideRank}`} 
                      alt="GitHub Stats" 
                      style={{ maxWidth: '400px', width: '100%', height: 'auto', borderRadius: '8px', border: '1px solid var(--border-color)' }}
                    />
                    
                    {widget.data.showLanguages && (
                      <img 
                        src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${widget.data.username}&layout=compact&theme=${widget.data.theme || 'dark'}&hide_title=${widget.data.hideTitle}`} 
                        alt="GitHub Top Languages" 
                        style={{ maxWidth: '400px', width: '100%', height: 'auto', borderRadius: '8px', border: '1px solid var(--border-color)' }}
                      />
                    )}

                    {widget.data.showStreak && (
                      <img 
                        src={`https://github-readme-streak-stats.herokuapp.com/?user=${widget.data.username}&theme=${widget.data.theme || 'dark'}`} 
                        alt="GitHub Streak" 
                        style={{ maxWidth: '400px', width: '100%', height: 'auto', borderRadius: '8px', border: '1px solid var(--border-color)' }}
                      />
                    )}
                  </div>
                ) : (
                  <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Lütfen sağdaki panelden veya inline düzenleme alanından GitHub kullanıcı adınızı girin.</span>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Canvas;
