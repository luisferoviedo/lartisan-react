import { getSanityClient } from './sanityClient'

// GROQ queries — misma forma de datos que staticAdapter
const CATALOGO_QUERY = `*[_type == "categoria"] | order(orden asc) {
  titulo,
  "slug": slug.current,
  "items": items[] {
    nombre,
    frase,
    "slug": slug.current,
    "slugGlobal": slugGlobal.current,
    precio,
    presentacion,
    peso,
    sellos,
    perfil,
    atributos,
    ingredientes,
    historiaCorta,
    descripcionLarga,
    usos,
    maridajeSugerido,
    coccion[] { titulo, texto, tip, tiempo, fuego, nivel },
    conservacion,
    "imagen": imagen.asset->url,
    "galeria": galeria[].asset->url,
    "categoriaSlug": ^.slug.current,
    "categoria": ^.titulo,
    "href": "/productos/" + slugGlobal.current
  },
  "secciones": secciones[] {
    titulo,
    "slug": slug.current,
    "items": items[] {
      nombre,
      frase,
      "slug": slug.current,
      "slugGlobal": slugGlobal.current,
      precio,
      presentacion,
      peso,
      sellos,
      perfil,
      atributos,
      ingredientes,
      historiaCorta,
      descripcionLarga,
      usos,
      maridajeSugerido,
      coccion[] { titulo, texto, tip, tiempo, fuego, nivel },
      conservacion,
      "imagen": imagen.asset->url,
      "galeria": galeria[].asset->url,
      "categoriaSlug": ^.^.slug.current,
      "categoria": ^.^.titulo,
      "seccion": ^.titulo,
      "seccionSlug": ^.slug.current,
      "href": "/productos/" + slugGlobal.current
    }
  }
}`

const PRODUCTO_QUERY = `*[_type == "categoria"] {
  titulo,
  "slug": slug.current,
  "all": [
    ...items[] { ..., "slugGlobal": slugGlobal.current, "categoriaSlug": ^.slug.current, "categoria": ^.titulo, "href": "/productos/" + slugGlobal.current, "imagen": imagen.asset->url, "galeria": galeria[].asset->url },
    ...secciones[].items[] { ..., "slugGlobal": slugGlobal.current, "categoriaSlug": ^.^.slug.current, "categoria": ^.^.titulo, "seccion": ^.titulo, "seccionSlug": ^.slug.current, "href": "/productos/" + slugGlobal.current, "imagen": imagen.asset->url, "galeria": galeria[].asset->url }
  ]
}[0].all[slugGlobal == $slug][0]`

const RECETAS_QUERY = `*[_type == "receta"] | order(orden asc) {
  "slug": slug.current,
  titulo,
  tiempo,
  dificultad,
  ingredientes,
  pasos
}`

export const sanityAdapter = {
  async getCatalogo() {
    return getSanityClient().fetch(CATALOGO_QUERY)
  },

  async getProductoBySlug(slug) {
    return getSanityClient().fetch(PRODUCTO_QUERY, { slug }) ?? null
  },

  async getRecetas() {
    return getSanityClient().fetch(RECETAS_QUERY)
  },
}
