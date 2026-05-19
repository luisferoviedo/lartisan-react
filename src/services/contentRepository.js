import { catalogo, findProductoBySlugGlobal } from '../data/catalogo'
import { recetas } from '../data/recetas'

// Adapter por defecto en memoria.
// Este contrato permite migrar a API/Supabase sin tocar UI ni ViewModels.
const staticAdapter = {
  async getCatalogo() {
    return catalogo
  },
  async getProductoBySlug(slug) {
    return findProductoBySlugGlobal(slug)
  },
  async getRecetas() {
    return recetas
  },
}

let adapter = staticAdapter

// Permite inyectar un adapter externo (ej: backend real).
export function setContentAdapter(nextAdapter) {
  adapter = nextAdapter
}

// Fachada estable para toda la app.
export const contentRepository = {
  getCatalogo: (...args) => adapter.getCatalogo(...args),
  getProductoBySlug: (...args) => adapter.getProductoBySlug(...args),
  getRecetas: (...args) => adapter.getRecetas(...args),
}
