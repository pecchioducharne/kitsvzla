import { useEffect, useRef, useState } from 'react'
import heroStreet from './assets/hero-street.jpg'
import heroStreet2 from './assets/hero-2.jpg'
import heroVideo1 from './assets/hero-video-1.mp4'
import heroVideo2 from './assets/hero-video-2.mp4'
import heroVideo3 from './assets/hero-video-3.mp4'
import mascot from './assets/kitsvzla-mascot-icon.png'
import { KITS, PAY_METHODS } from './data'
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
          <a href="#quienes">Quiénes somos</a>
          <a href="#kits">Los kits</a>
          <a href="#donar">Donar</a>
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
          <h1>Ayuda que camina directo a quien la necesita</h1>
          <span className="en">Relief that walks straight to the people who need it.</span>

          <p className="hero-body">
            Somos un grupo de familia, amigos y voluntarios en Venezuela armando y entregando kits
            de ayuda para pacientes en hospitales y familias en refugios afectados por el
            terremoto.
          </p>
          <p className="hero-body en-body">
            We're a group of family, friends and volunteers in Venezuela putting together and
            delivering relief kits for hospital patients and families in shelters affected by the
            earthquake.
          </p>

          <div className="btn-row">
            <a className="btn btn-primary" href={INSTAGRAM_URL} target="_blank" rel="noopener">
              <InstagramIcon />
              Síguenos en Instagram
            </a>
            <a className="btn btn-secondary" href="#donar">
              Quiero ayudar / I want to help
            </a>
          </div>
        </div>

        <HeroMedia />
      </div>
    </header>
  )
}

function QuienesSomos() {
  return (
    <section id="quienes">
      <div className="wrap">
        <div className="section-head">
          <div className="section-tag">Quiénes somos · Who we are</div>
          <h2>No somos una fundación oficial</h2>
          <span className="en">We are not an official foundation.</span>
        </div>

        <div className="who-grid">
          <div className="who-text">
            <p>
              Kitsvzla nació de forma espontánea, entre familia y amigos, apenas ocurrió el
              terremoto que afectó a Caracas y La Guaira. No tenemos estructura legal, oficina ni
              nómina — somos un grupo de voluntarios en Venezuela armando bultos con nuestras
              propias manos y entregándolos directamente, sin intermediarios.
            </p>
            <p className="en">
              Kitsvzla started spontaneously, among family and friends, right after the earthquake
              that hit Caracas and La Guaira. We have no legal structure, no office, no payroll —
              just a group of volunteers in Venezuela packing bags with our own hands and
              delivering them directly, with no middlemen.
            </p>

            <p>
              Lo hacemos porque es nuestra gente y nuestra tierra. Cuando ves la necesidad de
              cerca, no puedes mirar para otro lado. Cada bulto es nuestra forma de decir: no
              estás solo.
            </p>
            <p className="en">
              We do this because it's our people and our home. Once you see the need up close, you
              can't look away. Every bag is our way of saying: you're not alone.
            </p>
          </div>

          <div className="who-side">
            <div className="badge-card">
              <h3>🤝 Somos voluntarios</h3>
              <p>Sin fines de lucro, sin registro formal. Solo personas que decidieron ayudar.</p>
            </div>
            <div className="badge-card">
              <h3>📍 Basados en Venezuela</h3>
              <p>Coordinamos, compramos y entregamos desde adentro, cerca de quienes lo necesitan.</p>
            </div>
            <div className="badge-card">
              <h3>👐 Entrega directa</h3>
              <p>Nosotros mismos llevamos cada bulto a hospitales y refugios, sin intermediarios.</p>
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
          <div className="section-tag">Qué hacemos y por qué</div>
          <h2>Empezamos por el morral</h2>
          <span className="en">We start with the backpack itself.</span>
        </div>

        <div className="reason-grid">
          <div className="reason-card">
            <div className="icon">
              <BagIcon />
            </div>
            <h3>Qué hacemos</h3>
            <p>
              Armamos bultos con artículos de higiene, emergencia y otros esenciales para
              pacientes en hospitales y familias en refugios en Caracas y La Guaira. Muchas
              personas lo perdieron todo y hoy no tienen ni siquiera dónde guardar lo poco que
              reciben.
            </p>
            <p className="en">
              We put together bags with hygiene, emergency, and other essential items for hospital
              patients and families in shelters across Caracas and La Guaira. Many people lost
              everything and don't even have anywhere to carry what little they receive.
            </p>
          </div>

          <div className="reason-card">
            <div className="icon">
              <HeartIcon />
            </div>
            <h3>Por qué lo hacemos</h3>
            <p>
              Porque es nuestra gente. Trabajamos con centros de acopio y organizaciones que ya
              están en terreno, y llenamos un vacío puntual: darle a cada persona un morral propio
              para transportar lo que va recibiendo.
            </p>
            <p className="en">
              Because these are our people. We work alongside collection centers and organizations
              already on the ground, filling one specific gap: giving each person their own bag to
              carry what they receive.
            </p>
          </div>
        </div>

        <div className="belonging">
          <div className="icon">
            <HeartIcon />
          </div>
          <div>
            <h3>Algo que vuelve a ser suyo</h3>
            <p>
              Cuando alguien lo ha perdido todo, un bulto propio es más que insumos: es la
              sensación de volver a tener algo que le pertenece. Un espacio suyo para guardar lo
              poco que va recibiendo, y un recordatorio de que sigue siendo dueño de su propia
              historia.
            </p>
            <p className="en">
              When someone has lost everything, a bag of their own is more than supplies — it's the
              feeling of having something that belongs to them again. A small space that's theirs,
              and a reminder that they still hold their own story.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Kits() {
  return (
    <section id="kits" className="kits-bg">
      <div className="wrap">
        <div className="section-head">
          <div className="section-tag">Qué llevan los bultos</div>
          <h2>Armamos cada kit según la necesidad</h2>
          <span className="en">We build each kit around what's actually needed.</span>
        </div>

        <div className="kits-intro">
          <p>
            Estos son los insumos con los que trabajamos y que pedimos en donación. Armamos dos
            tipos de bulto — el Kit Familiar y el Kit para Niños — combinando artículos de estas
            categorías según lo que necesite cada persona o familia.
          </p>
          <p className="en">
            These are the supplies we work with and ask for as donations. We put together two
            types of bag — the Family Kit and the Kids Kit — combining items from these
            categories depending on what each person or family needs.
          </p>
        </div>

        {KITS.map((kit) => (
          <div key={kit.key} className="kit-group">
            <h3 className="kit-group-title">
              {kit.name} <span className="en">{kit.nameEn}</span>
            </h3>
            <div className="kit-grid">
              {kit.categories.map((cat) => (
                <div key={cat.key} className={`kit-card kit-${cat.key}`}>
                  <span className="tag">{cat.tag}</span>
                  <h3>{cat.title}</h3>
                  <ul>
                    {cat.items.map((item) => (
                      <li key={item.es}>{item.es}</li>
                    ))}
                  </ul>
                  <ul className="kit-card-list-en">
                    {cat.items.map((item) => (
                      <li key={item.en} className="en">
                        {item.en}
                      </li>
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

function Donar() {
  return (
    <section id="donar">
      <div className="wrap">
        <div className="section-head">
          <div className="section-tag">Cómo ayudar · How to help</div>
          <h2>Cada aporte se convierte en un bulto</h2>
          <span className="en">Every contribution becomes a backpack in someone's hands.</span>
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
                <span className="detail">{pay.detail}</span>
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
            <span className="detail">Donar por PayPal · Donate</span>
          </a>
        </div>

        <div className="donate-note">
          <strong>¿Prefieres donar insumos en vez de dinero?</strong> Escríbenos por Instagram y te
          decimos qué hace falta y dónde entregarlo.
          <br />
          <br />
          <strong className="en" style={{ color: 'var(--purple)', opacity: 1 }}>
            Prefer donating supplies instead of money?
          </strong>{' '}
          <span className="en">
            Message us on Instagram and we'll tell you what's needed and where to drop it off.
          </span>
        </div>

        <div className="items-note">
          <div className="icon">
            <BoxesIcon />
          </div>
          <div>
            <p>
              También puedes donar bultos (morrales) directamente, o cualquiera de los artículos
              de las listas de arriba. Cada donación, sin importar el tamaño, se convierte en un
              kit completo para alguien que lo necesita.
            </p>
            <p className="en">
              You can also donate backpacks directly, or any of the items from the lists above.
              Every donation, no matter the size, becomes a complete kit for someone who needs it.
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
          <h2>Síguenos, escríbenos, súmate</h2>
          <span className="en">Follow us, message us, join in.</span>
          <div className="btn-row">
            <a className="btn btn-primary" href={INSTAGRAM_URL} target="_blank" rel="noopener">
              <InstagramIcon />
              @kitsvzla en Instagram
            </a>
          </div>
        </div>

        <div className="foot-bottom">
          <span>kitsvzla · Caracas &amp; La Guaira, Venezuela</span>
          <span>
            Hecho con <span className="heart">♥</span> por familia, amigos y voluntarios
          </span>
        </div>
      </div>
    </footer>
  )
}

function App() {
  return (
    <>
      <Nav />
      <Hero />
      <Stitch />
      <QuienesSomos />
      <Stitch />
      <QueHacemos />
      <Stitch />
      <Kits />
      <Stitch />
      <Donar />
      <Footer />
    </>
  )
}

export default App
