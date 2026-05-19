import { safeValue } from '../domain/formatters'

export function buildCatalogWhatsAppMessage() {
  return "Hola L'Artisan, quiero hacer un pedido. ¿Me ayudas con el catálogo?"
}

export function buildProductCardWhatsAppMessage({ nombre, categoria, secTitulo, priceLabel, mobileCategoryLabel }) {
  const context = mobileCategoryLabel ?? (secTitulo ? `Charcutería fina → ${secTitulo}` : `Categoría: ${categoria}`)
  return `Hola 👋 Quiero pedir *${nombre}* (${context}).\n${priceLabel ? `Precio: ${priceLabel}\n` : ''}\nCantidad:\nEntrega (día/hora):\nDirección:\nForma de pago:`
}

export function buildProductOrderWhatsAppMessage(product) {
  return `Hola 👋 Quiero pedir: ${product.nombre}.\nPresentación: ${safeValue(product.presentacion, '-')}\nContenido: ${safeValue(product.peso, '-')}\nCantidad: \nEntrega (día/hora): \nDirección:`
}

export function buildProductAvailabilityWhatsAppMessage(product) {
  return `Hola 👋 Quiero el precio y disponibilidad de: ${product.nombre}.\nPresentación: ${safeValue(product.presentacion, '-')}\nCantidad: \nEntrega (día/hora): \nDirección:`
}
