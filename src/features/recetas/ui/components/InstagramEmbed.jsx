import { useEffect } from 'react'

let instagramScriptPromise = null

function loadInstagramScript() {
  if (typeof window === 'undefined') return Promise.resolve()
  if (window.instgrm?.Embeds?.process) return Promise.resolve()
  if (instagramScriptPromise) return instagramScriptPromise

  instagramScriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-instgrm-embed="true"]')
    if (existing) {
      existing.addEventListener('load', resolve, { once: true })
      existing.addEventListener('error', reject, { once: true })
      return
    }

    const script = document.createElement('script')
    script.async = true
    script.src = 'https://www.instagram.com/embed.js'
    script.dataset.instgrmEmbed = 'true'
    script.onload = () => resolve()
    script.onerror = reject
    document.body.appendChild(script)
  })

  return instagramScriptPromise
}

export default function InstagramEmbed({ permalink, fallback }) {
  useEffect(() => {
    if (!permalink || typeof window === 'undefined') return undefined

    let cancelled = false
    loadInstagramScript()
      .then(() => {
        if (!cancelled) window.instgrm?.Embeds?.process?.()
      })
      .catch(() => {})

    return () => {
      cancelled = true
    }
  }, [permalink])

  if (!permalink) {
    return (
      <div className="recipe-video-placeholder" role="note" aria-label="Video pendiente por integrar">
        {fallback}
      </div>
    )
  }

  return (
    <div className="recipe-embed-shell">
      <blockquote
        className="instagram-media recipe-instagram-embed"
        data-instgrm-captioned
        data-instgrm-permalink={permalink}
        data-instgrm-version="14"
      />
    </div>
  )
}
