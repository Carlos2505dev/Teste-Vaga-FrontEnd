import productData from "./produtos.json"

export const products = productData.products
export type Product = (typeof products)[number]

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price / 100)