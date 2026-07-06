export const KITS = [
  {
    key: 'familiar',
    name: 'Kit Familiar',
    nameEn: 'Family Kit',
    categories: [
      {
        key: 'hygiene',
        tag: '🧼 Higiene personal',
        title: 'Personal hygiene',
        items: [
          { es: 'Jabón en barra', en: 'Bar soap' },
          { es: 'Cepillo dental', en: 'Toothbrush' },
          { es: 'Pasta dental', en: 'Toothpaste' },
          { es: 'Toallitas húmedas (wipes)', en: 'Wet wipes' },
          { es: 'Desodorante', en: 'Deodorant' },
          { es: 'Peine o cepillo de cabello', en: 'Comb or hairbrush' },
          { es: 'Papel toilet', en: 'Toilet paper' },
        ],
      },
      {
        key: 'emergency',
        tag: '🚑 Emergencia',
        title: 'Emergency',
        items: [
          { es: 'Alcohol en spray', en: 'Alcohol spray' },
          { es: 'Curitas', en: 'Band-aids' },
          { es: 'Tapabocas', en: 'Face masks' },
          { es: 'Ibuprofeno', en: 'Ibuprofen' },
          { es: 'Acetaminofén', en: 'Acetaminophen' },
          { es: 'Protector solar', en: 'Sunscreen' },
          { es: 'Repelente', en: 'Insect repellent' },
        ],
      },
      {
        key: 'snacks',
        tag: '🍪 Snacks',
        title: 'Snacks',
        items: [
          { es: 'Compotas', en: 'Fruit purée pouches' },
          { es: 'Susy', en: 'Susy (chocolate wafer)' },
          { es: 'Cocosete', en: 'Cocosete (coconut wafer)' },
          { es: 'Chupetas', en: 'Lollipops' },
        ],
      },
      {
        key: 'essentials',
        tag: '🏠 Esenciales',
        title: 'Essentials',
        items: [
          { es: 'Cobijas / Toallas', en: 'Blankets / towels' },
          { es: 'Gorras', en: 'Caps' },
          { es: 'Bolsas de basura', en: 'Trash bags' },
          { es: 'Agua / Gatorade', en: 'Water / Gatorade' },
        ],
      },
      {
        key: 'emotional',
        tag: '🙏 Apoyo emocional',
        title: 'Emotional support',
        items: [{ es: 'Estampitas bendecidas', en: 'Blessed prayer cards' }],
      },
    ],
  },
  {
    key: 'ninos',
    name: 'Kit para Niños',
    nameEn: 'Kids Kit',
    categories: [
      {
        key: 'hygiene',
        tag: '🧼 Higiene personal',
        title: 'Personal hygiene',
        items: [
          { es: 'Cepillo dental de niños', en: "Kids' toothbrush" },
          { es: 'Pasta dental de niños', en: "Kids' toothpaste" },
          { es: 'Shampoo', en: 'Shampoo' },
          { es: 'Talco', en: 'Baby powder' },
          { es: 'Jabón líquido', en: 'Liquid soap' },
          { es: 'Cepillo o peine', en: 'Brush or comb' },
        ],
      },
      {
        key: 'snacks',
        tag: '🍪 Snacks',
        title: 'Snacks',
        items: [
          { es: 'Juguito', en: 'Juice box' },
          { es: 'Compotas', en: 'Fruit purée pouches' },
          { es: 'Fruit Loops', en: 'Fruit Loops' },
          { es: 'Chupetas', en: 'Lollipops' },
        ],
      },
      {
        key: 'kids',
        tag: '🧸 Esenciales',
        title: 'Essentials',
        items: [
          { es: 'Juguete', en: 'Toy' },
          { es: 'Libro para colorear', en: 'Coloring book' },
          { es: 'Colores', en: 'Crayons / colored pencils' },
          { es: 'Termo', en: 'Water bottle' },
        ],
      },
    ],
  },
]

export const PAY_METHODS = [
  {
    flag: '🇺🇸',
    method: 'Zelle',
    detail: '786-606-7034',
    copy: '7866067034',
    name: 'Victoria Gómez Roca',
  },
  { flag: '🇺🇸', method: 'Venmo', detail: '@toyiroca', url: 'https://account.venmo.com/u/toyiroca' },
  { flag: '🇪🇸', method: 'Bizum', detail: '691-691-662', copy: '691691662' },
  { flag: '🇵🇦', method: 'Yappy (Panamá)', detail: '+507 6578-6998', copy: '65786998' },
  {
    flag: '🪙',
    method: 'Binance',
    detail: 'ID: 1177439736',
    copy: '1177439736',
    detail2: 'Vrocag1@gmail.com',
    copy2: 'Vrocag1@gmail.com',
  },
  {
    flag: '🇪🇺',
    method: 'IBAN (Europa)',
    detail: 'Escríbenos por DM',
    url: 'https://www.instagram.com/kitsvzla',
  },
  {
    flag: '🇻🇪',
    method: 'Bolívares (Bs)',
    detail: 'Escríbenos por DM',
    url: 'https://www.instagram.com/kitsvzla',
  },
]
