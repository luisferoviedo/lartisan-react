// src/data/catalogo.js
const slugify = (s = "") =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const defaultsByCat = (catSlug) => {
  switch (catSlug) {
    case "chorizos":
      return {
        presentacion: "Paquete (por definir)",
        peso: "Por definir",
        precio: 24000,
        sellos: ["Artesanal", "Sin pasta de pollo", "Sin gluten", "Sin soya"],
        atributos: ["Sin soya", "Sin pasta de pollo", "100% cortes de cerdo"],
        usos: ["Parrilla", "Plancha", "Choripán"],
        maridaje:
          "Sírvelo en pan tostado con chimichurri y acompaña con una ensalada ácida (limón/mostaza) para balancear.",
      };
    case "hamburguesas":
      return {
        presentacion: "Paquete (por definir)",
        peso: "Por definir",
        precio: 22000,
        sellos: ["Artesanal", "Hecho en Medellín"],
        atributos: ["Cortes seleccionados", "Ideal para parrilla", "Empaque al vacío"],
        usos: ["Plancha", "Parrilla", "Pan brioche"],
        maridaje:
          "Prueba con queso fundido, cebolla caramelizada y pan brioche tostado. Un toque de mostaza eleva todo.",
      };
    case "charcuteria-fina":
      return {
        presentacion: "Empaque (por definir)",
        peso: "Por definir",
        precio: 42000,
        sellos: ["Artesanal", "Sin pasta de pollo"],
        atributos: ["Curación artesanal", "Cortes seleccionados", "Empaque al vacío"],
        usos: ["Tabla", "Sandwich", "Picadas"],
        maridaje:
          "Combina con aceitunas, pan rústico y un toque de aceite de oliva. Ideal con vino tinto o cerveza artesanal.",
      };
    case "plant-based":
      return {
        presentacion: "Paquete (por definir)",
        peso: "Por definir",
        precio: 26000,
        sellos: ["Plant-based", "Artesanal"],
        atributos: ["Plant-based", "Ideal para plancha", "Empaque al vacío"],
        usos: ["Plancha", "Parrilla", "Bowl"],
        maridaje:
          "Va perfecto con vegetales a la plancha y salsas frescas (tahini, limón, yogur vegetal).",
      };
    default:
      return {
        presentacion: "Por definir",
        peso: "Por definir",
        precio: null,
        sellos: ["Artesanal"],
        usos: ["Parrilla", "Plancha"],
        maridaje: "Combínalo con acompañamientos frescos y un toque ácido para balancear sabores.",
      };
  }
};

const coccionBase = [
  {
    titulo: "Parrilla",
    texto: "Cocina a fuego medio, girando cada 2–3 min, hasta dorar de manera pareja.",
    tip: "Si la pieza es gruesa, termina a fuego indirecto para conservar jugosidad.",
    tiempo: "10–12 min",
    fuego: "Fuego medio",
    nivel: "Fácil",
  },
  {
    titulo: "Plancha / sartén",
    texto: "Cocina a fuego medio y dora por todos los lados; tapa 2–3 min para terminar si hace falta.",
    tip: "Evita pinchar la pieza para no perder jugos.",
    tiempo: "8–10 min",
    fuego: "Fuego medio",
    nivel: "Fácil",
  },
  {
    titulo: "Horno / airfryer",
    texto: "Cocina hasta dorar y voltea a mitad de tiempo para obtener cocción uniforme.",
    tip: "Puedes usar rejilla o papel para hornear para una cocción más limpia.",
    tiempo: "15–18 min",
    fuego: "180°C",
    nivel: "Fácil",
  },
];

const conservacionBase = [
  "Ultracongelado para mantener frescura.",
  "Empaque al vacío.",
  "Conservar cadena de frío y descongelar en refrigeración antes de cocinar.",
];

const normalizeIngredientes = (arr = []) => {
  const isSal = (s = "") => /^sal(\b|$)/i.test(String(s).trim());
  return (Array.isArray(arr) ? arr : [])
    .map((x) => String(x ?? "").trim())
    .filter(Boolean)
    .map((x) => x.replace(/grasa\s+de\s+cerdo/gi, "Tocino de cerdo"))
    .filter((x) => !isSal(x));
};

const baseIngredientesByCat = (catSlug) => {
  switch (catSlug) {
    case "chorizos": return ["Carne de cerdo (pierna)", "Tocino de cerdo", "Ajo", "Pimienta", "Especias naturales"];
    case "hamburguesas": return ["Carne de res", "Especias naturales"];
    case "charcuteria-fina": return ["Carne (según corte)", "Especias naturales"];
    case "plant-based": return ["Proteína vegetal", "Especias naturales"];
    default: return ["Ingredientes por confirmar"];
  }
};

const guessIngredientes = (catSlug, nombre = "") => {
  const n = String(nombre).toLowerCase();
  let base = [...baseIngredientesByCat(catSlug)];
  if (catSlug === "chorizos") {
    if (n.includes("queso azul")) base.push("Queso azul");
    if (n.includes("colbyjack") || n.includes("colby jack")) base.push("Queso Colby Jack");
    if (n.includes("picante")) base.push("Ají / chile");
  }
  if (catSlug === "hamburguesas") {
    if (n.includes("bacon")) base.push("Tocino de cerdo");
    if (n.includes("pollo")) base = ["Carne de pollo", "Especias naturales"];
  }
  if (catSlug === "charcuteria-fina") {
    if (n.includes("pastrami")) base = ["Carne de res", "Especias naturales"];
    if (n.includes("chimichurri")) base = ["Perejil", "Ajo", "Orégano", "Vinagre", "Aceite"];
    if (n.includes("lonzino")) base = ["Lomo de cerdo", "Especias naturales"];
    if (n.includes("bondiola")) base = ["Bondiola de cerdo", "Especias naturales"];
    if (n.includes("jamón") || n.includes("jamon")) base = ["Carne de cerdo", "Especias naturales"];
  }
  if (catSlug === "plant-based") {
    if (n.includes("vegano")) base = ["Proteína vegetal", "Aceites vegetales", "Especias naturales"];
    if (n.includes("vegetariano")) base = ["Proteína vegetal", "Especias naturales"];
  }
  return normalizeIngredientes(base);
};

const fillHistoriaCorta = (p, catTitulo) =>
  `${p.nombre} de ${catTitulo.toLowerCase()}, elaborado con perfil artesanal y pensado para una preparación práctica con resultado consistente.`;

const fillDescripcionLarga = (p) => {
  const attrs = Array.isArray(p.atributos) ? p.atributos.slice(0, 3).join(", ") : "";
  const attrsText = attrs ? ` Destaca por: ${attrs}.` : "";
  return `${p.nombre} ofrece un sabor balanceado para parrilla, plancha o preparaciones del día a día.${attrsText}`;
};

const imageBySlugGlobal = {
  "chorizos-argentino": "/catalogo/chorizos-argentino.webp",
  "chorizos-antioqueno": "/catalogo/chorizos-antioqueno.webp",
  "chorizos-colbyjack": "/catalogo/chorizos-colbyjack.webp",
  "chorizos-picante": "/catalogo/chorizos-picante.webp",
};

const galleryBySlugGlobal = {
  "chorizos-argentino": [
    "/catalogo/galeria/chorizos-argentino-1.webp",
    "/catalogo/galeria/chorizos-argentino-2.webp",
    "/catalogo/galeria/chorizos-argentino-3.webp",
  ],
};

const buildGallery = (slugGlobal) => galleryBySlugGlobal[slugGlobal] ?? [];

const enrichItems = (items = [], { catTitulo, catSlug, secTitulo = null, secSlug = null } = {}) =>
  (items || []).map((p) => {
    const baseSlug = p.slug ?? slugify(p.nombre);
    const slugGlobal = p.slugGlobal ?? slugify([catSlug, secSlug, p.nombre].filter(Boolean).join("-"));
    const d = defaultsByCat(catSlug);
    const ingredientesFilled = normalizeIngredientes(
      Array.isArray(p.ingredientes) && p.ingredientes.length
        ? p.ingredientes
        : guessIngredientes(catSlug, p.nombre)
    );
    return {
      ...p,
      slug: baseSlug,
      slugGlobal,
      categoria: catTitulo,
      categoriaSlug: catSlug,
      seccion: secTitulo,
      seccionSlug: secSlug,
      href: `/productos/${slugGlobal}`,
      imagen: p.imagen ?? imageBySlugGlobal[slugGlobal] ?? null,
      presentacion: p.presentacion ?? d.presentacion,
      peso: p.peso ?? d.peso,
      precio: p.precio ?? d.precio,
      sellos: p.sellos ?? d.sellos,
      perfil: p.perfil ?? [],
      atributos: p.atributos ?? d.atributos ?? p.sellos ?? d.sellos,
      ingredientes: ingredientesFilled,
      historiaCorta: p.historiaCorta ?? fillHistoriaCorta(p, catTitulo),
      descripcionLarga: p.descripcionLarga ?? fillDescripcionLarga(p),
      usos: p.usos ?? d.usos,
      coccion: p.coccion ?? coccionBase,
      conservacion: p.conservacion ?? conservacionBase,
      maridajeSugerido: p.maridajeSugerido ?? p.maridaje ?? d.maridaje,
      galeria:
        Array.isArray(p.galeria) && p.galeria.length
          ? p.galeria
          : buildGallery(`${catSlug}-${p.slug ?? slugify(p.nombre)}`),
    };
  });

export const catalogo = [
  {
    titulo: "Chorizos",
    slug: "chorizos",
    items: enrichItems(
      [
        {
          nombre: "Argentino",
          frase: "El auténtico sabor argentino en tu parrilla.",
          atributos: ["100% cerdo", "nuez moscada, ajo, paprika, pimienta roja y orégano", "sabor argentino tradicional"],
          imagen: "/catalogo/chorizos-argentino.webp",
          historiaCorta: "Chorizo artesanal estilo argentino, hecho con pierna de cerdo y especias clásicas. Rico en proteínas, sin pasta de pollo y sin soya.",
          descripcionLarga: "Nuestro Argentino es un chorizo de perfil especiado y balanceado, con notas cálidas de nuez moscada y paprika. Perfecto para parrilla, plancha o choripán.",
          precio: 22900,
          presentacion: "Empaque al vacío",
          peso: "500 g",
          ingredientes: ["Carne de cerdo (pierna)", "Grasa de cerdo", "Sal", "Ajo", "Paprika", "Orégano", "Pimienta roja", "Pimienta negra", "Nuez moscada"],
          usos: ["Parrilla", "Plancha", "Choripán", "Picadas", "Desayuno"],
          coccion: [
            { titulo: "Parrilla", texto: "Cocina a fuego medio, girando cada 2–3 min, hasta dorar parejo.", tip: "Si es grueso, termina a fuego indirecto para que quede jugoso por dentro." },
            { titulo: "Plancha / sartén", texto: "A fuego medio, dora por todos los lados. Si hace falta, tapa 2–3 min para terminar.", tip: "No pinches el chorizo: así no se le sale el jugo." },
            { titulo: "Horno / airfryer", texto: "Cocina hasta dorar. Voltea a mitad de tiempo para que quede parejo.", tip: "Si quieres menos humo/grasita, ponlo sobre rejilla o papel para hornear." },
          ],
        },
        { nombre: "Italiano", frase: "Aromático y balanceado, con picante suave.", atributos: ["100% cerdo", "semilla de hinojo + pimienta roja y negra + nuez moscada", "picante suave"], precio: 24000 },
        { nombre: "Queso Azul", frase: "Intenso y cremoso: queso azul real en cada bocado.", atributos: ["100% cerdo", "queso azul danés original", "notas de pimienta y jengibre"], precio: 26000 },
        { nombre: "Alemán", frase: "Especiado y herbal, estilo europeo.", atributos: ["100% cerdo", "nuez moscada y alcaravea", "hierbas aromáticas"], precio: 24000 },
        { nombre: "Mediterráneo", frase: "Fresco y gourmet: feta, aceituna y tomate seco.", atributos: ["100% cerdo", "tomates secos y aceitunas", "albahaca y queso feta"], precio: 27000 },
        { nombre: "Kolbaza", frase: "Sabor húngaro con paprika dulce y ahumada.", atributos: ["mezcla de cerdo y res", "paprika dulce y ahumada", "receta y condimentos húngaros"], precio: 25000 },
        { nombre: "Antioqueño", frase: "Tradición paisa, hecho al mejor estilo L'Artisan.", atributos: ["100% carne de cerdo", "receta típica antioqueña", "sabor tradicional"], precio: 23000 },
        { nombre: "Picante", frase: "Para los que sí le entran: picante medio y sabroso.", atributos: ["100% cerdo", "peperoncino + mix de pimientas y ajíes", "picante medio"], precio: 24000 },
        { nombre: "Churrasquero", frase: "Chorizo de res con carácter, ideal para asar.", atributos: ["100% churrasco de res", "molido fino", "pimienta, ajo y hierbas aromáticas"], precio: 26000 },
        { nombre: "Colbyjack", frase: "Queso + jalapeño: el favorito de la parrilla.", atributos: ["100% cerdo", "queso colby jack y jalapeños", "picante suave"], precio: 27000 },
        { nombre: "Combo Tutti", frase: "Un mix perfecto para compartir: chorizos tipo cóctel.", atributos: ["presentación tipo cóctel", "sabores variados", "ideal para picadas y reuniones"], precio: 52000 },
      ],
      { catTitulo: "Chorizos", catSlug: "chorizos" }
    ),
  },
  {
    titulo: "Hamburguesas",
    slug: "hamburguesas",
    items: enrichItems(
      [
        { nombre: "Baconattor", frase: "Cerdo + tocineta ahumada: una hamburguesa con carácter.", atributos: ["carne de cerdo", "tocineta ahumada", "Stubb's y especias"], precio: 22000 },
        { nombre: "Premium Res", frase: "La clásica premium: res con ajo y cebolla.", atributos: ["100% res premium", "ajo y cebolla", "sabor robusto"], precio: 24000 },
      ],
      { catTitulo: "Hamburguesas", catSlug: "hamburguesas" }
    ),
  },
  {
    titulo: "Charcutería fina",
    slug: "charcuteria-fina",
    secciones: [
      {
        titulo: "Jamones",
        slug: "jamones",
        items: enrichItems(
          [
            { nombre: "Pavo", frase: "Suave y natural: pavo asado y ahumado listo para servir.", atributos: ["pechuga de pavo", "asada lentamente", "ahumada de manera natural"], precio: 39000 },
            { nombre: "Oxford", frase: "Jamón equilibrado en salmuera de especias.", atributos: ["pierna de cerdo", "salmuera de especias", "sabor equilibrado"], precio: 42000 },
          ],
          { catTitulo: "Charcutería fina", catSlug: "charcuteria-fina", secTitulo: "Jamones", secSlug: "jamones" }
        ),
      },
      {
        titulo: "Madurados",
        slug: "madurados",
        items: enrichItems(
          [
            { nombre: "Bondiola", frase: "Madurado 90 días: sabor profundo y delicado.", atributos: ["cabeza de cañón", "curada y madurada por 90 días", "listo para consumir"], precio: 56000 },
            { nombre: "Lonzino", frase: "Fino y elegante: cañón de cerdo madurado 90 días.", atributos: ["cañón de cerdo", "curado y madurado por 90 días", "listo para consumir"], precio: 58000 },
          ],
          { catTitulo: "Charcutería fina", catSlug: "charcuteria-fina", secTitulo: "Madurados", secSlug: "madurados" }
        ),
      },
      {
        titulo: "Especiales",
        slug: "especiales",
        items: enrichItems(
          [
            { nombre: "Kasewurst", frase: "Cremosa y deliciosa: rellena de queso cheddar.", atributos: ["molienda fina de cerdo", "rellena de queso cheddar", "sabor lácteo y suave"], precio: 30000 },
            { nombre: "Cabanossi", frase: "Para picar: salchicha seca tipo salame suave.", atributos: ["salchicha seca", "larga y fina", "hecha de carne de cerdo"], precio: 32000 },
            { nombre: "Pastrami", frase: "Ahumado y jugoso: ideal para sándwiches.", atributos: ["carne de res", "ahumada y curada", "cocida al vapor"], precio: 52000 },
            { nombre: "Pancetta Ahumada", frase: "Sabor intenso: barriguero curado y ahumado.", atributos: ["barriguero de cerdo", "curado", "ahumado"], precio: 48000 },
            { nombre: "Roastbeef", frase: "Res al horno, especiada y llena de sabor.", atributos: ["posta de res seleccionada", "adobada con cebolla, pimientas y salsa inglesa", "cocida lentamente al horno"], precio: 52000 },
            { nombre: "Chimichurri", frase: "El toque argentino que levanta cualquier bocado.", atributos: ["ajo y perejil", "vinagre y aceite", "con ají"], precio: 18000 },
          ],
          { catTitulo: "Charcutería fina", catSlug: "charcuteria-fina", secTitulo: "Especiales", secSlug: "especiales" }
        ),
      },
    ],
  },
  {
    titulo: "Plant Based",
    slug: "plant-based",
    items: enrichItems(
      [
        { nombre: "Chorizo Vegetariano", frase: "Plant-based con sabor a queso azul (con roquefort).", atributos: ["base vegetal texturizada", "contiene queso roquefort", "tripa de celulosa (retirar para consumir)"], precio: 26000, sellos: ["Plant-based", "Artesanal", "Sin gluten"] },
        { nombre: "Chorizo Vegano", frase: "Plant-based sabor argentino, 100% vegano.", atributos: ["base vegetal texturizada", "100% vegano", "tripa de celulosa (retirar para consumir)"], precio: 26000, sellos: ["Vegano", "Plant-based", "Sin gluten"] },
      ],
      { catTitulo: "Plant Based", catSlug: "plant-based" }
    ),
  },
];

export const productosFlat = catalogo.flatMap((cat) => {
  if (cat.items) return cat.items;
  if (cat.secciones) return cat.secciones.flatMap((sec) => sec.items || []);
  return [];
});

export const findProductoBySlugGlobal = (slugGlobal) =>
  productosFlat.find((p) => p.slugGlobal === slugGlobal);
