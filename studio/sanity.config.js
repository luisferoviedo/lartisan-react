import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes/index'

export default defineConfig({
  name: 'lartisan',
  title: "L'Artisan — Admin",

  // Reemplazar con tu Project ID de sanity.io/manage
  projectId: 'REEMPLAZAR_CON_PROJECT_ID',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
