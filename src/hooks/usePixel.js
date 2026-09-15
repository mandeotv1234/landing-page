import { useCallback } from 'react'

export function usePixel(pixelId) {
  const fire = useCallback((eventName, params = {}) => {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: 'zp_track',
      zp_event_name: eventName,
      zp_pixel_id: pixelId,
      ...params,
    })

    if (typeof window.ztrq === 'function') {
      try { window.ztrq('track', eventName, params) } catch (_) {}
    }
  }, [pixelId])

  return { fire }
}
