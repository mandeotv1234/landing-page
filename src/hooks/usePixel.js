import { useCallback } from 'react'

export function usePixel(pixelId, onEvent) {
  const fire = useCallback((eventName, params = {}) => {
    const entry = {
      name: eventName,
      params,
      time: new Date().toLocaleTimeString('vi-VN', { hour12: false }),
    }

    // Push vào GTM dataLayer
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: 'zp_track',
      zp_event_name: eventName,
      zp_pixel_id: pixelId,
      ...params,
    })

    // Gọi trực tiếp nếu ztrq đã được tracker load
    if (typeof window.ztrq === 'function') {
      try { window.ztrq('track', eventName, params) } catch (_) {}
    }

    onEvent?.(entry)
    return entry
  }, [pixelId, onEvent])

  return { fire }
}
