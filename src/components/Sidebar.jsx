import React, { useState } from 'react';
import { WIDGET_TYPES } from '../constants/widgets';

const CATALOG_ITEMS = [
  {
    type: WIDGET_TYPES.PROFILE_CARD,
    title: 'Profil Kartı',
    desc: 'Avatar, İsim, Ünvan, Konum ve Biyografi bilgileri.',
    icon: '👤',
  },
  {
    type: WIDGET_TYPES.SOCIAL_BADGES,
    title: 'Sosyal Rozetler',
    desc: 'GitHub, LinkedIn, X, YouTube gibi platform linkleri.',
    icon: '🔗',
  },
  {
    type: WIDGET_TYPES.TECH_STACK,
    title: 'Teknoloji Yığını',
    desc: 'Kullandığınız diller ve teknolojilerin rozet listesi.',
    icon: '💻',
  },
  {
    type: WIDGET_TYPES.GITHUB_STATS,
    title: 'GitHub İstatistikleri',
    desc: 'Commits, PRs, Issues özet grafiği ve sıralaması.',
    icon: '📊',
  },
];

const TEMPLATES = [
  {
    id: 'minimal',
    title: 'Minimalist Profil',
    desc: 'Biyografi ve sosyal medya rozetlerinden oluşan sade düzen.',
    icon: '💡',
    widgets: [
      { 
        type: WIDGET_TYPES.PROFILE_CARD, 
        data: { name: 'Ahmet Dev', title: 'Senior Developer', bio: 'Sade ve performans odaklı web çözümleri üretiyorum.', location: 'İzmir', company: 'Freelance', pronouns: 'He/Him', align: 'center', avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&h=150&q=80' } 
      },
      { 
        type: WIDGET_TYPES.SOCIAL_BADGES, 
        data: { style: 'flat', align: 'center', platforms: [{ id: 'github', username: 'ahmetdev', color: '#181717' }, { id: 'linkedin', username: 'ahmetdev', color: '#0A66C2' }] } 
      }
    ]
  },
  {
    id: 'fullstack',
    title: 'Full Stack Showcase',
    desc: 'Profil, yetenekler ve tüm GitHub analiz grafikleri.',
    icon: '🔥',
    widgets: [
      { 
        type: WIDGET_TYPES.PROFILE_CARD, 
        data: { name: 'Zeynep Kaya', title: 'Full Stack Architect', bio: 'Büyük ölçekli web uygulamaları tasarlayan bir yazılımcıyım.', location: 'Ankara', company: 'SaaS Corp', pronouns: 'She/Her', align: 'left', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80' } 
      },
      { 
        type: WIDGET_TYPES.SOCIAL_BADGES, 
        data: { style: 'flat-square', align: 'left', platforms: [{ id: 'github', username: 'zeynep-kaya', color: '#181717' }, { id: 'linkedin', username: 'zeynep-kaya', color: '#0A66C2' }, { id: 'twitter', username: 'zeynep_dev', color: '#1DA1F2' }] } 
      },
      { 
        type: WIDGET_TYPES.TECH_STACK, 
        data: { title: 'Yetenek Havuzum', align: 'left', style: 'flat-square', selectedTech: ['html5', 'css3', 'javascript', 'typescript', 'react', 'nodejs', 'git', 'docker', 'postgresql', 'aws', 'figma'] } 
      },
      { 
        type: WIDGET_TYPES.GITHUB_STATS, 
        data: { username: 'zeynep-kaya', theme: 'radical', showPrivateCommits: true, hideTitle: false, hideRank: false, align: 'left', showLanguages: true, showStreak: true } 
      }
    ]
  }
];

function Sidebar({ onAddWidget, onLoadTemplate }) {
  const [activeSubTab, setActiveSubTab] = useState('add');

  return (
    <aside className="app-sidebar">
      {/* Tab Switcher */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', background: 'rgba(255,255,255,0.02)', padding: '4px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
        <button 
          className={`tab-btn ${activeSubTab === 'add' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('add')}
          style={{ padding: '6px', fontSize: '12px' }}
        >
          🧩 Bileşenler
        </button>
        <button 
          className={`tab-btn ${activeSubTab === 'templates' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('templates')}
          style={{ padding: '6px', fontSize: '12px' }}
        >
          📂 Hazır Şablonlar
        </button>
      </div>

      {activeSubTab === 'add' ? (
        <>
          <div>
            <h3 className="sidebar-title">Bileşen Ekle</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '0 0 16px 0' }}>
              README profilinize eklemek istediğiniz bileşene tıklayın:
            </p>
          </div>

          <div className="widget-menu">
            {CATALOG_ITEMS.map((item) => (
              <button
                key={item.type}
                className="widget-menu-item"
                onClick={() => onAddWidget(item.type)}
              >
                <div className="widget-menu-icon">{item.icon}</div>
                <div className="widget-menu-details">
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <div>
            <h3 className="sidebar-title">Şablon Yükle</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '0 0 16px 0' }}>
              Tek tıkla hazır bir düzen yükleyin (mevcut tuvaliniz temizlenecektir):
            </p>
          </div>

          <div className="widget-menu">
            {TEMPLATES.map((tpl) => (
              <button
                key={tpl.id}
                className="widget-menu-item"
                onClick={() => onLoadTemplate(tpl.widgets)}
              >
                <div className="widget-menu-icon" style={{ color: 'var(--secondary-color)' }}>{tpl.icon}</div>
                <div className="widget-menu-details">
                  <h4>{tpl.title}</h4>
                  <p>{tpl.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </>
      )}

      <div style={{ marginTop: 'auto', padding: '16px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
        <h5 style={{ margin: '0 0 8px 0', fontSize: '13px', color: 'var(--primary-color)' }}>🚀 İpucu</h5>
        <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
          Tasarım Ekranında bir bileşene tıklayarak sağdaki panelden rengini, yuvarlaklığını ve cam bulanıklığını özelleştirebilirsiniz.
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;
