import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

function injectSiteUrlPlugin(mode) {
  return {
    name: 'inject-site-url',
    transformIndexHtml(html) {
      const env = loadEnv(mode, process.cwd(), '')
      const siteUrl = (env.VITE_SITE_URL || 'https://www.lartisan.com').replace(/\/$/, '')
      return html.replaceAll('%SITE_URL%', siteUrl)
    },
  }
}

export default defineConfig(({ mode }) => ({
  plugins: [react(), injectSiteUrlPlugin(mode)],
}))
