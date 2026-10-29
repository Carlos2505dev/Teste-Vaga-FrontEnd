import { useState } from "react"
import { Product } from "../data/storefront"

export function useStorefront() {
  const [cart, setCart] = useState(0)
  const [favorites, setFavorites] = useState(0)
  const [message, setMessage] = useState("")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  function notify(text: string) {
    setMessage(text)
    window.setTimeout(() => setMessage(""), 2600)
  }

  function buy(quantity: number) {
    setCart((value) => value + quantity)
    setSelectedProduct(null)
    notify("Produto adicionado ao carrinho")
  }

  function favorite() {
    setFavorites((value) => value + 1)
    notify("Produto adicionado aos favoritos")
  }

  return {
    cart,
    favorites,
    message,
    selectedProduct,
    setSelectedProduct,
    notify,
    buy,
    favorite,
  }
}