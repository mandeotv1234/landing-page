import { useCallback } from 'react'
import { ZaloAdsPixel } from '@zalo-ads/pixel-sdk'

// ZaloAdsPixel.init() đã gọi ở module scope của App.jsx (đúng khuyến nghị README: gọi đúng một
// lần, sớm nhất có thể). track() không cần pixelId mỗi lần gọi — SDK gửi cho pixel đã init().
export function usePixel() {
  const fire = useCallback((eventName, params = {}) => {
    ZaloAdsPixel.track(eventName, params)
  }, [])

  return { fire }
}
