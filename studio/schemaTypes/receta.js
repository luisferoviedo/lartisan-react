import { defineField, defineType } from 'sanity'

export const receta = defineType({
  name: 'receta',
  title: 'Receta',
  type: 'document',
  fields: [
    defineField({ name: 'titulo', title: 'Título', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'slug', title: 'Slug (URL)', type: 'slug', options: { source: 'titulo' }, validation: (R) => R.required() }),
    defineField({ name: 'orden', title: 'Orden de aparición', type: 'number' }),
    defineField({ name: 'tiempo', title: 'Tiempo de preparación', type: 'string', placeholder: 'Ej: 20 min' }),
    defineField({ name: 'dificultad', title: 'Dificultad', type: 'string', options: { list: ['Fácil', 'Intermedio', 'Avanzado'] } }),
    defineField({
      name: 'imagen',
      title: 'Imagen de portada',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'ingredientes',
      title: 'Ingredientes',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'pasos',
      title: 'Pasos',
      type: 'array',
      of: [{ type: 'text' }],
    }),
  ],
  preview: {
    select: { title: 'titulo', media: 'imagen', tiempo: 'tiempo' },
    prepare({ title, media, tiempo }) {
      return { title, media, subtitle: tiempo ?? '' }
    },
  },
})
