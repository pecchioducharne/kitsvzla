import { useEffect, useRef, useState } from 'react'
import heroStreet from './assets/hero-street.jpg'
import heroStreet2 from './assets/hero-2.jpg'
import heroVideo1 from './assets/hero-video-1.mp4'
import heroVideo2 from './assets/hero-video-2.mp4'
import heroVideo3 from './assets/hero-video-3.mp4'
import mascot from './assets/kitsvzla-mascot-icon.png'
import { GOAL, IMPACT, KITS, PAY_METHODS } from './data'
import { LangContext, useLang } from './i18n'
import {
  BagIcon,
  BoxesIcon,
  CheckIcon,
  CopyIcon,
  ExternalLinkIcon,
  HeartIcon,
  InstagramIcon,
} from './icons'

const INSTAGRAM_URL = 'https://www.instagram.com/kitsvzla'
const PAYPAL_URL = 'https://www.paypal.com/pool/9qnYFaMCCZ?sr=ancr'

function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('kitsvzla-lang')
      if (saved === 'es' || saved === 'en') return saved
    }
    return 'es'
  })

  useEffect(() => {
    window.localStorage.setItem('kitsvzla-lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>
}

// Renders whichever language is currently active. Keeps both texts co-located
// in the JSX so content stays easy to edit.
function T({ es, en }) {
  const { lang } = useLang()
  return <>{lang === 'en' ? en : es}</>
}

function LangToggle() {
  const { lang, setLang } = useLang()
  return (
    <div className="lang-toggle" role="group" aria-label="Idioma / Language">
      <button
        type="button"
        className={lang === 'es' ? 'is-active' : ''}
        onClick={() => setLang('es')}
        aria-pressed={lang === 'es'}
      >
        ES
      </button>
      <button
        type="button"
        className={lang === 'en' ? 'is-active' : ''}
        onClick={() => setLang('en')}
        aria-pressed={lang === 'en'}
      >
        EN
      </button>
    </div>
  )
}

function CopyButton({ value }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // clipboard unavailable — nothing to do
    }
  }

  return (
    <button
      type="button"
      className="copy-btn"
      onClick={handleCopy}
      aria-label={copied ? 'Copiado' : `Copiar ${value}`}
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
    </button>
  )
}

const HERO_SLIDES = [
  { type: 'image', src: heroStreet },
  { type: 'video', src: heroVideo1 },
  { type: 'image', src: heroStreet2 },
  { type: 'video', src: heroVideo2 },
  { type: 'video', src: heroVideo3 },
]
const HERO_IMAGE_DURATION = 4500

// Gallery media. To add more, drop files in src/assets, import them above,
// and add an entry here. Captions are optional.
const GALLERY_ITEMS = [
  { type: 'image', src: heroStreet, es: 'En las calles de Caracas', en: 'On the streets of Caracas' },
  { type: 'video', src: heroVideo1, es: 'Armando los bultos', en: 'Packing the bags' },
  { type: 'image', src: heroStreet2, es: 'Entregas en La Guaira', en: 'Deliveries in La Guaira' },
  { type: 'video', src: heroVideo2, es: 'Voluntarios en acción', en: 'Volunteers in action' },
  { type: 'video', src: heroVideo3, es: 'Llevando ayuda directa', en: 'Bringing help directly' },
]

function HeroMedia() {
  const [active, setActive] = useState(0)
  const videoRefs = useRef([])

  useEffect(() => {
    const slide = HERO_SLIDES[active]
    if (slide.type === 'image') {
      const timer = setTimeout(() => {
        setActive((i) => (i + 1) % HERO_SLIDES.length)
      }, HERO_IMAGE_DURATION)
      return () => clearTimeout(timer)
    }

    const video = videoRefs.current[active]
    if (video) {
      video.currentTime = 0
      video.play().catch(() => {})
    }
    return undefined
  }, [active])

  const handleVideoEnded = () => {
    setActive((i) => (i + 1) % HERO_SLIDES.length)
  }

  return (
    <figure className="hero-photo">
      {HERO_SLIDES.map((slide, i) =>
        slide.type === 'image' ? (
          <img
            key={slide.src}
            src={slide.src}
            alt=""
            className={`hero-slide ${i === active ? 'is-active' : ''}`}
          />
        ) : (
          <video
            key={slide.src}
            ref={(el) => {
              videoRefs.current[i] = el
            }}
            src={slide.src}
            className={`hero-slide ${i === active ? 'is-active' : ''}`}
            muted
            playsInline
            onEnded={i === active ? handleVideoEnded : undefined}
          />
        ),
      )}
    </figure>
  )
}

function Stitch() {
  return (
    <div className="wrap">
      <div className="stitch" />
    </div>
  )
}

function Nav() {
  return (
    <nav>
      <div className="wrap">
        <div className="brand">
          <img src={mascot} alt="" className="brand-mark" />
          kitsvzla
        </div>
        <div className="nav-links">
          <a href="#impacto">
            <T es="Impacto" en="Impact" />
          </a>
          <a href="#quienes">
            <T es="Quiénes somos" en="About us" />
          </a>
          <a href="#kits">
            <T es="Los kits" en="The kits" />
          </a>
          <a href="#galeria">
            <T es="Galería" en="Gallery" />
          </a>
          <a href="#donar">
            <T es="Donar" en="Donate" />
          </a>
          <LangToggle />
          <a className="nav-cta" href={INSTAGRAM_URL} target="_blank" rel="noopener">
            Instagram
          </a>
        </div>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <header className="hero">
      <div className="wrap hero-grid">
        <div className="hero-text">
          <div className="eyebrow">
            <span className="dot" /> @kitsvzla · Caracas &amp; La Guaira
          </div>
          <h1>
            <T
              es="Ayuda que camina directo a quien la necesita"
              en="Relief that walks straight to the people who need it"
            />
          </h1>

          <p className="hero-body">
            <T
              es="Somos un grupo de familia, amigos y voluntarios en Venezuela armando y entregando kits de ayuda para pacientes en hospitales y familias en refugios afectados por el terremoto."
              en="We're a group of family, friends and volunteers in Venezuela putting together and delivering relief kits for hospital patients and families in shelters affected by the earthquake."
            />
          </p>

          <div className="btn-row">
            <a className="btn btn-primary" href={INSTAGRAM_URL} target="_blank" rel="noopener">
              <InstagramIcon />
              <T es="Síguenos en Instagram" en="Follow us on Instagram" />
            </a>
            <a className="btn btn-secondary" href="#donar">
              <T es="Quiero ayudar" en="I want to help" />
            </a>
          </div>
        </div>

        <HeroMedia />
      </div>
    </header>
  )
}

function Impacto() {
  const pct = GOAL.target > 0 ? Math.min(100, Math.round((GOAL.raised / GOAL.target) * 100)) : 0
  const fmt = (n) => `${GOAL.currency}${n.toLocaleString('en-US')}`

  return (
    <section id="impacto">
      <div className="wrap">
        <div className="section-head">
          <div className="section-tag">
            <T es="Nuestro impacto" en="Our impact" />
          </div>
          <h2>
            <T es="Lo que logramos juntos" en="What we achieve together" />
          </h2>
        </div>

        <div className="goal-card">
          <div className="goal-head">
            <span className="goal-title">
              🎯 <T es="Meta de recaudación" en="Fundraising goal" />
            </span>
            <span className="goal-amounts">
              {fmt(GOAL.raised)} <span className="goal-target">/ {fmt(GOAL.target)}</span>
            </span>
          </div>
          <div
            className="goal-bar"
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div className="goal-fill" style={{ width: `${pct}%` }} />
          </div>
          <div className="goal-foot">
            <span className="goal-pct">{pct}%</span>
            <span className="goal-note">
              <T es={GOAL.note.es} en={GOAL.note.en} />
            </span>
          </div>
        </div>

        <div className="stat-grid">
          {IMPACT.stats.map((stat) => (
            <div className="stat-card" key={stat.es}>
              <span className="stat-emoji">{stat.emoji}</span>
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">
                <T es={stat.es} en={stat.en} />
              </span>
            </div>
          ))}
        </div>

        {IMPACT.sheetUrl && (
          <a className="sheet-link" href={IMPACT.sheetUrl} target="_blank" rel="noopener">
            <T es="Ver el detalle completo" en="See the full breakdown" />
            <ExternalLinkIcon />
          </a>
        )}
      </div>
    </section>
  )
}

function QuienesSomos() {
  return (
    <section id="quienes">
      <div className="wrap">
        <div className="section-head">
          <div className="section-tag">
            <T es="Quiénes somos" en="Who we are" />
          </div>
          <h2>
            <T es="No somos una fundación oficial" en="We are not an official foundation" />
          </h2>
        </div>

        <div className="who-grid">
          <div className="who-text">
            <p>
              <T
                es="Kitsvzla nació de forma espontánea, entre familia y amigos, apenas ocurrió el terremoto que afectó a Caracas y La Guaira. No tenemos estructura legal, oficina ni nómina — somos un grupo de voluntarios en Venezuela armando bultos con nuestras propias manos y entregándolos directamente, sin intermediarios."
                en="Kitsvzla started spontaneously, among family and friends, right after the earthquake that hit Caracas and La Guaira. We have no legal structure, no office, no payroll — just a group of volunteers in Venezuela packing bags with our own hands and delivering them directly, with no middlemen."
              />
            </p>
            <p>
              <T
                es="Lo hacemos porque es nuestra gente y nuestra tierra. Cuando ves la necesidad de cerca, no puedes mirar para otro lado. Cada bulto es nuestra forma de decir: no estás solo."
                en="We do this because it's our people and our home. Once you see the need up close, you can't look away. Every bag is our way of saying: you're not alone."
              />
            </p>
          </div>

          <div className="who-side">
            <div className="badge-card">
              <h3>
                🤝 <T es="Somos voluntarios" en="We're volunteers" />
              </h3>
              <p>
                <T
                  es="Sin fines de lucro, sin registro formal. Solo personas que decidieron ayudar."
                  en="Non-profit, no formal registration. Just people who decided to help."
                />
              </p>
            </div>
            <div className="badge-card">
              <h3>
                📍 <T es="Basados en Venezuela" en="Based in Venezuela" />
              </h3>
              <p>
                <T
                  es="Coordinamos, compramos y entregamos desde adentro, cerca de quienes lo necesitan."
                  en="We coordinate, buy and deliver from within, close to those who need it."
                />
              </p>
            </div>
            <div className="badge-card">
              <h3>
                👐 <T es="Entrega directa" en="Direct delivery" />
              </h3>
              <p>
                <T
                  es="Nosotros mismos llevamos cada bulto a hospitales y refugios, sin intermediarios."
                  en="We personally take each bag to hospitals and shelters, with no middlemen."
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function QueHacemos() {
  return (
    <section id="que-hacemos">
      <div className="wrap">
        <div className="section-head">
          <div className="section-tag">
            <T es="Qué hacemos y por qué" en="What we do & why" />
          </div>
          <h2>
            <T es="Empezamos por el morral" en="We start with the backpack itself" />
          </h2>
        </div>

        <div className="reason-grid">
          <div className="reason-card">
            <div className="icon">
              <BagIcon />
            </div>
            <h3>
              <T es="Qué hacemos" en="What we do" />
            </h3>
            <p>
              <T
                es="Armamos bultos con artículos de higiene, emergencia y otros esenciales para pacientes en hospitales y familias en refugios en Caracas y La Guaira. Muchas personas lo perdieron todo y hoy no tienen ni siquiera dónde guardar lo poco que reciben."
                en="We put together bags with hygiene, emergency, and other essential items for hospital patients and families in shelters across Caracas and La Guaira. Many people lost everything and don't even have anywhere to carry what little they receive."
              />
            </p>
          </div>

          <div className="reason-card">
            <div className="icon">
              <HeartIcon />
            </div>
            <h3>
              <T es="Por qué lo hacemos" en="Why we do it" />
            </h3>
            <p>
              <T
                es="Porque es nuestra gente. Trabajamos con centros de acopio y organizaciones que ya están en terreno, y llenamos un vacío puntual: darle a cada persona un morral propio para transportar lo que va recibiendo."
                en="Because these are our people. We work alongside collection centers and organizations already on the ground, filling one specific gap: giving each person their own bag to carry what they receive."
              />
            </p>
          </div>
        </div>

        <div className="belonging">
          <div className="icon">
            <HeartIcon />
          </div>
          <div>
            <h3>
              <T es="Algo que vuelve a ser suyo" en="Something that's theirs again" />
            </h3>
            <p>
              <T
                es="Cuando alguien lo ha perdido todo, un bulto propio es más que insumos: es la sensación de volver a tener algo que le pertenece. Un espacio suyo para guardar lo poco que va recibiendo, y un recordatorio de que sigue siendo dueño de su propia historia."
                en="When someone has lost everything, a bag of their own is more than supplies — it's the feeling of having something that belongs to them again. A small space that's theirs, and a reminder that they still hold their own story."
              />
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Kits() {
  const { lang } = useLang()

  return (
    <section id="kits" className="kits-bg">
      <div className="wrap">
        <div className="section-head">
          <div className="section-tag">
            <T es="Qué llevan los bultos" en="What's in the bags" />
          </div>
          <h2>
            <T
              es="Armamos cada kit según la necesidad"
              en="We build each kit around what's actually needed"
            />
          </h2>
        </div>

        <div className="kits-intro">
          <p>
            <T
              es="Estos son los insumos con los que trabajamos y que pedimos en donación. Armamos dos tipos de bulto — el Kit Familiar y el Kit para Niños — combinando artículos de estas categorías según lo que necesite cada persona o familia."
              en="These are the supplies we work with and ask for as donations. We put together two types of bag — the Family Kit and the Kids Kit — combining items from these categories depending on what each person or family needs."
            />
          </p>
        </div>

        {KITS.map((kit) => (
          <div key={kit.key} className="kit-group">
            <h3 className="kit-group-title">
              <T es={kit.name} en={kit.nameEn} />
            </h3>
            <div className="kit-grid">
              {kit.categories.map((cat) => (
                <div key={cat.key} className={`kit-card kit-${cat.key}`}>
                  <span className="tag">
                    {cat.emoji} <T es={cat.es} en={cat.en} />
                  </span>
                  <ul>
                    {cat.items.map((item) => (
                      <li key={item.es}>{lang === 'en' ? item.en : item.es}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Galeria() {
  const { lang } = useLang()

  return (
    <section id="galeria">
      <div className="wrap">
        <div className="section-head">
          <div className="section-tag">
            <T es="Galería" en="Gallery" />
          </div>
          <h2>
            <T es="Fotos y videos de la misión" en="Photos & videos from the mission" />
          </h2>
        </div>

        <div className="media-grid">
          {GALLERY_ITEMS.map((item) => {
            const caption = lang === 'en' ? item.en : item.es
            return (
              <figure className="media-item" key={item.src}>
                {item.type === 'image' ? (
                  <img src={item.src} alt={caption || ''} loading="lazy" />
                ) : (
                  <video src={item.src} controls muted playsInline preload="metadata" />
                )}
                {caption && <figcaption>{caption}</figcaption>}
              </figure>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Donar() {
  const { lang } = useLang()

  return (
    <section id="donar">
      <div className="wrap">
        <div className="section-head">
          <div className="section-tag">
            <T es="Cómo ayudar" en="How to help" />
          </div>
          <h2>
            <T es="Cada aporte se convierte en un bulto" en="Every contribution becomes a backpack" />
          </h2>
        </div>

        <div className="donate-grid">
          {PAY_METHODS.map((pay) =>
            pay.url ? (
              <a className="pay-card" key={pay.method} href={pay.url} target="_blank" rel="noopener">
                <span className="flag">{pay.flag}</span>
                <span className="method">
                  {pay.method}
                  <ExternalLinkIcon />
                </span>
                <span className="detail">
                  {lang === 'en' && pay.detailEn ? pay.detailEn : pay.detail}
                </span>
              </a>
            ) : (
              <div className="pay-card" key={pay.method}>
                <span className="flag">{pay.flag}</span>
                <span className="method">{pay.method}</span>
                <span className="detail detail-row">
                  <span className="detail-value">{pay.detail}</span>
                  {pay.copy && <CopyButton value={pay.copy} />}
                </span>
                {pay.detail2 && (
                  <span className="detail detail-row">
                    <span className="detail-value">{pay.detail2}</span>
                    {pay.copy2 && <CopyButton value={pay.copy2} />}
                  </span>
                )}
                {pay.name && <span className="account-name">{pay.name}</span>}
              </div>
            ),
          )}
          <a className="pay-card" href={PAYPAL_URL} target="_blank" rel="noopener">
            <span className="flag">🌎</span>
            <span className="method">
              PayPal
              <ExternalLinkIcon />
            </span>
            <span className="detail">
              <T es="Donar por PayPal" en="Donate via PayPal" />
            </span>
          </a>
        </div>

        <div className="donate-note">
          <strong>
            <T
              es="¿Prefieres donar insumos en vez de dinero?"
              en="Prefer donating supplies instead of money?"
            />
          </strong>{' '}
          <T
            es="Escríbenos por Instagram y te decimos qué hace falta y dónde entregarlo."
            en="Message us on Instagram and we'll tell you what's needed and where to drop it off."
          />
        </div>

        <div className="items-note">
          <div className="icon">
            <BoxesIcon />
          </div>
          <div>
            <p>
              <T
                es="También puedes donar bultos (morrales) directamente, o cualquiera de los artículos de las listas de arriba. Cada donación, sin importar el tamaño, se convierte en un kit completo para alguien que lo necesita."
                en="You can also donate backpacks directly, or any of the items from the lists above. Every donation, no matter the size, becomes a complete kit for someone who needs it."
              />
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer id="contacto">
      <div className="wrap">
        <div className="contact-box">
          <h2>
            <T es="Síguenos, escríbenos, súmate" en="Follow us, message us, join in" />
          </h2>
          <div className="btn-row">
            <a className="btn btn-primary" href={INSTAGRAM_URL} target="_blank" rel="noopener">
              <InstagramIcon />
              <T es="@kitsvzla en Instagram" en="@kitsvzla on Instagram" />
            </a>
          </div>
        </div>

        <div className="foot-bottom">
          <span>kitsvzla · Caracas &amp; La Guaira, Venezuela</span>
          <span>
            <T es="Hecho con" en="Made with" /> <span className="heart">♥</span>{' '}
            <T es="por familia, amigos y voluntarios" en="by family, friends and volunteers" />
          </span>
        </div>
      </div>
    </footer>
  )
}

function App() {
  return (
    <LanguageProvider>
      <Nav />
      <Hero />
      <Stitch />
      <Impacto />
      <Stitch />
      <QuienesSomos />
      <Stitch />
      <QueHacemos />
      <Stitch />
      <Kits />
      <Stitch />
      <Galeria />
      <Stitch />
      <Donar />
      <Footer />
    </LanguageProvider>
  )
}

export default App
