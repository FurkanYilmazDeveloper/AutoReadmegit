import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import ConfigPanel from './components/ConfigPanel';
import Preview, { generateMarkdown } from './components/Preview';
import AiModal from './components/AiModal';
import LinkedInModal from './components/LinkedInModal';
import GithubModal from './components/GithubModal';
import useCanvasState from './hooks/useCanvasState';

function App() {
  // Use our custom hook for canvas layout state management
  const {
    widgets,
    selectedWidgetId,
    setSelectedWidgetId,
    addWidget,
    updateWidget,
    deleteWidget,
    duplicateWidget,
    moveWidget,
    clearCanvas,
    loadTemplate,
  } = useCanvasState();

  // App Level UI States
  const [activeTab, setActiveTab] = useState('visual');
  const [globalTheme, setGlobalTheme] = useState({
    themeName: 'obsidian',
    radius: 16,
    blur: 16,
    glow: 15
  });
  
  // Toast Notification State
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Custom Confirmation Dialog State
  const [confirmDialog, setConfirmDialog] = useState({ show: false, message: '', onConfirm: null });

  // AI Modal States
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiTargetWidgetId, setAiTargetWidgetId] = useState(null);

  // LinkedIn Integration States
  const [showLinkedInModal, setShowLinkedInModal] = useState(false);
  const [linkedInTargetWidgetId, setLinkedInTargetWidgetId] = useState(null);

  // GitHub Integration States
  const [showGithubModal, setShowGithubModal] = useState(false);
  const [githubTargetWidgetId, setGithubTargetWidgetId] = useState(null);

  // Apply CSS custom properties dynamically depending on global theme
  useEffect(() => {
    const root = document.documentElement;
    
    // Update theme presets
    const presets = {
      obsidian: {
        bg: '#07080f',
        primary: '#6366f1',
        primaryGlow: 'rgba(99, 102, 241, 0.35)',
        secondary: '#a855f7',
        secondaryGlow: 'rgba(168, 85, 247, 0.35)',
      },
      synthwave: {
        bg: '#120c1f',
        primary: '#ec4899',
        primaryGlow: 'rgba(236, 72, 153, 0.35)',
        secondary: '#8b5cf6',
        secondaryGlow: 'rgba(139, 92, 246, 0.35)',
      },
      ocean: {
        bg: '#04101e',
        primary: '#0ea5e9',
        primaryGlow: 'rgba(14, 165, 233, 0.35)',
        secondary: '#14b8a6',
        secondaryGlow: 'rgba(20, 184, 166, 0.35)',
      },
      emerald: {
        bg: '#030f0a',
        primary: '#10b981',
        primaryGlow: 'rgba(16, 185, 129, 0.35)',
        secondary: '#84cc16',
        secondaryGlow: 'rgba(132, 204, 22, 0.35)',
      }
    };

    const currentPreset = presets[globalTheme.themeName] || presets.obsidian;

    root.style.setProperty('--bg-color', currentPreset.bg);
    root.style.setProperty('--primary-color', currentPreset.primary);
    root.style.setProperty('--primary-glow', currentPreset.primaryGlow);
    root.style.setProperty('--secondary-color', currentPreset.secondary);
    root.style.setProperty('--secondary-glow', currentPreset.secondaryGlow);

    // Style adjustments
    root.style.setProperty('--card-radius', `${globalTheme.radius}px`);
    root.style.setProperty('--card-blur', `${globalTheme.blur}px`);
    root.style.setProperty('--glow-intensity', `${globalTheme.glow}px`);
  }, [globalTheme]);

  // Toast Notification Auto-hide effect
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast(prev => ({ ...prev, show: false }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  // Export handlers
  const handleClear = () => {
    setConfirmDialog({
      show: true,
      message: 'Tüm bileşenleri temizlemek istediğinize emin misiniz? Bu işlem geri alınamaz.',
      onConfirm: () => {
        clearCanvas();
        showToast('Tuval başarıyla temizlendi.', 'success');
      }
    });
  };

  const handleLoadTemplate = (templateWidgets) => {
    setConfirmDialog({
      show: true,
      message: 'Hazır şablon yüklendiğinde mevcut tasarımınız silinecektir. Devam etmek istiyor musunuz?',
      onConfirm: () => {
        loadTemplate(templateWidgets);
        showToast('Şablon başarıyla yüklendi.', 'success');
      }
    });
  };

  const handleCopy = () => {
    const markdown = generateMarkdown(widgets);
    navigator.clipboard.writeText(markdown).then(() => {
      showToast('Kod panoya kopyalandı! 📋', 'success');
    }).catch(err => {
      showToast('Kopyalama başarısız oldu.', 'error');
    });
  };

  const handleDownload = () => {
    try {
      const markdown = generateMarkdown(widgets);
      const element = document.createElement('a');
      const file = new Blob([markdown], { type: 'text/markdown' });
      element.href = URL.createObjectURL(file);
      element.download = 'README.md';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      showToast('README.md dosyası indirildi! 📥', 'success');
    } catch (e) {
      showToast('Dosya indirme başarısız oldu.', 'error');
    }
  };

  const handleUpdateGlobalTheme = (newSettings) => {
    setGlobalTheme(prev => ({
      ...prev,
      ...newSettings
    }));
  };

  const handleOpenAiModal = (widgetId) => {
    setAiTargetWidgetId(widgetId);
    setShowAiModal(true);
  };

  const handleApplyAiBio = (text) => {
    if (aiTargetWidgetId) {
      const targetWidget = widgets.find(w => w.id === aiTargetWidgetId);
      if (targetWidget) {
        updateWidget(aiTargetWidgetId, {
          ...targetWidget.data,
          bio: text
        });
        showToast('AI Biyografisi profil kartına eklendi.', 'success');
      }
    }
  };

  // LinkedIn Actions
  const handleOpenLinkedInModal = () => {
    const profileCard = widgets.find(w => w.type === 'profile-card');
    if (profileCard) {
      setLinkedInTargetWidgetId(profileCard.id);
      setShowLinkedInModal(true);
    } else {
      showToast('Hata: Önce tuvale bir Profil Kartı eklemelisiniz!', 'error');
    }
  };

  const handleLinkedInAuthorize = (profileData) => {
    if (linkedInTargetWidgetId) {
      const targetWidget = widgets.find(w => w.id === linkedInTargetWidgetId);
      if (targetWidget) {
        updateWidget(linkedInTargetWidgetId, {
          ...targetWidget.data,
          name: profileData.name,
          title: profileData.title,
          bio: profileData.bio,
          company: profileData.company,
          location: profileData.location,
          pronouns: profileData.pronouns,
          linkedinUrl: profileData.linkedinUrl,
          avatarUrl: profileData.avatarUrl,
        });
        showToast('LinkedIn verileri başarıyla aktarıldı! 🚀', 'success');
      }
    }
  };

  // GitHub Actions
  const handleOpenGithubModal = () => {
    const profileCard = widgets.find(w => w.type === 'profile-card');
    if (profileCard) {
      setGithubTargetWidgetId(profileCard.id);
      setShowGithubModal(true);
    } else {
      showToast('Hata: Önce tuvale bir Profil Kartı eklemelisiniz!', 'error');
    }
  };

  const handleGithubAuthorize = (profileData) => {
    if (githubTargetWidgetId) {
      const targetWidget = widgets.find(w => w.id === githubTargetWidgetId);
      if (targetWidget) {
        updateWidget(githubTargetWidgetId, {
          ...targetWidget.data,
          name: profileData.name,
          title: profileData.title,
          bio: profileData.bio,
          company: profileData.company,
          location: profileData.location,
          pronouns: profileData.pronouns,
          githubUrl: profileData.githubUrl,
          avatarUrl: profileData.avatarUrl,
        });

        // "Sihirli" Entegrasyon: GITHUB_STATS bileşenini de güncelle
        widgets.forEach(w => {
          if (w.type === 'github-stats') {
            updateWidget(w.id, {
              ...w.data,
              username: profileData.githubUsername
            });
          }
        });

        // "Sihirli" Entegrasyon: SOCIAL_BADGES bileşenini de güncelle
        widgets.forEach(w => {
          if (w.type === 'social-badges') {
            const currentPlatforms = w.data.platforms || [];
            if (!currentPlatforms.find(p => p.id === 'github')) {
               updateWidget(w.id, {
                 ...w.data,
                 platforms: [...currentPlatforms, { id: 'github', username: profileData.githubUsername }]
               });
            } else {
               const newPlatforms = currentPlatforms.map(p => p.id === 'github' ? { ...p, username: profileData.githubUsername } : p);
               updateWidget(w.id, {
                 ...w.data,
                 platforms: newPlatforms
               });
            }
          }
        });

        showToast('GitHub verileri başarıyla çekildi! 🐙', 'success');
      }
    }
  };

  const handleUploadCv = (fileName, cvUrl) => {
    const profileCard = widgets.find(w => w.type === 'profile-card');
    if (profileCard) {
      updateWidget(profileCard.id, {
        ...profileCard.data,
        cvFileName: fileName,
        cvUrl: cvUrl
      });
      showToast('CV dosyası başarıyla yüklendi! 📄', 'success');
    } else {
      showToast('Hata: Önce tuvale bir Profil Kartı eklemelisiniz!', 'error');
    }
  };

  const selectedWidget = widgets.find(w => w.id === selectedWidgetId);

  return (
    <div className="app-container">
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        onClear={handleClear}
        onDownload={handleDownload}
        onCopy={handleCopy}
        hasItems={widgets.length > 0}
        onConnectGithub={handleOpenGithubModal}
        onConnectLinkedIn={handleOpenLinkedInModal}
        onUploadCv={handleUploadCv}
      />

      <div className="app-body">
        <Sidebar onAddWidget={addWidget} onLoadTemplate={handleLoadTemplate} />
        
        <div className="app-canvas-container" onClick={() => setSelectedWidgetId(null)}>
          <div className="canvas-header">
            <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-secondary)' }}>
              {activeTab === 'visual' ? '🎨 Tasarım Alanı' : '💻 Kod Önizleme'}
            </span>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              {widgets.length} Bileşen Ekli
            </span>
          </div>

          {activeTab === 'visual' ? (
            <Canvas 
              widgets={widgets}
              selectedWidgetId={selectedWidgetId}
              onSelectWidget={setSelectedWidgetId}
              onUpdateWidget={updateWidget}
              onDeleteWidget={deleteWidget}
              onDuplicateWidget={duplicateWidget}
              onMoveWidget={moveWidget}
              onOpenAiModal={handleOpenAiModal}
            />
          ) : (
            <Preview widgets={widgets} type={activeTab} />
          )}
        </div>

          <ConfigPanel 
            selectedWidget={selectedWidget} 
            onUpdateWidget={updateWidget} 
            globalTheme={globalTheme}
            onUpdateGlobalTheme={setGlobalTheme}
          />
      </div>

      <AiModal 
        isOpen={showAiModal}
        onClose={() => setShowAiModal(false)}
        onApply={handleApplyAiBio}
      />

      <LinkedInModal 
        isOpen={showLinkedInModal}
        onClose={() => setShowLinkedInModal(false)}
        onAuthorize={handleLinkedInAuthorize}
      />

      <GithubModal
        isOpen={showGithubModal}
        onClose={() => setShowGithubModal(false)}
        onAuthorize={handleGithubAuthorize}
      />

      {/* Floating Toast Notification Wrapper */}
      {toast.show && (
        <div className="toast-container">
          <div className={`toast-notification ${toast.type}`}>
            <span className="toast-icon">{toast.type === 'success' ? '✓' : '✗'}</span>
            <span className="toast-message">{toast.message}</span>
          </div>
        </div>
      )}

      {/* Custom Confirmation Modal */}
      {confirmDialog.show && (
        <div className="modal-overlay" onClick={() => setConfirmDialog({ show: false })}>
          <div className="modal-content" style={{ width: '400px', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ margin: '0 0 12px 0' }}>⚠️ Emin misiniz?</h3>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: '1.5' }}>
              {confirmDialog.message}
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button 
                className="btn btn-secondary" 
                onClick={() => setConfirmDialog({ show: false })}
              >
                Vazgeç
              </button>
              <button 
                className="btn btn-primary" 
                id="btn-confirm-yes"
                onClick={() => {
                  confirmDialog.onConfirm();
                  setConfirmDialog({ show: false });
                }}
              >
                Evet, Onayla
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
