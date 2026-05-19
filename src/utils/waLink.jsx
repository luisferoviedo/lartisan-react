const WHATSAPP = '573053305013'

export function wa(msg) {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`
}
