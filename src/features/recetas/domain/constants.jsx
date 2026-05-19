export const RECETAS_PAGE_META = {
  title: 'Recetas y Tips',
  description: "Preparaciones simples con productos L'Artisan para parrilla, tabla y plancha.",
}

export const RECETAS_HIGHLIGHTS = [
  'Sin improvisar',
  'Resultado consistente',
  'Mejor uso del producto',
]

export const RECETAS_OCCASION_ITEMS = [
  {
    name: 'Parrilla en casa',
    caption: 'Qué comprar, cuánto usar y cómo servir cuando la parrilla manda.',
  },
  {
    name: 'Tabla para compartir',
    caption: 'Cómo armar una tabla que se vea bien y se coma mejor.',
  },
  {
    name: 'Evento pequeño',
    caption: 'Qué preparar para que todo fluya sin vivir en la cocina.',
  },
  {
    name: 'Pedido recurrente',
    caption: 'Combinaciones que funcionan y vale la pena repetir.',
  },
  {
    name: 'Regalo gastronómico',
    caption: 'Cómo convertir un producto en un detalle bien pensado.',
  },
]

export const RECETAS_ITEMS = [
  {
    slug: 'bruschetta-mortadella-pistacho',
    title: 'Bruschetta de mortadella con pistacho',
    meta: '10 min · Fácil',
    image: '/galeria/03.webp',
    description:
      'Fresca, cremosa y fácil de repetir cuando quieres algo que se vea bien sin complicarte.',
    ingredients: [
      'mortadella con pistacho',
      'stracciatella',
      'tomate cherry',
      'pesto',
      'pistacho',
      'pan rústico',
    ],
    steps: [
      'Tostar pan con aceite de oliva hasta crocante por fuera.',
      'Colocar mortadella en volumen (no plana).',
      'Añadir stracciatella generosa.',
      'Agregar tomate y hojas verdes.',
      'Finalizar con pesto y pistacho.',
    ],
    ctaLabel: 'Ver productos relacionados',
    ctaTo: '/productos',
    instagramPermalink:
      'https://www.instagram.com/reel/DUCCsQpj6Ud/?utm_source=ig_embed&utm_campaign=loading',
    videoFallback: '',
  },
  {
    slug: 'choripan-chori-bruschetta',
    title: 'Choripán y chori bruschetta',
    meta: '15 min · Fácil',
    image: '/catalogo/galeria/chorizos-argentino-1.webp',
    description:
      'Clásico de parrilla llevado a formato para compartir, sin perder intensidad.',
    ingredients: [
      'chorizo argentino',
      'pan rústico',
      'chimichurri',
      'tomate',
      'hojas verdes',
    ],
    steps: [
      'Cocinar chorizo hasta dorar por fuera y mantener jugoso por dentro.',
      'Tostar el pan con aceite de oliva.',
      'Armar el choripán con chimichurri generoso.',
      'Para versión bruschetta: cortar y montar con toppings.',
    ],
    ctaLabel: 'Ver productos',
    ctaTo: '/productos#chorizos',
    instagramPermalink:
      'https://www.instagram.com/reel/DT4DSq3jVBO/?utm_source=ig_embed&utm_campaign=loading',
    videoFallback: '',
  },
]
