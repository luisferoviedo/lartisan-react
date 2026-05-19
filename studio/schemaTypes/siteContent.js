import { defineField, defineType } from 'sanity'

export const siteContent = defineType({
  name: 'siteContent',
  title: 'Contenido del sitio',
  type: 'document',
  fields: [
    defineField({ name: 'heroTitulo', title: 'Título del hero (inicio)', type: 'string' }),
    defineField({ name: 'heroSubtitulo', title: 'Subtítulo del hero', type: 'text', rows: 2 }),
    defineField({ name: 'sobreNosotros', title: 'Texto "Sobre Nosotros"', type: 'text', rows: 6 }),
    defineField({ name: 'whatsappTelefono', title: 'Número WhatsApp (con código país)', type: 'string', placeholder: '573053305013' }),
    defineField({ name: 'instagram', title: 'URL Instagram', type: 'url' }),
  ],
  preview: {
    prepare() { return { title: 'Configuración general del sitio' } },
  },
})
