import { useState } from 'react'
import { ChevronRight, Play, Star } from 'lucide-react'

export default function Hero({ fire }) {
  const [trialDone, setTrialDone] = useState(false)

  const handleStartTrial = () => {
    fire('StartTrial')
    setTrialDone(true)
    setTimeout(() => setTrialDone(false), 3000)
  }

  return (
    <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col md:flex-row items-center gap-12">
        {/* Text */}
        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 rounded-full px-4 py-1 text-sm text-blue-300 mb-6">
            <Star size={12} fill="currentColor" />
            Mới nhất 2025 — ZPhone Pro 15
          </div>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Công nghệ <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              đỉnh cao
            </span>
            , trải nghiệm <br />
            vượt trội
          </h1>

          <p className="text-slate-300 text-lg mb-8 max-w-lg">
            Hệ sinh thái thiết bị ZTech — từ smartphone đến wearable — thiết kế cho cuộc sống hiện đại của bạn.
          </p>

          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <a
              href="#products"
              onClick={() => fire('ViewContent', { content_id: 'products', content_name: 'Danh sách sản phẩm', content_type: 'product' })}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Khám phá ngay <ChevronRight size={18} />
            </a>

            <button
              onClick={handleStartTrial}
              className={`inline-flex items-center gap-2 border border-white/30 hover:border-white/60 text-white px-6 py-3 rounded-xl transition-all ${trialDone ? 'bg-green-600/30 border-green-500/50' : ''}`}
            >
              <Play size={16} />
              {trialDone ? '✓ Đã đăng ký dùng thử!' : 'Dùng thử 30 ngày'}
            </button>
          </div>

          <div className="mt-8 flex items-center gap-6 text-sm text-slate-400 justify-center md:justify-start">
            <span className="flex items-center gap-1">
              <span className="text-yellow-400">★★★★★</span> 4.9/5
            </span>
            <span>|</span>
            <span>Miễn phí vận chuyển toàn quốc</span>
            <span>|</span>
            <span>Bảo hành 24 tháng</span>
          </div>
        </div>

        {/* Product illustration */}
        <div className="flex-1 flex justify-center">
          <div className="relative">
            {/* Phone mockup */}
            <div className="w-56 h-96 bg-gradient-to-b from-slate-700 to-slate-900 rounded-[3rem] border-4 border-slate-600 shadow-2xl shadow-blue-500/20 flex flex-col items-center justify-center gap-4 p-6">
              <div className="w-16 h-1 bg-slate-600 rounded-full" />
              <div className="w-full h-52 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center">
                <span className="text-5xl">📱</span>
              </div>
              <div className="text-white text-center">
                <div className="font-bold text-sm">ZPhone Pro 15</div>
                <div className="text-blue-400 text-xs">14.990.000 ₫</div>
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-slate-600 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-slate-700" />
              </div>
            </div>
            {/* Floating badges */}
            <div className="absolute -left-12 top-16 bg-white text-slate-900 rounded-xl px-3 py-2 text-xs font-semibold shadow-xl animate-bounce">
              🔋 5000 mAh
            </div>
            <div className="absolute -right-12 top-48 bg-white text-slate-900 rounded-xl px-3 py-2 text-xs font-semibold shadow-xl">
              📸 200MP
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
