import { catalogo, findProductoBySlugGlobal } from '../data/catalogo'
import { recetas } from '../data/recetas'
import { sanityAdapter } from './sanityAdapter'

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

const useSanity = Boolean(import.meta.env.VITE_SANITY_PROJECT_ID)
let adapter = useSanity ? sanityAdapter : staticAdapter

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
