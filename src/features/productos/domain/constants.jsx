export const CATEGORY_COVERS = {
  chorizos: '/covers/chorizos.webp',
  hamburguesas: '/covers/hamburguesas.webp',
  'charcuteria-fina': '/covers/charcuteria-fina.webp',
  'plant-based': '/covers/plant-based.webp',
}

export const CATEGORY_SUBTITLES = {
  chorizos: 'Perfil cárnico premium para parrilla, plancha y servicio de alto rendimiento.',
  hamburguesas: 'Cortes seleccionados para jugosidad consistente y mejor desempeño en plancha o parrilla.',
  'charcuteria-fina': 'Madurados y curados artesanales para tablas de alto nivel y maridajes precisos.',
  'plant-based': 'Proteína vegetal con formulación técnica, textura cuidada y versatilidad en cocina.',
}

export const CATEGORY_HIGHLIGHTS = {
  chorizos: ['Parrilla', 'Choripán', 'Picadas'],
  hamburguesas: ['Plancha', 'Parrilla', 'Pan brioche'],
  'charcuteria-fina': ['Tablas', 'Sandwich', 'Maridaje'],
  'plant-based': ['Plancha', 'Bowl', 'Parrilla'],
}

export const PRODUCTS_PAGE_HIGHLIGHTS = [
  'Selección curada',
  'Perfiles de sabor',
  'Compra guiada por WhatsApp',
]

export const MARIDAJE_FALLBACK = {
  chorizos: 'Sírvelo en pan tostado con chimichurri y acompaña con una ensalada ácida (limón/mostaza) para balancear.',
  hamburguesas: 'Prueba con queso fundido, cebolla caramelizada y pan brioche tostado. Un toque de mostaza eleva todo.',
  'charcuteria-fina': 'Combina con aceitunas, pan rústico y un toque de aceite de oliva. Ideal con vino tinto o cerveza artesanal.',
  'plant-based': 'Va perfecto con vegetales a la plancha y salsas frescas (tahini, limón, yogur vegetal).',
}

export const USOS_FALLBACK = {
  chorizos: ['Parrilla', 'Plancha', 'Choripán'],
  hamburguesas: ['Plancha', 'Parrilla', 'Pan brioche'],
  'charcuteria-fina': ['Tabla', 'Sandwich', 'Picadas'],
  'plant-based': ['Plancha', 'Parrilla', 'Bowl'],
}

export const COCCION_FALLBACK = [
  {
    titulo: 'Parrilla',
    texto: 'Saca del congelador ~30 min antes y llévalo directo al asador. Dora y gira hasta que quede parejo.',
    tip: 'Si es grueso, termina a fuego indirecto para que quede jugoso por dentro.',
  },
  {
    titulo: 'Sartén / plancha',
    texto: 'Puedes cocinarlo aún congelado: agrega un chorrito de agua, tapa y cocina a fuego bajo.',
    tip: 'No pinches el chorizo: así no se le sale el jugo.',
  },
  {
    titulo: 'Horno / airfryer',
    texto: 'Cocina hasta dorar. Voltea a mitad de tiempo para que quede parejo.',
    tip: 'Si quieres menos humo, ponlo sobre rejilla o papel para hornear.',
  },
]

export const CONSERVACION_FALLBACK = [
  'Ultracongelado para mantener frescura.',
  'Empaque al vacío.',
  'Libres de soya, gluten, colorantes y conservantes.',
]

export const MOBILE_BREAKPOINT = 980
export const MOBILE_INITIAL_VISIBLE = 3
export const MOBILE_LOAD_STEP = 3

export const PRODUCTOS_PAGE_META = {
  title: 'Productos',
  description: "Catálogo de L'Artisan: chorizos, hamburguesas, charcutería fina y plant-based.",
}

export const PRODUCTO_NOT_FOUND_MESSAGE = 'Revisa el enlace o vuelve al catálogo.'
