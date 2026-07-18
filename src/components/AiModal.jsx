import React, { useState, useEffect } from 'react';

const ROLE_TEMPLATES = [
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'Mobile Developer',
  'UI/UX Designer',
  'Data Scientist',
];

const KEYWORD_PRESETS = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'GraphQL', 'AWS', 
  'Docker', 'Python', 'PostgreSQL', 'TailwindCSS', 'Figma', 'Git'
];

function AiModal({ isOpen, onClose, onApply }) {
  const [role, setRole] = useState('Full Stack Developer');
  const [tone, setTone] = useState('professional');
  const [keywords, setKeywords] = useState('React, Next.js, TypeScript, UI/UX');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generatedText, setGeneratedText] = useState('');
  const [typedText, setTypedText] = useState('');

  // Typing effect
  useEffect(() => {
    if (!generatedText) {
      setTypedText('');
      return;
    }
    
    let index = 0;
    setTypedText('');
    
    const interval = setInterval(() => {
      setTypedText((prev) => prev + generatedText.charAt(index));
      index++;
      if (index >= generatedText.length) {
        clearInterval(interval);
      }
    }, 12); // Fast typing speed

    return () => clearInterval(interval);
  }, [generatedText]);

  // Animate progress bar during mock generation
  useEffect(() => {
    let interval;
    if (isGenerating) {
      setGenerationProgress(0);
      interval = setInterval(() => {
        setGenerationProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  if (!isOpen) return null;

  const handleKeywordClick = (kw) => {
    // Append keyword
    if (!keywords.includes(kw)) {
      setKeywords(prev => prev ? `${prev}, ${kw}` : kw);
    }
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setGeneratedText('');
    setTypedText('');

    setTimeout(() => {
      // Setup dynamic randomized structures to mock AI LLM output
      const listKeywords = keywords.split(',').map(s => s.trim()).filter(Boolean);
      const kwString = listKeywords.length > 0 ? listKeywords.join(', ') : 'modern teknolojiler';

      const professionalTemplates = [
        `Modern web standartları çerçevesinde projeler geliştiren bir ${role} olarak görev almaktayım. Geliştirme süreçlerimde ağırlıklı olarak ${kwString} teknolojilerini tercih ediyor; temiz kod (clean code), yüksek performans ve sürdürülebilirlik ilkelerini benimsiyorum. Ölçeklenebilir SaaS mimarileri tasarlamaktan ve uçtan uca kullanıcı odaklı dijital ürünler üretmekten keyif alıyorum.`,
        `Yazılım sektöründe ${role} rolüyle inovatif çözümler üretiyorum. Alet çantamın merkezinde yer alan ${kwString} gibi araçlarla, karmaşık problemleri basit ve işlevsel web arayüzlerine dönüştürüyorum. Teknik mükemmeliyetçiliğe değer veriyor, ekip içi işbirliği ve sürekli öğrenme motivasyonuyla kendimi geliştiriyorum.`,
        `Gelişmiş web ekosisteminde ${role} olarak katma değer yaratıyorum. ${kwString} alanındaki derin tecrübelerimle, kullanıcı gereksinimlerini en üst seviyede karşılayan güvenli, hızlı ve optimize altyapılar inşa ediyorum. UI/UX standartlarına sadık kalarak, modern dijital deneyimler tasarlamaya odaklıyım.`
      ];

      const creativeTemplates = [
        `Selam! Ben bir ${role} olarak piksel piksel hayalleri gerçeğe dönüştürüyor, satır satır kod yazıyorum. 🚀 ${kwString} dünyasına olan tutkumla, tasarımla mühendisliği büyülü bir şekilde harmanlıyorum. Her projeyi yeni bir sanat eseri olarak görüyor, web üzerinde unutulmaz ve etkileşimli kullanıcı deneyimleri inşa etmeyi amaçlıyorum.`,
        `Merhaba, dijital dünyaların mimarı bir ${role} ile karşı karşıyasınız! ✨ ${kwString} gibi modern teknolojilerle oynayarak, internet tarayıcılarının sınırlarını zorlayan dinamik projeler tasarlıyorum. Kullanıcıların gezinirken keyif alacağı, akıcı animasyonlar ve şık geçişlerle dolu web maceraları kurgulamak en büyük tutkum.`,
        `Kodların dünyasında kaybolup kullanıcı dostu arayüzlerle geri dönen meraklı bir ${role} geliştiriciyim. ${kwString} entegrasyonlarıyla güçlendirdiğim projelerde, sadelikle performansı bir araya getirmeyi hedefliyorum. Standartların dışına çıkıp yaratıcı fikirleri kodlamayı çok seviyorum!`
      ];

      const minimalTemplates = [
        `${role}. Minimalist tasarım ve işlevsel kod mimarisi odaklı çalışıyorum. Projelerimde ${kwString} teknolojilerinden yararlanarak; gereksiz karmaşıklıktan uzak, sade, hızlı ve erişilebilir web deneyimleri oluşturmaya odaklanıyorum. Az ama öz tasarım felsefesine inanıyorum.`,
        `${role}. Temiz yazılım mimarisi ve estetik sadelik savunucusu. ${kwString} ekosisteminde performans odaklı çözümler üretiyorum. Gereksiz kütüphanelerden kaçınarak, sadece işe yarayan temiz kod blokları ve yüksek hız hedeflerim.`,
        `${role} olarak sadece amaca hizmet eden arayüzler ve güçlü altyapılar tasarlıyorum. ${kwString} odağında geliştirdiğim projelerde tek bir kuralım var: Sadelik eşittir kalite. Kodum ne kadar yalınsa, kullanıcı deneyimi o kadar güçlüdür.`
      ];

      const funnyTemplates = [
        `Kahve çekirdeklerini çalıştırılabilir kod satırlarına dönüştüren bir ${role}! ☕ ${kwString} kullanarak tarayıcıları şenlendiriyorum. Hatalarla (bug) savaşmayı, çayın yanındaki kurabiyeyi yemeye benzetiyorum. Eğlenceli, hızlı ve kullanıcıların 'Vay be, bunu kim yazmış?' diyeceği SaaS projeleri geliştirmek en büyük hobim!`,
        `İnternetin gizemli labirentlerinde ${role} olarak kaybolmuş bir yazılım maceracısıyım. 🧭 ${kwString} büyüleriyle donatılmış klavyemle, hatalara karşı amansız bir mücadele veriyorum. Kodlarımın performansı kadar, çalışma masamdaki kahve fincanlarının yüksekliğine de önem veririm.`,
        `Arayüzleri renklendiren, backend'i coşturan çılgın bir ${role}! 💻 ${kwString} kullanarak tarayıcı pencerelerine hayat veriyorum. Kod yazarken dinlediğim müziklerin ritmine göre kod yazma hızım değişir. Kullanıcıların yüzünde tebessüm oluşturacak şık tasarımlar üretmek en büyük ödülüm!`
      ];

      let templates = professionalTemplates;
      if (tone === 'creative') templates = creativeTemplates;
      else if (tone === 'minimal') templates = minimalTemplates;
      else if (tone === 'funny') templates = funnyTemplates;

      // Select a random template to feel realistic
      const randomIndex = Math.floor(Math.random() * templates.length);
      const bioResult = templates[randomIndex];

      setGeneratedText(bioResult);
      setIsGenerating(false);
    }, 1200);
  };

  const handleApply = () => {
    onApply(typedText || generatedText);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ width: '580px', background: '#0a0d1a' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">🤖 AI Biyografi Sihirbazı</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {/* Role Presets */}
        <div className="form-group">
          <label>Rol Şablonları</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
            {ROLE_TEMPLATES.map(t => (
              <button 
                key={t}
                className={`btn btn-secondary ${role === t ? 'btn-primary' : ''}`}
                onClick={() => setRole(t)}
                style={{ padding: '4px 8px', fontSize: '11px', borderRadius: '6px' }}
              >
                {t}
              </button>
            ))}
          </div>
          <input 
            type="text" 
            className="form-input" 
            value={role}
            placeholder="Özel rol yazın..."
            onChange={(e) => setRole(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Yazım Tarzı / Tonlama</label>
          <select 
            className="form-select" 
            value={tone}
            onChange={(e) => setTone(e.target.value)}
          >
            <option value="professional">💼 Profesyonel & Kurumsal</option>
            <option value="creative">🎨 Yaratıcı & İlham Verici</option>
            <option value="minimal">📐 Sade & Minimalist</option>
            <option value="funny">🚀 Eğlenceli & Samimi</option>
          </select>
        </div>

        {/* Keyword Presets */}
        <div className="form-group">
          <label>Anahtar Kelimeler</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
            {KEYWORD_PRESETS.map(kw => (
              <button 
                key={kw}
                className="btn btn-secondary"
                onClick={() => handleKeywordClick(kw)}
                style={{ 
                  padding: '3px 8px', 
                  fontSize: '11px', 
                  borderRadius: '6px',
                  background: keywords.includes(kw) ? 'rgba(99, 102, 241, 0.1)' : 'rgba(255,255,255,0.03)',
                  borderColor: keywords.includes(kw) ? 'var(--primary-color)' : 'var(--border-color)'
                }}
              >
                +{kw}
              </button>
            ))}
          </div>
          <input 
            type="text" 
            className="form-input" 
            placeholder="Virgülle ayırarak yazın (örn. React, AWS, Docker)"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
        </div>

        <button 
          className="btn btn-primary" 
          onClick={handleGenerate}
          disabled={isGenerating}
          style={{ width: '100%', marginTop: '10px' }}
        >
          {isGenerating ? '⏳ Yapay Zeka Düşünüyor...' : '✍️ Biyografi Oluştur'}
        </button>

        {isGenerating && (
          <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', marginTop: '12px', overflow: 'hidden' }}>
            <div style={{ width: `${generationProgress}%`, height: '100%', background: 'linear-gradient(90deg, var(--primary-color), var(--secondary-color))', transition: 'width 0.1s' }}></div>
          </div>
        )}

        {(generatedText || isGenerating) && (
          <div className="ai-output-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '11px' }}>
              <span style={{ color: 'var(--primary-color)', fontWeight: '600' }}>
                YAPAY ZEKA ÇIKTISI
              </span>
              {generatedText && !isGenerating && (
                <span style={{ color: 'var(--text-muted)' }}>
                  {typedText.length} Karakter | {typedText.split(/\s+/).filter(Boolean).length} Kelime
                </span>
              )}
            </div>
            {isGenerating ? (
              <span style={{ color: 'var(--text-secondary)' }}>Fikirler toparlanıyor ve en uygun şablon seçiliyor...</span>
            ) : (
              <span className="ai-typing-effect">{typedText}</span>
            )}
            
            {generatedText && !isGenerating && (
              <button 
                className="btn btn-secondary" 
                onClick={handleApply}
                style={{ 
                  marginTop: '16px', 
                  alignSelf: 'flex-end', 
                  background: 'rgba(99, 102, 241, 0.15)', 
                  borderColor: 'rgba(99, 102, 241, 0.3)',
                  boxShadow: '0 0 10px rgba(99, 102, 241, 0.1)'
                }}
              >
                📥 Tasarıma Aktar
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AiModal;
