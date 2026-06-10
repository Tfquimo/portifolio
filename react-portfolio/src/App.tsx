import { useEffect, useMemo, useState } from 'react'
import './App.css'
import profileImg from '../../assets/img/my-profile-img.jpg'

const phrases = ['Engenheiro Informático', 'Desenvolvedor Web', 'Especialista em Redes', 'Técnico de Segurança CCTV']

const skills = [
  { name: 'PHP / Laravel', value: 85 },
  { name: 'JavaScript', value: 80 },
  { name: 'HTML & CSS', value: 90 },
  { name: 'Redes de Computadores', value: 85 },
  { name: 'CCTV / Câmaras', value: 90 },
  { name: 'Manutenção PC', value: 88 },
  { name: 'Sistemas Operativos', value: 82 },
  { name: 'Photoshop', value: 65 },
]

const experience = [
  {
    year: '2024',
    company: 'AS Comércio e Prestação de Serviços',
    role: 'Técnico de Informática e Redes',
    bullets: ['Instalação e manutenção de câmaras de vigilância CCTV', 'Instalação e manutenção de redes de computadores', 'Assistência técnica e manutenção de computadores'],
  },
  {
    year: '2023',
    company: 'Instituto Nacional de Segurança Social (INSS) – Nampula',
    role: 'Técnico de Informática',
    bullets: ['Manutenção de redes e computadores', 'Gestão dos sistemas GED e SISMO', 'Realização de prova de vida e relatórios mensais'],
  },
  {
    year: '2022',
    company: 'Centro de Formação EVAL',
    role: 'Formador e Agente de Reprografia',
    bullets: ['Leccionação de Informática Básica', 'Cópias, digitação e impressão'],
  },
]

const education = [
  { title: 'Licenciatura em Engenharia Informática e Telecomunicações', detail: 'ISEUNA - Universidade Àpolitécnica | 2020 – 2024' },
  { title: 'Ensino Médio', detail: 'Escola Secundária Geral da Amizade – Lichinga | 2019' },
  { title: 'Introdução à Cibersegurança', detail: 'CISCO Network Academy | 2024' },
  { title: 'Suporte e Segurança de Rede', detail: 'CISCO Network Academy | 2024' },
]

const portfolioItems = [
  { title: 'ECV — Elite Company Vendas', category: 'Sistemas', tech: '.NET 8 | Windows Forms | SQLite', description: 'Sistema desktop de gestão de vendas e stock para pequenas empresas.', tags: ['Sistemas', 'Desktop'] },
  { title: 'Elite Billing System', category: 'Web', tech: 'Laravel | PHP | MySQL | MZN', description: 'Sistema web de faturação para PMEs moçambicanas com suporte M-Pesa.', tags: ['Web', 'Fintech'] },
  { title: 'SCD — Sistema de Criptografia de Dados', category: 'Segurança', tech: 'Laravel | AES-256 | 2FA', description: 'Sistema web para cifragem de ficheiros com controlo de acesso e auditoria.', tags: ['Web', 'Segurança'] },
  { title: 'Website Elite Company', category: 'Web', tech: 'HTML | CSS | JavaScript', description: 'Website institucional com design dark tech.', tags: ['Web'] },
  { title: 'Videovigilância — 20 câmaras Hikvision', category: 'Segurança', tech: 'Hikvision | NVR | SADP Tool', description: 'Instalação e acesso remoto para sistema de vigilância em Nampula.', tags: ['Segurança', 'CCTV'] },
  { title: 'Rede Corporativa LAN', category: 'Redes', tech: 'Cisco | Switch | VLAN', description: 'Configuração de rede corporativa com segmentação VLAN.', tags: ['Redes'] },
]

const services = [
  { title: 'Desenvolvimento Web', description: 'Criação de websites e sistemas web com PHP, JavaScript, HTML/CSS e frameworks modernos.' },
  { title: 'Redes de Computadores', description: 'Instalação, configuração e manutenção de redes LAN/WAN para empresas e particulares.' },
  { title: 'Instalação de Câmaras CCTV', description: 'Instalação e configuração de sistemas de videovigilância Hikvision com acesso remoto.' },
  { title: 'Manutenção Informática', description: 'Reparação e manutenção de computadores, impressoras e periféricos.' },
  { title: 'Segurança Informática', description: 'Configuração de sistemas seguros, encriptação de dados e auditorias de segurança.' },
  { title: 'Formação em Informática', description: 'Aulas práticas de informática básica, redes e programação para profissionais e estudantes.' },
]

function App() {
  const [displayText, setDisplayText] = useState('')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [activeFilter, setActiveFilter] = useState('Todos')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex]
    const typingSpeed = isDeleting ? 55 : 90

    const timer = window.setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentPhrase.slice(0, displayText.length + 1))
        if (displayText.length === currentPhrase.length) {
          window.setTimeout(() => setIsDeleting(true), 900)
        }
      } else {
        setDisplayText(currentPhrase.slice(0, displayText.length - 1))
        if (displayText.length === 0) {
          setIsDeleting(false)
          setPhraseIndex((prev) => (prev + 1) % phrases.length)
        }
      }
    }, typingSpeed)

    return () => window.clearTimeout(timer)
  }, [displayText, isDeleting, phraseIndex])

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible')
      })
    }, { threshold: 0.12 })

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'Todos') return portfolioItems
    return portfolioItems.filter((item) => item.category === activeFilter)
  }, [activeFilter])

  return (
    <main className="app-shell">
      <header className="topbar reveal">
        <a className="brand" href="#inicio">TQ</a>
        <button className={`hamburger ${menuOpen ? 'open' : ''}`} type="button" onClick={() => setMenuOpen((prev) => !prev)} aria-label="Abrir menu">
          <span />
          <span />
          <span />
        </button>
        <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <a href="#inicio" onClick={() => setMenuOpen(false)}>Início</a>
          <a href="#sobre" onClick={() => setMenuOpen(false)}>Sobre</a>
          <a href="#skills" onClick={() => setMenuOpen(false)}>Skills</a>
          <a href="#experiencia" onClick={() => setMenuOpen(false)}>Experiência</a>
          <a href="#formacao" onClick={() => setMenuOpen(false)}>Formação</a>
          <a href="#portfolio" onClick={() => setMenuOpen(false)}>Portfólio</a>
          <a href="#servicos" onClick={() => setMenuOpen(false)}>Serviços</a>
          <a href="#contato" onClick={() => setMenuOpen(false)}>Contacto</a>
          <a className="nav-cta" href="#contato">Contratar</a>
        </nav>
      </header>

      <section className="hero-card reveal" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow">Disponível para projectos</p>
          <h1>Olá, sou <span className="glitch">Taufique Quimo</span></h1>
          <p className="typewriter">{displayText}<span className="cursor">|</span></p>
          <p className="lead">Engenheiro Informático e de Telecomunicações especializado em desenvolvimento web, redes e sistemas de segurança. Baseado em Nampula, Moçambique.</p>
          <div className="actions">
            <a className="btn btn-primary" href="https://drive.google.com/" target="_blank" rel="noreferrer">Download CV</a>
            <a className="btn btn-secondary" href="#portfolio">Ver Portfólio</a>
            <a className="btn btn-secondary" href="#contato">Contactar</a>
          </div>
          <div className="social-row">
            <a href="https://wa.me/258879562829" target="_blank" rel="noreferrer">WhatsApp</a>
            <a href="mailto:taufiquequimo@gmail.com">Email</a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
          </div>
        </div>

        <aside className="profile-panel reveal">
          <div className="avatar-wrap">
            <img src={profileImg} alt="Foto de perfil de Taufique Quimo" className="profile-photo" />
          </div>
          <article className="floating-card top">🎓 Licenciatura em Eng. Informática</article>
          <article className="floating-card bottom">💼 3+ Anos Experiência</article>
        </aside>
      </section>

      <section className="stats-grid reveal">
        {['5+ Anos Estudo', '3 Empresas', '10+ Projectos', '2 Certificados CISCO'].map((item) => (
          <article className="stat-card" key={item}><strong>{item}</strong><span>Experiência prática</span></article>
        ))}
      </section>

      <section className="content-grid reveal" id="sobre">
        <article className="panel">
          <h2>Sobre mim</h2>
          <ul className="info-list">
            <li><strong>Nome:</strong> Taufique Quimo</li>
            <li><strong>Telefone:</strong> +258 879 562 829</li>
            <li><strong>Email:</strong> taufiquequimo@gmail.com</li>
            <li><strong>Endereço:</strong> Napipine, Nampula, Moçambique</li>
            <li><strong>Formação:</strong> Licenciatura em Eng. Informática e Telecomunicações</li>
            <li><strong>Idiomas:</strong> Português, Inglês, Yao</li>
          </ul>
        </article>

        <article className="panel">
          <h2>Descrição</h2>
          <p>Sou um Engenheiro Informático e de Telecomunicações motivado e dedicado, com experiência sólida em desenvolvimento web, redes e sistemas de segurança. Formado pelo ISEUNA, combino competências técnicas com uma abordagem analítica para resolver problemas complexos.</p>
          <a className="btn btn-primary" href="https://drive.google.com/" target="_blank" rel="noreferrer">Baixar CV →</a>
        </article>
      </section>

      <section className="panel reveal" id="skills">
        <h2>Competências Técnicas</h2>
        <p className="muted">Tecnologias e ferramentas que domino.</p>
        <div className="skills-grid">
          {skills.map((skill) => (
            <article className="skill-card" key={skill.name}>
              <div className="skill-head"><span>{skill.name}</span><strong>{skill.value}%</strong></div>
              <div className="progress-track"><span style={{ width: `${skill.value}%` }} /></div>
            </article>
          ))}
        </div>
        <div className="chip-list">
          {['PHP', 'JavaScript', 'HTML5', 'CSS3', 'Bootstrap', 'MySQL', 'Linux', 'Windows Server', 'Cisco', 'Git', 'CCTV', 'Redes LAN/WAN'].map((tag) => <span key={tag} className="chip">{tag}</span>)}
        </div>
      </section>

      <section className="panel reveal" id="experiencia">
        <h2>Experiência Profissional</h2>
        <div className="timeline">
          {experience.map((item) => (
            <article className="timeline-item" key={item.year + item.company}>
              <span className="timeline-year">{item.year}</span>
              <div className="timeline-card">
                <h3>{item.company}</h3>
                <p className="timeline-role">{item.role}</p>
                <ul>{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="panel reveal" id="formacao">
        <h2>Formação Académica</h2>
        <div className="education-grid">
          {education.map((item) => (
            <article className="education-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel reveal" id="portfolio">
        <div className="section-heading">
          <div>
            <h2>Portfólio</h2>
            <p className="muted">Projectos e soluções desenvolvidas em ambientes reais.</p>
          </div>
          <div className="filter-row">
            {['Todos', 'Web', 'Redes', 'Segurança', 'Sistemas'].map((filter) => (
              <button key={filter} className={`filter-btn ${activeFilter === filter ? 'active' : ''}`} onClick={() => setActiveFilter(filter)} type="button">{filter}</button>
            ))}
          </div>
        </div>
        <div className="project-grid">
          {filteredProjects.map((project) => (
            <article className="project-card" key={project.title}>
              <span className="pill">{project.category}</span>
              <h3>{project.title}</h3>
              <p className="project-tech">{project.tech}</p>
              <p>{project.description}</p>
              <div className="chip-list">{project.tags.map((tag) => <span key={tag} className="chip">{tag}</span>)}</div>
              <a className="btn btn-secondary" href="#contato">Ver Detalhes</a>
            </article>
          ))}
        </div>
      </section>

      <section className="panel reveal" id="servicos">
        <h2>Serviços</h2>
        <div className="project-grid">
          {services.map((service) => (
            <article className="project-card" key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel reveal" id="contato">
        <h2>Contacto</h2>
        <div className="contact-grid">
          <article>
            <p className="muted">Napipine, Nampula, Moçambique</p>
            <p>📞 +258 879 562 829</p>
            <p>✉️ taufiquequimo@gmail.com</p>
            <p>🕐 Disponível: Seg–Sex 08h–18h</p>
            <div className="social-row large">
              <a href="https://wa.me/258879562829" target="_blank" rel="noreferrer">WhatsApp</a>
              <a href="mailto:taufiquequimo@gmail.com">Email</a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
            </div>
          </article>
          <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
            <input type="text" placeholder="Nome" />
            <input type="email" placeholder="Email" />
            <input type="text" placeholder="Assunto" />
            <textarea rows={5} placeholder="Mensagem" />
            <button className="btn btn-primary" type="submit">Enviar Mensagem →</button>
          </form>
        </div>
      </section>

      <a className="whatsapp-fab" href="https://wa.me/258879562829" target="_blank" rel="noreferrer">WhatsApp</a>
    </main>
  )
}

export default App
