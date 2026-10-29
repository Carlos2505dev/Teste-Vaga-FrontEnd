import { useState } from "react"
import { formatPrice, Product, products } from "../data/storefront"

const A = "/assets"
const tabs = ["Celular", "Acessórios", "Tablets", "Notebooks", "TVs", "Ver todos"]

export function ProductJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Produtos em destaque",
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: product.productName,
        description: product.descriptionShort,
        image: product.photo,
        offers: {
          "@type": "Offer",
          price: (product.price / 100).toFixed(2),
          priceCurrency: "BRL",
          availability: "https://schema.org/InStock",
        },
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

function SectionTitle({
  children,
  showViewAll = true,
}: {
  children: string
  showViewAll?: boolean
}) {
  return (
    <div className="section-heading">
      <span />
      <h2>{children}</h2>
      <span />
      {showViewAll && <a href="#produtos">Ver todos</a>}
    </div>
  )
}

function ProductCard({
  product,
  onFavorite,
  onSelect,
}: {
  product: Product
  onFavorite: () => void
  onSelect: (product: Product) => void
}) {
  return (
    <article className="product-card">
      <button
        className="favorite-product"
        type="button"
        onClick={onFavorite}
        aria-label={`Favoritar ${product.productName}`}
      >
        <span aria-hidden="true">♡</span>
      </button>
      <button
        className="product-open"
        type="button"
        onClick={() => onSelect(product)}
        aria-label={`Ver detalhes de ${product.productName}`}
      >
        <img
          className="product-image"
          src={product.photo}
          alt={product.productName}
          loading="lazy"
          decoding="async"
        />
        <span className="product-name" role="heading" aria-level={3}>
          {product.descriptionShort}
        </span>
        <del className="old-price">R$ 30,90</del>
        <data className="price" value={(product.price / 100).toFixed(2)}>
          {formatPrice(product.price)}
        </data>
        <span className="installments">
          ou 2x de {formatPrice(Math.round(product.price / 2))} sem juros
        </span>
        <span className="shipping">Frete grátis</span>
      </button>
      <button
        className="buy-button"
        type="button"
        onClick={() => onSelect(product)}
      >
        Comprar
      </button>
    </article>
  )
}

export function ProductShelf({
  title = "Produtos relacionados",
  shelfId = "produtos",
  showTabs = false,
  showViewAll = true,
  onFavorite,
  onSelect,
}: {
  title?: string
  shelfId?: string
  showTabs?: boolean
  showViewAll?: boolean
  onFavorite: () => void
  onSelect: (product: Product) => void
}) {
  const [activeTab, setActiveTab] = useState("Celular")
  const [page, setPage] = useState(0)
  const pageCount = Math.ceil(products.length / 4)
  const visible = products.slice(page * 4, page * 4 + 4)

  return (
    <section className="product-section" id={shelfId} aria-label={title}>
      <div className="container">
        <SectionTitle showViewAll={showViewAll}>{title}</SectionTitle>
        {showTabs && (
          <div className="tabs" role="tablist" aria-label="Tipos de produto">
            {tabs.map((tab) => (
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === tab}
                className={activeTab === tab ? "active" : ""}
                onClick={() => setActiveTab(tab)}
                key={tab}
              >
                {tab}
              </button>
            ))}
          </div>
        )}
        <div className="shelf">
          <button
            className="carousel-arrow left"
            type="button"
            onClick={() => setPage((value) => (value - 1 + pageCount) % pageCount)}
            aria-label="Produtos anteriores"
          >
            <img src={`${A}/icon-carousel-left.svg`} alt="" />
          </button>
          <div className="product-grid">
            {visible.map((product, index) => (
              <ProductCard
                key={`${product.productName}-${index + page * 4}`}
                product={product}
                onFavorite={onFavorite}
                onSelect={onSelect}
              />
            ))}
          </div>
          <button
            className="carousel-arrow right"
            type="button"
            onClick={() => setPage((value) => (value + 1) % pageCount)}
            aria-label="Próximos produtos"
          >
            <img src={`${A}/icon-carousel-right.svg`} alt="" />
          </button>
        </div>
      </div>
    </section>
  )
}