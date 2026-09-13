import { useState } from 'react'
import { ChevronDown, ChevronUp, Zap, Settings } from 'lucide-react'

const EVENT_COLORS = {
  ViewContent: 'bg-blue-100 text-blue-700',
  AddToCart: 'bg-orange-100 text-orange-700',
  AddToWishlist: 'bg-pink-100 text-pink-700',
  InitiateCheckout: 'bg-purple-100 text-purple-700',
  AddPaymentInfo: 'bg-violet-100 text-violet-700',
  Purchase: 'bg-green-100 text-green-700',
  Lead: 'bg-teal-100 text-teal-700',
  Contact: 'bg-cyan-100 text-cyan-700',
  Search: 'bg-yellow-100 text-yellow-700',
  CompleteRegistration: 'bg-indigo-100 text-indigo-700',
  Subscribe: 'bg-emerald-100 text-emerald-700',
  Schedule: 'bg-sky-100 text-sky-700',
  FindLocation: 'bg-lime-100 text-lime-700',
  CustomizeProduct: 'bg-amber-100 text-amber-700',
  Donate: 'bg-rose-100 text-rose-700',
  StartTrial: 'bg-fuchsia-100 text-fuchsia-700',
  SubmitApplication: 'bg-slate-100 text-slate-700',
}

export default function EventLog({ events, pixelId, setPixelId }) {
  const [open, setOpen] = useState(false) // mặc định đóng trên mobile
  const [showSettings, setShowSettings] = useState(false)
  const [localId, setLocalId] = useState(pixelId)
  const [expandedIdx, setExpandedIdx] = useState(null)

  const savePixelId = () => {
    setPixelId(localId)
    setShowSettings(false)
  }

  return (
    // Mobile: full-width bottom bar. Desktop: fixed panel góc phải
    <div className="fixed bottom-0 left-0 right-0 sm:bottom-4 sm:left-auto sm:right-4 sm:w-80 z-50 shadow-2xl sm:rounded-2xl overflow-hidden border border-slate-200 bg-white">

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900 text-white sm:rounded-t-2xl">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 text-sm font-bold flex-1 text-left"
        >
          <Zap size={14} className="text-yellow-400 shrink-0" />
          <span>Pixel Events</span>
          {events.length > 0 && (
            <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">{events.length}</span>
          )}
          {/* Last event preview khi đóng */}
          {!open && events.length > 0 && (
            <span className={`ml-1 text-xs px-2 py-0.5 rounded-full truncate max-w-[100px] ${EVENT_COLORS[events[0].name] || 'bg-slate-700 text-slate-300'}`}>
              {events[0].name}
            </span>
          )}
        </button>
        <div className="flex items-center gap-3">
          <button onClick={() => setShowSettings(!showSettings)} className="text-slate-400 hover:text-white transition-colors">
            <Settings size={14} />
          </button>
          <button onClick={() => setOpen(!open)} className="text-slate-400 hover:text-white transition-colors">
            {open ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
          </button>
        </div>
      </div>

      {/* Settings */}
      {showSettings && open && (
        <div className="border-b border-slate-200 p-3 bg-slate-50 text-xs animate-fade-in">
          <div className="text-slate-500 mb-1 font-semibold">Pixel ID</div>
          <div className="flex gap-2">
            <input
              value={localId}
              onChange={e => setLocalId(e.target.value)}
              className="flex-1 border border-slate-300 rounded-lg px-2 py-1.5 text-xs font-mono outline-none focus:ring-1 focus:ring-blue-500 min-w-0"
            />
            <button onClick={savePixelId} className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0">Lưu</button>
          </div>
          <div className="text-slate-400 mt-1 truncate">Active: <span className="font-mono text-slate-600">{pixelId}</span></div>
        </div>
      )}

      {/* Event list */}
      {open && (
        <div className="max-h-56 sm:max-h-80 overflow-y-auto">
          {events.length === 0 ? (
            <div className="text-center text-slate-400 py-6 text-sm">
              <Zap size={20} className="mx-auto mb-2 opacity-30" />
              Chưa có event. Hãy tương tác!
            </div>
          ) : events.map((e, idx) => (
            <div key={idx} className="border-b border-slate-100 last:border-0">
              <button
                onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
                className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-slate-50 transition-colors text-left"
              >
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full truncate max-w-[160px] ${EVENT_COLORS[e.name] || 'bg-slate-100 text-slate-600'}`}>
                  {e.name}
                </span>
                <span className="text-xs text-slate-400 shrink-0 ml-2">{e.time}</span>
              </button>
              {expandedIdx === idx && Object.keys(e.params).length > 0 && (
                <div className="px-4 pb-3 animate-fade-in">
                  <pre className="text-xs bg-slate-50 rounded-lg p-2 overflow-x-auto text-slate-600 max-h-28">
                    {JSON.stringify(e.params, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
