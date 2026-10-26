import { useState, useEffect } from 'react'
import { ZaloAdsPixel } from '@zalo-ads/pixel-sdk'
import { usePixel } from './hooks/usePixel'
import Header from './components/Header'
import Hero from './components/Hero'
import Products from './components/Products'
import CartModal from './components/CartModal'
import CheckoutModal from './components/CheckoutModal'
import Sections from './components/Sections'

const PIXEL_ID = '7519820900280041472'
const PIXEL_SCRIPT_URL = 'https://dev-adtima-static.zdn.vn/ztr/ztracker.js'

// Gọi đúng một lần ở module scope — khớp hướng dẫn README: "gọi init() một lần duy nhất trong
// vòng đời ứng dụng, tại điểm khởi tạo sớm nhất có thể". Gọi lại với cùng pixelId là vô hại
// (SDK chỉ cập nhật cờ debug), nên StrictMode double-invoke lúc dev không phải vấn đề.
// scriptUrl trỏ CDN staging thay vì mặc định s.zzcdn.me (production) để nhận bản ztracker mới
// nhất chưa lên production.
ZaloAdsPixel.init({ pixelId: PIXEL_ID, scriptUrl: PIXEL_SCRIPT_URL })

export default function App() {
  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)

  const { fire } = usePixel()

  useEffect(() => {
    fire('ViewContent', {
      content_id: 'home',
      content_name: 'ZTech Homepage',
      content_type: 'product',
    })
  }, [])

  const handleCheckout = () => {
    // Defer unmount so ztracker's document-level click listener can still
    // traverse #btn-initiate-checkout's parent chain before React detaches it.
    // React 18 (createRoot) commits setShowCart synchronously at div#root BEFORE
    // the click event reaches document, leaving t.target detached → infinite loop.
    setTimeout(() => setShowCart(false), 0)
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
        <p className="mb-1">Demo landing page cho @zalo-ads/pixel-sdk</p>
        <p className="text-xs text-slate-500">Mọi sự kiện được ghi nhận thực tế qua Zalo Ads Pixel SDK</p>
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
