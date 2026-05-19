import { usePageMeta } from '../../../hooks/usePageMeta'
import {
  NOSOTROS_EXPERIENCE_INTRO,
  NOSOTROS_EXPERIENCE_ITEMS,
  NOSOTROS_FAQ_ITEMS,
  NOSOTROS_GALLERY_ITEMS,
  NOSOTROS_PAGE_META,
  NOSOTROS_PROMISE_ITEMS,
  NOSOTROS_SUPPORT_ITEMS,
} from '../domain/constants'

export function useNosotrosViewModel() {
  usePageMeta(NOSOTROS_PAGE_META)

  return {
    experienceIntro: NOSOTROS_EXPERIENCE_INTRO,
    experienceItems: NOSOTROS_EXPERIENCE_ITEMS,
    promiseItems: NOSOTROS_PROMISE_ITEMS,
    supportItems: NOSOTROS_SUPPORT_ITEMS,
    faqItems: NOSOTROS_FAQ_ITEMS,
    galleryItems: NOSOTROS_GALLERY_ITEMS,
  }
}
