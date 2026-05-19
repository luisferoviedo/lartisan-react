import { usePageMeta } from '../../../hooks/usePageMeta'
import { CONTACTO_PAGE_META, CONTACTO_INSTAGRAM_URL, CONTACTO_PURCHASE_STEPS, CONTACTO_WHATSAPP_TEMPLATE } from '../domain/constants'
import { buildContactoOrderMessage } from './whatsappBuilders'

export function useContactoViewModel() {
  usePageMeta(CONTACTO_PAGE_META)

  return {
    instagramUrl: CONTACTO_INSTAGRAM_URL,
    orderMessage: buildContactoOrderMessage(),
    purchaseSteps: CONTACTO_PURCHASE_STEPS,
    whatsappTemplate: CONTACTO_WHATSAPP_TEMPLATE,
  }
}
