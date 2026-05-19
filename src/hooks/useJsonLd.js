import { useEffect } from 'react'

// Inserta JSON-LD por página y limpia el script al desmontar.
export function useJsonLd(id, data) {
  const payload = data ? JSON.stringify(data) : ''

  useEffect(() => {
    if (!id || !payload) return undefined

    let script = document.getElementById(id)
    if (!script) {
      script = document.createElement('script')
      script.type = 'application/ld+json'
      script.id = id
      document.head.appendChild(script)
    }

    script.textContent = payload

    return () => {
      const el = document.getElementById(id)
      if (el) el.remove()
    }
  }, [id, payload])
}
