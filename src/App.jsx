import { useState, useEffect } from 'react'
import { usePixel } from './hooks/usePixel'
import Header from './components/Header'
import Hero from './components/Hero'
import Products from './components/Products'
import CartModal from './components/CartModal'
import CheckoutModal from './components/CheckoutModal'
import Sections from './components/Sections'

const PIXEL_ID = '7071675013144936448'

export default function App() {
  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)

  const { fire } = usePixel(PIXEL_ID)

  useEffect(() => {
    fire('ViewContent', {
      content_id: 'home',
      content_name: 'ZTech Homepage',
      content_type: 'product',
    })
  }, [])

  const handleCheckout = () => {
    setShowCart(false)
    setShowCheckout(true)
    fire('InitiateCheckout', {
      value: cart.reduce((s, i) => s + i.price * i.qty, 0),
      currency: 'VND',
      contents: cart.map(i => ({ id: i.id, quantity: i.qty })),
    })
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header fire={fire} cart={cart} onCartOpen={() => setShowCart(true)} />

      <main>
        <Hero fire={fire} />
        <Products fire={fire} cart={cart} setCart={setCart} wishlist={wishlist} setWishlist={setWishlist} />
        <Sections fire={fire} />
      </main>

      <footer className="bg-slate-900 text-slate-400 text-center text-sm py-8 px-4">
        <div className="text-white font-bold text-lg mb-1">ZTech</div>
        <p className="mb-1">Demo landing page cho Zalo Pixel GTM Template</p>
        <p className="text-xs text-slate-500">Mọi sự kiện được ghi nhận thực tế qua GTM + Zalo Pixel tracker</p>
      </footer>

      {showCart && (
        <CartModal cart={cart} setCart={setCart} onClose={() => setShowCart(false)} onCheckout={handleCheckout} />
      )}
      {showCheckout && (
        <CheckoutModal cart={cart} onClose={() => { setShowCheckout(false); setCart([]) }} fire={fire} />
      )}

    </div>
  )
}
