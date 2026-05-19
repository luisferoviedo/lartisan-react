import { defineField, defineType } from 'sanity'

export const producto = defineType({
  name: 'producto',
  title: 'Producto',
  type: 'object',
  fields: [
    defineField({ name: 'nombre', title: 'Nombre', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'slug', title: 'Slug (URL)', type: 'slug', options: { source: 'nombre' }, validation: (R) => R.required() }),
    defineField({ name: 'slugGlobal', title: 'Slug global (URL completa)', type: 'slug', options: { source: 'nombre' }, validation: (R) => R.required() }),
    defineField({ name: 'frase', title: 'Frase corta', type: 'string' }),
    defineField({ name: 'precio', title: 'Precio (COP)', type: 'number' }),
    defineField({ name: 'presentacion', title: 'Presentación', type: 'string', placeholder: 'Ej: Empaque al vacío' }),
    defineField({ name: 'peso', title: 'Peso', type: 'string', placeholder: 'Ej: 500 g' }),
    defineField({
      name: 'imagen',
      title: 'Imagen principal',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'galeria',
      title: 'Galería de imágenes',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'sellos',
      title: 'Sellos (badges)',
      type: 'array',
      of: [{ type: 'string' }],
      placeholder: 'Artesanal, Sin gluten, Plant-based…',
    }),
    defineField({
      name: 'atributos',
      title: 'Atributos destacados',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'ingredientes',
      title: 'Ingredientes',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'historiaCorta', title: 'Historia corta', type: 'text', rows: 2 }),
    defineField({ name: 'descripcionLarga', title: 'Descripción larga', type: 'text', rows: 4 }),
    defineField({
      name: 'usos',
      title: 'Usos / preparaciones',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'maridajeSugerido', title: 'Maridaje sugerido', type: 'text', rows: 2 }),
    defineField({
      name: 'coccion',
      title: 'Métodos de cocción',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'titulo', title: 'Método', type: 'string' },
          { name: 'texto', title: 'Instrucción', type: 'text', rows: 2 },
          { name: 'tip', title: 'Tip', type: 'string' },
          { name: 'tiempo', title: 'Tiempo', type: 'string' },
          { name: 'fuego', title: 'Temperatura', type: 'string' },
          { name: 'nivel', title: 'Nivel', type: 'string' },
        ],
      }],
    }),
    defineField({
      name: 'conservacion',
      title: 'Notas de conservación',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
  preview: {
    select: { title: 'nombre', media: 'imagen', precio: 'precio' },
    prepare({ title, media, precio }) {
      return { title, media, subtitle: precio ? `$${precio.toLocaleString('es-CO')}` : '' }
    },
  },
})
