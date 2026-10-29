import StorefrontPage from "./components/StorefrontPage"
import { useStorefront } from "./hooks/useStorefront"

export default function App() {
  const {
    cart,
    favorites,
    message,
    selectedProduct,
    setSelectedProduct,
    notify,
    buy,
    favorite,
  } = useStorefront()

  return (
    <StorefrontPage
      cart={cart}
      favorites={favorites}
      message={message}
      selectedProduct={selectedProduct}
      onMessage={notify}
      onFavorite={favorite}
      onSelect={setSelectedProduct}
      onClose={() => setSelectedProduct(null)}
      onBuy={buy}
    />
  )
}