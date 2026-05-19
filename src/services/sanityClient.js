import { createClient } from '@sanity/client'

let _client = null

export function getSanityClient() {
  if (!_client) {
    _client = createClient({
      projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
      dataset: import.meta.env.VITE_SANITY_DATASET ?? 'production',
      useCdn: true,
      apiVersion: '2024-01-01',
    })
  }
  return _client
}
