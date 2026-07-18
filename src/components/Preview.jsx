import React, { useState } from 'react';
import { WIDGET_TYPES, PLATFORMS } from '../constants/widgets';

export function generateMarkdown(widgets) {
  let md = '';

  widgets.forEach((widget) => {
    const { type, data } = widget;
    const align = data.align || 'center';

    if (type === WIDGET_TYPES.PROFILE_CARD) {
      md += `<div align="${align}">\n`;
      if (data.avatarUrl) {
        md += `  <img src="${data.avatarUrl}" width="120" style="border-radius: 50%;" alt="avatar" />\n`;
      }
      md += `  <h1>Merhaba, ben ${data.name || 'Geliştirici'}! 👋</h1>\n`;
      md += `  <h3>${data.title || 'Senior Software Engineer'}</h3>\n`;
      if (data.bio) {
        md += `  <p>${data.bio}</p>\n`;
      }
      md += `  <p>\n`;
      if (data.location) md += `    📍 Konum: <b>${data.location}</b> &nbsp;&nbsp;\n`;
      if (data.company) md += `    🏢 Kurum: <b>${data.company}</b> &nbsp;&nbsp;\n`;
      if (data.pronouns) md += `    💬 Zamirler: <b>${data.pronouns}</b>\n`;
      md += `  </p>\n`;
      
      // Render CV, LinkedIn, and GitHub Badges
      if (data.linkedinUrl || data.cvUrl || data.githubUrl) {
        md += `  <p>\n`;
        if (data.githubUrl) {
          md += `    <a href="${data.githubUrl}" target="_blank">\n`;
          md += `      <img src="https://img.shields.io/badge/GitHub-Profilimi_Ziyaret_Et-238636?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />\n`;
          md += `    </a>\n`;
        }
        if (data.linkedinUrl) {
          md += `    <a href="${data.linkedinUrl}" target="_blank">\n`;
          md += `      <img src="https://img.shields.io/badge/LinkedIn-Profilimi_Ziyaret_Et-blue?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />\n`;
          md += `    </a>\n`;
        }
        if (data.cvUrl) {
          md += `    <a href="${data.cvUrl}" target="_blank">\n`;
          md += `      <img src="https://img.shields.io/badge/%C3%96zge%C3%A7mi%C5%9F-CV'mi_%C4%B0ndir-indigo?style=for-the-badge&logo=googledrive&logoColor=white" alt="CV" />\n`;
          md += `    </a>\n`;
        }
        md += `  </p>\n`;
      }

      md += `</div>\n\n`;
      md += `---\n\n`;
    }

    if (type === WIDGET_TYPES.SOCIAL_BADGES) {
      if (data.platforms && data.platforms.length > 0) {
        md += `<div align="${align}">\n`;
        data.platforms.forEach((p) => {
          const platformDetails = PLATFORMS.find((plat) => plat.id === p.id);
          const platformColor = platformDetails ? platformDetails.color.replace('#', '') : 'blue';
          md += `  <a href="https://${p.id}.com/${p.username}" target="_blank">\n`;
          md += `    <img src="https://img.shields.io/badge/${p.id.toUpperCase()}-${p.username}-${platformColor}?style=${data.style || 'flat'}&logo=${p.id}&logoColor=white" alt="${p.id}" />\n`;
          md += `  </a>\n`;
        });
        md += `</div>\n\n`;
      }
    }

    if (type === WIDGET_TYPES.TECH_STACK) {
      md += `<div align="${align}">\n`;
      md += `  <h3>💻 ${data.title || 'Teknoloji Yığınım'}</h3>\n`;
      if (data.selectedTech && data.selectedTech.length > 0) {
        data.selectedTech.forEach((techId) => {
          md += `  <img src="https://img.shields.io/badge/${techId.toUpperCase()}-333?style=${data.style || 'flat-square'}&logo=${techId}&logoColor=white" alt="${techId}" />\n`;
        });
      }
      md += `</div>\n\n`;
    }

    if (type === WIDGET_TYPES.GITHUB_STATS) {
      if (data.username) {
        md += `<div align="${align}">\n`;
        md += `  <h3>📊 GitHub Geliştirici Kartlarım</h3>\n`;
        md += `  <img src="https://github-readme-stats.vercel.app/api?username=${data.username}&show_icons=true&theme=${data.theme || 'dark'}&count_private=${data.showPrivateCommits}&hide_title=${data.hideTitle}&hide_rank=${data.hideRank}" alt="GitHub Stats" />\n`;
        
        if (data.showLanguages) {
          md += `  <br />\n`;
          md += `  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${data.username}&layout=compact&theme=${data.theme || 'dark'}&hide_title=${data.hideTitle}" alt="GitHub Top Languages" />\n`;
        }

        if (data.showStreak) {
          md += `  <br />\n`;
          md += `  <img src="https://github-readme-streak-stats.herokuapp.com/?user=${data.username}&theme=${data.theme || 'dark'}" alt="GitHub Streak" />\n`;
        }
        
        md += `</div>\n\n`;
      }
    }
  });

  return md;
}

export function generateHtml(widgets) {
  let html = '<!-- ReadmeCraft ile Oluşturulmuştur -->\n';
  
  widgets.forEach((widget) => {
    const { type, data } = widget;
    const align = data.align || 'center';

    if (type === WIDGET_TYPES.PROFILE_CARD) {
      html += `<div style="text-align: ${align}; margin-bottom: 24px;">\n`;
      if (data.avatarUrl) {
        html += `  <img src="${data.avatarUrl}" width="120" style="border-radius: 50%;" alt="avatar" />\n`;
      }
      html += `  <h1 style="margin-top: 12px;">Merhaba, ben ${data.name || 'Geliştirici'}! 👋</h1>\n`;
      html += `  <h3 style="color: #6366f1;">${data.title || 'Senior Software Engineer'}</h3>\n`;
      if (data.bio) {
        html += `  <p style="max-width: 600px; margin: 12px ${align === 'center' ? 'auto' : '0'};">${data.bio}</p>\n`;
      }
      html += `  <p style="font-size: 14px; color: #9ca3af;">\n`;
      if (data.location) html += `    📍 Konum: <b>${data.location}</b> &nbsp;&nbsp;\n`;
      if (data.company) html += `    🏢 Kurum: <b>${data.company}</b> &nbsp;&nbsp;\n`;
      if (data.pronouns) html += `    💬 Zamirler: <b>${data.pronouns}</b>\n`;
      html += `  </p>\n`;

      // Render CV, LinkedIn, and GitHub Buttons
      if (data.linkedinUrl || data.cvUrl || data.githubUrl) {
        html += `  <p>\n`;
        if (data.githubUrl) {
          html += `    <a href="${data.githubUrl}" target="_blank" style="margin: 4px; display: inline-block;">\n`;
          html += `      <img src="https://img.shields.io/badge/GitHub-Profilimi_Ziyaret_Et-238636?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />\n`;
          html += `    </a>\n`;
        }
        if (data.linkedinUrl) {
          html += `    <a href="${data.linkedinUrl}" target="_blank" style="margin: 4px; display: inline-block;">\n`;
          html += `      <img src="https://img.shields.io/badge/LinkedIn-Profilimi_Ziyaret_Et-blue?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />\n`;
          html += `    </a>\n`;
        }
        if (data.cvUrl) {
          html += `    <a href="${data.cvUrl}" target="_blank" style="margin: 4px; display: inline-block;">\n`;
          html += `      <img src="https://img.shields.io/badge/%C3%96zge%C3%A7mi%C5%9F-CV'mi_%C4%B0ndir-indigo?style=for-the-badge&logo=googledrive&logoColor=white" alt="CV" />\n`;
          html += `    </a>\n`;
        }
        html += `  </p>\n`;
      }

      html += `</div>\n<hr style="border-color: rgba(255,255,255,0.1);" />\n\n`;
    }

    if (type === WIDGET_TYPES.SOCIAL_BADGES) {
      if (data.platforms && data.platforms.length > 0) {
        html += `<div style="text-align: ${align}; margin-bottom: 20px;">\n`;
        data.platforms.forEach((p) => {
          const platformDetails = PLATFORMS.find((plat) => plat.id === p.id);
          const platformColor = platformDetails ? platformDetails.color.replace('#', '') : 'blue';
          html += `  <a href="https://${p.id}.com/${p.username}" target="_blank" style="margin: 4px; display: inline-block;">\n`;
          html += `    <img src="https://img.shields.io/badge/${p.id.toUpperCase()}-${p.username}-${platformColor}?style=${data.style || 'flat'}&logo=${p.id}&logoColor=white" alt="${p.id}" />\n`;
          html += `  </a>\n`;
        });
        html += `</div>\n\n`;
      }
    }

    if (type === WIDGET_TYPES.TECH_STACK) {
      html += `<div style="text-align: ${align}; margin-bottom: 24px;">\n`;
      html += `  <h3>${data.title || 'Teknoloji Yığınım'}</h3>\n`;
      if (data.selectedTech && data.selectedTech.length > 0) {
        html += `<div style="text-align: ${align}; margin-bottom: 24px;">\n`;
        data.selectedTech.forEach((techId) => {
          html += `  <img src="https://img.shields.io/badge/${techId.toUpperCase()}-333?style=${data.style || 'flat-square'}&logo=${techId}&logoColor=white" alt="${techId}" style="margin: 3px; display: inline-block;" />\n`;
        });
        html += `</div>\n\n`;
      }
    }

    if (type === WIDGET_TYPES.GITHUB_STATS) {
      if (data.username) {
        html += `<div style="text-align: ${align}; margin-bottom: 24px;">\n`;
        html += `  <h3>GitHub Geliştirici Kartlarım</h3>\n`;
        html += `  <img src="https://github-readme-stats.vercel.app/api?username=${data.username}&show_icons=true&theme=${data.theme || 'dark'}&count_private=${data.showPrivateCommits}&hide_title=${data.hideTitle}&hide_rank=${data.hideRank}" alt="GitHub Stats" style="margin-bottom: 12px; max-width: 100%;" />\n`;
        
        if (data.showLanguages) {
          html += `  <br />\n`;
          html += `  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${data.username}&layout=compact&theme=${data.theme || 'dark'}&hide_title=${data.hideTitle}" alt="GitHub Top Languages" style="margin-bottom: 12px; max-width: 100%;" />\n`;
        }

        if (data.showStreak) {
          html += `  <br />\n`;
          html += `  <img src="https://github-readme-streak-stats.herokuapp.com/?user=${data.username}&theme=${data.theme || 'dark'}" alt="GitHub Streak" style="max-width: 100%;" />\n`;
        }
        
        html += `</div>\n\n`;
      }
    }
  });

  return html;
}

// Custom simple syntax highlighting logic for premium presentation
function highlightHtml(code) {
  let escaped = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  
  // Highlight comments: <!-- comment -->
  escaped = escaped.replace(/(&lt;!--.*?--&gt;)/gs, '<span class="hl-comment">$1</span>');

  // Highlight tags & attributes
  escaped = escaped.replace(/(&lt;\/?[a-z0-9-]+)(\s+[^&]+)?(&gt;)/gi, (m, tag, attrs, gt) => {
    let highlightedAttrs = attrs || '';
    if (attrs) {
      highlightedAttrs = attrs.replace(/([a-z0-9:-]+)=("[^"]*")/gi, '<span class="hl-attr">$1</span>=<span class="hl-str">$2</span>');
    }
    return `<span class="hl-tag">${tag}</span>${highlightedAttrs}<span class="hl-tag">${gt}</span>`;
  });

  return escaped;
}

function highlightMarkdown(code) {
  let escaped = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // Highlight headings (e.g. #, ##)
  escaped = escaped.replace(/^(#+\s+.*)$/gm, '<span class="hl-heading">$1</span>');

  // Highlight images & links: ![alt](url) or [txt](url)
  escaped = escaped.replace(/(!?\[.*?\]\(.*?\))/g, '<span class="hl-link">$1</span>');

  // Highlight inline HTML tags in markdown
  escaped = escaped.replace(/(&lt;\/?[a-z0-9-]+.*?&gt;)/gi, '<span class="hl-html-tag">$1</span>');

  return escaped;
}

function Preview({ widgets, type }) {
  const [subTab, setSubTab] = useState('code'); // 'code' (syntax highlighted), 'github' (mock GitHub dark theme render)

  if (widgets.length === 0) {
    return (
      <div className="app-canvas">
        <div className="canvas-empty">
          <div className="empty-icon">📝</div>
          <h3>Kod Önizlemesi Boş</h3>
          <p>Kod çıktısını görüntülemek için önce tasarıma bileşenler ekleyin.</p>
        </div>
      </div>
    );
  }

  const rawMarkdown = generateMarkdown(widgets);
  const rawHtml = generateHtml(widgets);

  const getHighlightedContent = () => {
    if (type === 'markdown') {
      return highlightMarkdown(rawMarkdown);
    }
    return highlightHtml(rawHtml);
  };

  return (
    <div className="app-canvas" style={{ padding: '20px' }}>
      <div className="code-preview-container">
        <div className="code-preview-header">
          <div style={{ display: 'flex', gap: '8px' }}>
            <span className="code-title">{type === 'markdown' ? 'README.md' : 'index.html'}</span>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', alignSelf: 'center' }}>|</span>
            <button 
              className={`tab-btn ${subTab === 'code' ? 'active' : ''}`}
              onClick={() => setSubTab('code')}
              style={{ padding: '2px 8px', fontSize: '11px', borderRadius: '4px' }}
            >
              💻 Kod Görünümü
            </button>
            <button 
              className={`tab-btn ${subTab === 'github' ? 'active' : ''}`}
              onClick={() => setSubTab('github')}
              style={{ padding: '2px 8px', fontSize: '11px', borderRadius: '4px' }}
            >
              🐙 GitHub Görünümü
            </button>
          </div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Yalnızca okunabilir</span>
        </div>

        {subTab === 'code' ? (
          <pre className="code-area">
            <code dangerouslySetInnerHTML={{ __html: getHighlightedContent() }}></code>
          </pre>
        ) : (
          /* Mock GitHub dark mode README container */
          <div className="github-readme-container">
            <div className="github-readme-header">
              <span>📖 README.md</span>
            </div>
            <div className="github-readme-content">
              {widgets.map((widget) => {
                const align = widget.data.align || 'center';
                const getAlignFlex = (a) => a === 'center' ? 'center' : a === 'right' ? 'flex-end' : 'flex-start';

                return (
                  <div key={widget.id} style={{ marginBottom: '24px' }}>
                    
                    {widget.type === WIDGET_TYPES.PROFILE_CARD && (
                      <div style={{ textAlign: align }}>
                        {widget.data.avatarUrl && (
                          <img 
                            src={widget.data.avatarUrl} 
                            width="110" 
                            style={{ borderRadius: '50%' }} 
                            alt="avatar" 
                          />
                        )}
                        <h1 style={{ borderBottom: 'none', margin: '12px 0 4px 0', fontSize: '26px' }}>
                          Merhaba, ben {widget.data.name || 'Geliştirici'}! 👋
                        </h1>
                        <h3 style={{ color: '#58a6ff', margin: '4px 0 12px 0', fontWeight: '500' }}>
                          {widget.data.title || 'Senior Software Engineer'}
                        </h3>
                        {widget.data.bio && (
                          <p style={{ color: '#8b949e', maxWidth: '600px', margin: '12px auto' }}>
                            {widget.data.bio}
                          </p>
                        )}
                        <p style={{ color: '#8b949e', fontSize: '13px', marginBottom: '12px' }}>
                          {widget.data.location && <span>📍 {widget.data.location} &nbsp;</span>}
                          {widget.data.company && <span>🏢 {widget.data.company} &nbsp;</span>}
                          {widget.data.pronouns && <span>💬 {widget.data.pronouns}</span>}
                        </p>
                        
                        {/* GitHub Preview Badges for GitHub, LinkedIn and CV */}
                        {(widget.data.linkedinUrl || widget.data.cvUrl || widget.data.githubUrl) && (
                          <p style={{ display: 'flex', gap: '8px', justifyContent: getAlignFlex(align), flexWrap: 'wrap', margin: '12px 0' }}>
                            {widget.data.githubUrl && (
                              <img src="https://img.shields.io/badge/GitHub-Profilimi_Ziyaret_Et-238636?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
                            )}
                            {widget.data.linkedinUrl && (
                              <img src="https://img.shields.io/badge/LinkedIn-Profilimi_Ziyaret_Et-blue?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
                            )}
                            {widget.data.cvUrl && (
                              <img src="https://img.shields.io/badge/%C3%96zge%C3%A7mi%C5%9F-CV'mi_%C4%B0ndir-indigo?style=for-the-badge&logo=googledrive&logoColor=white" alt="CV" />
                            )}
                          </p>
                        )}

                        <hr style={{ border: 'none', height: '1px', background: '#30363d', margin: '20px 0' }} />
                      </div>
                    )}

                    {widget.type === WIDGET_TYPES.SOCIAL_BADGES && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: getAlignFlex(align) }}>
                        {widget.data.platforms && widget.data.platforms.map((p) => {
                          const platformColor = p.color || 'blue';
                          return (
                            <img 
                              key={p.id}
                              src={`https://img.shields.io/badge/${p.id.toUpperCase()}-${p.username}-${platformColor.replace('#', '')}?style=${widget.data.style || 'flat'}&logo=${p.id}&logoColor=white`} 
                              alt={p.id} 
                            />
                          );
                        })}
                      </div>
                    )}

                    {widget.type === WIDGET_TYPES.TECH_STACK && (
                      <div style={{ textAlign: align }}>
                        <h3 style={{ borderBottom: '1px solid #21262d', paddingBottom: '8px', fontSize: '18px' }}>
                          💻 {widget.data.title || 'Teknoloji Yığınım'}
                        </h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: getAlignFlex(align), marginTop: '12px' }}>
                          {widget.data.selectedTech && widget.data.selectedTech.map((techId) => (
                            <img 
                              key={techId}
                              src={`https://img.shields.io/badge/${techId.toUpperCase()}-333?style=${widget.data.style || 'flat-square'}&logo=${techId}&logoColor=white`}
                              alt={techId} 
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {widget.type === WIDGET_TYPES.GITHUB_STATS && widget.data.username && (
                      <div style={{ textAlign: align }}>
                        <h3 style={{ borderBottom: '1px solid #21262d', paddingBottom: '8px', fontSize: '18px' }}>
                          📊 GitHub Geliştirici Kartlarım
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: getAlignFlex(align), marginTop: '12px' }}>
                          <img 
                            src={`https://github-readme-stats.vercel.app/api?username=${widget.data.username}&show_icons=true&theme=${widget.data.theme || 'dark'}&count_private=${widget.data.showPrivateCommits}&hide_title=${widget.data.hideTitle}&hide_rank=${widget.data.hideRank}`} 
                            alt="GitHub Stats" 
                            style={{ maxWidth: '360px', width: '100%' }}
                          />
                          {widget.data.showLanguages && (
                            <img 
                              src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${widget.data.username}&layout=compact&theme=${widget.data.theme || 'dark'}&hide_title=${widget.data.hideTitle}`} 
                              alt="Top Languages" 
                              style={{ maxWidth: '360px', width: '100%' }}
                            />
                          )}
                          {widget.data.showStreak && (
                            <img 
                              src={`https://github-readme-streak-stats.herokuapp.com/?user=${widget.data.username}&theme=${widget.data.theme || 'dark'}`} 
                              alt="Streak Stats" 
                              style={{ maxWidth: '360px', width: '100%' }}
                            />
                          )}
                        </div>
                      </div>
                    )}

                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Preview;
