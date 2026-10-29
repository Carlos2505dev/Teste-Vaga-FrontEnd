import { FormEvent, useEffect, useState } from "react"
import { Product, formatPrice } from "../data/storefront"
import { ProductJsonLd, ProductShelf } from "./ProductCatalog"

const A = "/assets"

const categories = [
  { name: "Tecnologia", image: "icon-category-technology.png" },
  { name: "Supermercado", image: "icon-category-supermarket.png" },
  { name: "Bebidas", image: "icon-category-drinks.png" },
  { name: "Ferramentas", image: "icon-category-tools.png" },
  { name: "Saúde", image: "icon-category-health.png" },
  { name: "Esportes e Fitness", image: "icon-category-fitness.png" },
  { name: "Moda", image: "icon-category-fashion.png" },
]

function IconButton({
  src,
  label,
  badge,
  onClick,
}: {
  src: string
  label: string
  badge?: number
  onClick?: () => void
}) {
  return (
    <button className="icon-button" type="button" aria-label={label} onClick={onClick}>
      <img src={`${A}/${src}`} alt="" />
      {!!badge && <span className="badge">{badge}</span>}
    </button>
  )
}

function Header({
  favorites,
  cart,
  onMessage,
}: {
  favorites: number
  cart: number
  onMessage: (message: string) => void
}) {
  const [search, setSearch] = useState("")

  function submitSearch(event: FormEvent) {
    event.preventDefault()
    onMessage(
      search.trim()
        ? `Buscando por “${search.trim()}”`
        : "Digite um produto para buscar",
    )
  }

  return (
    <header className="site-header">
      <ul className="benefits container">
        <li>
          <img src={`${A}/icon-benefit-secure-purchase.svg`} alt="" />
          Compra <strong>100% segura</strong>
        </li>
        <li>
          <img src={`${A}/icon-benefit-free-shipping.svg`} alt="" />
          <strong>Frete grátis</strong> acima de R$ 200
        </li>
        <li>
          <img src={`${A}/icon-benefit-installments.svg`} alt="" />
          <strong>Parcele</strong> suas compras
        </li>
      </ul>

      <div className="header-main container">
        <a href="#inicio" aria-label="Econverse — página inicial">
          <img className="main-logo" src={`${A}/logo-econverse.svg`} alt="Econverse" />
        </a>
        <form className="search" role="search" onSubmit={submitSearch}>
          <input
            type="search"
            name="q"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="O que você está buscando?"
            aria-label="Buscar produtos"
          />
          <button aria-label="Buscar" type="submit">
            <img src={`${A}/icon-search.svg`} alt="" />
          </button>
        </form>
        <div className="header-actions" role="group" aria-label="Ações da conta">
          <IconButton
            src="icon-orders.svg"
            label="Pedidos"
            onClick={() => onMessage("Acompanhe seus pedidos")}
          />
          <IconButton
            src="icon-favorites.svg"
            label="Favoritos"
            badge={favorites}
            onClick={() => onMessage(`${favorites} produto(s) nos favoritos`)}
          />
          <IconButton
            src="icon-account.svg"
            label="Minha conta"
            onClick={() => onMessage("Área do cliente")}
          />
          <IconButton
            src="icon-cart.svg"
            label="Carrinho"
            badge={cart}
            onClick={() => onMessage(`${cart} produto(s) no carrinho`)}
          />
        </div>
      </div>

      <nav className="main-nav container" aria-label="Navegação principal">
        {["Todas Categorias", "Supermercado", "Livros", "Moda", "Lançamentos", "Ofertas do dia"].map(
          (item) => (
            <a
              href="#produtos"
              className={item === "Ofertas do dia" ? "active" : ""}
              key={item}
            >
              {item}
            </a>
          ),
        )}
        <a href="#newsletter" className="subscription">
          <img src={`${A}/icon-subscription.svg`} alt="" />
          Assinatura
        </a>
      </nav>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="inicio">
      <img
        className="hero-image"
        src={`${A}/hero-black-friday.jpg`}
        alt="Loja decorada para a Black Friday"
        fetchPriority="high"
        decoding="async"
      />
      <div className="hero-shade" />
      <div className="hero-content container">
        <h1>Venha conhecer nossas promoções</h1>
        <p>
          <strong>50% Off</strong> nos produtos
        </p>
        <a href="#produtos" className="yellow-button">
          Ver produto
        </a>
      </div>
    </section>
  )
}

function Categories() {
  const [selected, setSelected] = useState("Tecnologia")

  return (
    <section className="categories container" aria-label="Compre por categoria">
      {categories.map((category) => (
        <button
          type="button"
          key={category.name}
          className={selected === category.name ? "category active" : "category"}
          onClick={() => setSelected(category.name)}
          aria-pressed={selected === category.name}
        >
          <span className="category-icon">
            <img src={`${A}/${category.image}`} alt="" loading="lazy" decoding="async" />
          </span>
          <span>{category.name}</span>
        </button>
      ))}
    </section>
  )
}

function ProductModal({
  product,
  onClose,
  onBuy,
}: {
  product: Product
  onClose: () => void
  onBuy: (quantity: number) => void
}) {
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose()
    }

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [onClose])

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        className="product-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-product-name"
      >
        <button
          className="modal-close"
          type="button"
          onClick={onClose}
          aria-label="Fechar detalhes do produto"
        >
          ×
        </button>
        <div className="modal-product-image">
          <img src={product.photo} alt={product.productName} />
        </div>
        <div className="modal-product-info">
          <h2 id="modal-product-name">{product.productName}</h2>
          <strong className="modal-price">{formatPrice(product.price)}</strong>
          <p className="modal-description">
            Many desktop publishing packages and web page editors now many desktop publishing
          </p>
          <a href="#produtos" onClick={onClose}>
            Veja mais detalhes do produto &gt;
          </a>
          <div className="modal-actions">
            <div className="quantity-control" aria-label="Quantidade">
              <button
                type="button"
                aria-label="Diminuir quantidade"
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
              >
                −
              </button>
              <span aria-live="polite">{String(quantity).padStart(2, "0")}</span>
              <button
                type="button"
                aria-label="Aumentar quantidade"
                onClick={() => setQuantity((value) => value + 1)}
              >
                +
              </button>
            </div>
            <button className="modal-buy" type="button" onClick={() => onBuy(quantity)}>
              Comprar
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

function PartnerBanners() {
  return (
    <section className="partner-grid container" aria-label="Parceiros">
      {[0, 1].map((item) => (
        <article className="partner-card" key={item}>
          <img
            src={`${A}/partner-store.jpg`}
            alt="Interior de uma loja parceira"
            loading="lazy"
            decoding="async"
          />
          <div className="partner-shade" />
          <div className="partner-copy">
            <h2>Parceiros</h2>
            <p>Lorem ipsum dolor sit amet, consectetur</p>
            <button className="yellow-button" type="button">
              Confira
            </button>
          </div>
        </article>
      ))}
    </section>
  )
}

function Brands() {
  return (
    <section className="brands container">
      <h2>Navegue por marcas</h2>
      <div className="brand-list">
        {Array.from({ length: 5 }, (_, index) => (
          <button
            type="button"
            className="brand"
            key={index}
            aria-label={`Econverse ${index + 1}`}
          >
            <img
              src={`${A}/logo-econverse-card.svg`}
              alt="Econverse"
              loading="lazy"
              decoding="async"
            />
          </button>
        ))}
      </div>
    </section>
  )
}

function Newsletter({ onMessage }: { onMessage: (message: string) => void }) {
  const [accepted, setAccepted] = useState(false)

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    if (!accepted) {
      onMessage("Aceite os termos e condições para continuar")
      return
    }
    onMessage(`Cadastro realizado para ${data.get("email")}`)
    event.currentTarget.reset()
    setAccepted(false)
  }

  return (
    <section className="newsletter" id="newsletter">
      <div className="container newsletter-inner">
        <div>
          <h2>Inscreva-se na nossa newsletter</h2>
          <p>
            Assine a nossa newsletter e receba as novidades e conteúdos
            exclusivos da Econverse.
          </p>
        </div>
        <form onSubmit={submit}>
          <div className="newsletter-fields">
            <input
              required
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Digite seu nome"
              aria-label="Nome"
            />
            <input
              required
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Digite seu e-mail"
              aria-label="E-mail"
            />
            <button type="submit">Inscrever</button>
          </div>
          <label>
            <input
              type="checkbox"
              checked={accepted}
              onChange={(event) => setAccepted(event.target.checked)}
            />
            Aceito os termos e condições
          </label>
        </form>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer>
      <div className="footer-main">
        <div className="container footer-inner">
          <div className="footer-about">
            <img src={`${A}/logo-econverse-white.svg`} alt="Econverse" />
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <ul className="socials">
              <li>
                <a href="#" aria-label="Instagram">
                  <img src={`${A}/icon-instagram.svg`} alt="" />
                </a>
              </li>
              <li>
                <a href="#" aria-label="Facebook">
                  <img src={`${A}/icon-facebook.svg`} alt="" />
                </a>
              </li>
              <li>
                <a href="#" aria-label="LinkedIn">
                  <img src={`${A}/icon-linkedin.svg`} alt="" />
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-divider" />
          <nav className="footer-links" aria-label="Links do rodapé">
            <div>
              <h3>Institucional</h3>
              <a href="#">Sobre Nós</a>
              <a href="#">Movimento</a>
              <a href="#">Trabalhe conosco</a>
            </div>
            <div>
              <h3>Ajuda</h3>
              <a href="#">Suporte</a>
              <a href="#">Fale Conosco</a>
              <a href="#">Perguntas Frequentes</a>
            </div>
            <div>
              <h3>Termos</h3>
              <a href="#">Termos e Condições</a>
              <a href="#">Política de Privacidade</a>
              <a href="#">Troca e Devolução</a>
            </div>
          </nav>
        </div>
      </div>
      <p className="copyright">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
    </footer>
  )
}

export default function StorefrontPage({
  cart,
  favorites,
  message,
  selectedProduct,
  onMessage,
  onFavorite,
  onSelect,
  onClose,
  onBuy,
}: {
  cart: number
  favorites: number
  message: string
  selectedProduct: Product | null
  onMessage: (message: string) => void
  onFavorite: () => void
  onSelect: (product: Product) => void
  onClose: () => void
  onBuy: (quantity: number) => void
}) {
  return (
    <div className="page">
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo principal
      </a>
      <Header favorites={favorites} cart={cart} onMessage={onMessage} />
      <main id="conteudo" tabIndex={-1}>
        <Hero />
        <Categories />
        <ProductShelf
          title="Produtos relacionados"
          shelfId="produtos"
          showTabs
          onSelect={onSelect}
          onFavorite={onFavorite}
        />
        <PartnerBanners />
        <ProductShelf
          title="Mais vendidos"
          shelfId="mais-vendidos"
          onSelect={onSelect}
          onFavorite={onFavorite}
        />
        <PartnerBanners />
        <Brands />
        <ProductShelf
          title="Ofertas do dia"
          shelfId="ofertas-do-dia"
          onSelect={onSelect}
          onFavorite={onFavorite}
        />
        <ProductJsonLd />
        <Newsletter onMessage={onMessage} />
      </main>
      <Footer />
      {message && (
        <div className="toast" role="status">
          {message}
        </div>
      )}
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={onClose} onBuy={onBuy} />
      )}
    </div>
  )
}