import { defineField, defineType } from 'sanity'
import { producto } from './producto'

const seccion = {
  name: 'seccion',
  title: 'Sección',
  type: 'object',
  fields: [
    defineField({ name: 'titulo', title: 'Título', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'titulo' } }),
    defineField({ name: 'items', title: 'Productos', type: 'array', of: [{ type: 'producto' }] }),
  ],
}

export const categoria = defineType({
  name: 'categoria',
  title: 'Categoría de productos',
  type: 'document',
  fields: [
    defineField({ name: 'titulo', title: 'Título', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'slug', title: 'Slug (URL)', type: 'slug', options: { source: 'titulo' }, validation: (R) => R.required() }),
    defineField({ name: 'orden', title: 'Orden de aparición', type: 'number' }),
    defineField({ name: 'items', title: 'Productos directos', type: 'array', of: [{ type: 'producto' }] }),
    defineField({ name: 'secciones', title: 'Sub-secciones (ej: Jamones, Madurados)', type: 'array', of: [seccion] }),
  ],
  preview: {
    select: { title: 'titulo', orden: 'orden' },
    prepare({ title, orden }) {
      return { title, subtitle: orden != null ? `Orden: ${orden}` : '' }
    },
  },
})

// Exportar el tipo producto para que Sanity lo registre (usado dentro de categoria)
export { producto }
