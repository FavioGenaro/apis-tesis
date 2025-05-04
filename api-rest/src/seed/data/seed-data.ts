/******************** MODULO DE PRODUCTOS ***********************/
export const PRODUCTS = [
  {
    id: "11ecd49b-2120-47f9-9dac-846a732b1790",
    id_category: "11ecd49b-2120-47f9-9dac-846a732b1780",
    id_brand: "11ecd49b-2120-47f9-9dac-846a732b1750",
    sku: "Nuevo1",
    name: "Nuevo1",
    description: "asfsdgfdsgdfg",
    price: 10.2,
    stock: 50,
    currency: 'USD',
    img_src: 's',
  },
  {
    id: "959d154f-8388-4368-a8c0-8f6ab09e798b",
    id_category: "11ecd49b-2120-47f9-9dac-846a732b1780",
    id_brand: "9bda0179-9468-4157-a982-91a940b1e53d",
    sku: "Nuevo2",
    name: "Nuevo2",
    description: "asfsdgfdsgdfg",
    price: 10.2,
    stock: 50,
    currency: 'USD',
    img_src: 's',
  }
];

export const BRANDS = [
  {
    id: "11ecd49b-2120-47f9-9dac-846a732b1750",
    name: "Video",
  },
  {
    id: "9bda0179-9468-4157-a982-91a940b1e53d",
    name: "Audio",
  }
]

export const CATEGORIES = [
  {
    id: "11ecd49b-2120-47f9-9dac-846a732b1780",
    name: "Video",
  },
  {
    id: "9bda0179-9468-4157-a982-91a940b1e96d",
    name: "Audio",
  }
]

export const PRODUCTSPECS = [
  {
    id_product: "11ecd49b-2120-47f9-9dac-846a732b1790",
    name: 'peso',
    value: '3.2 kg',
  },
  {
    id_product: "11ecd49b-2120-47f9-9dac-846a732b1790",
    name: 'color',
    value: 'Negro',
  },
  {
    id_product: "959d154f-8388-4368-a8c0-8f6ab09e798b",
    name: 'dimensiones',
    value: '20x10x5 cm',
  },
];


/******************** MODULO DE CLIENTES ***********************/

export const ADDRESS = [
  {
    id: "11ecd49b-2120-47f9-9dbc-846a732b1750",
    street: "Central",
    city: "Lima",
    country: "Perú",
    zip: "64197",
    reference: "fdgnelihergi",
    is_default: true,
    id_customer: "11ecd49b-2120-47f9-9dbc-846a732b1749",
  },
  {
    id: "9bda0179-9468-4157-a993-91a940b1e53d",
    street: "Proceres",
    city: "Lima",
    country: "Perú",
    zip: "98794",
    reference: "e23fwgt4334",
    is_default: false,
    id_customer: "11ecd49b-2120-47f9-9dbc-846a732b1749",
  }
]

export const CUSTOMER = [
  {
    id: "11ecd49b-2120-47f9-9dbc-846a732b1749",
    first_name: "Central",
    last_name: "Lima",
    email: "avsdjo@gmail.com",
    phone: "64197",
    password: "64197",
  }
]

/******************** MODULO DE COMPRAS ***********************/

export const STATUS = [
  {
    id: "11ecd49b-2120-47f9-9dbc-846a732b1749",
    name: 'Pendiente',
    type: 'Purchase'
  },
  {
    id: "11ecd49b-2120-47f9-9abc-846a732b1749",
    name: 'Finalizado',
    type: 'Payment'
  }
];

export const PAYMENTMETHODS = [
  {
    id: "11ecd49b-2120-47f9-9dbc-846a732b1749",
    name: 'Tarjeta de crédito',
    description: 'La tarjeta de crédito tiene un límite de crédito que se puede usar para compras o retiros.',
  },
  {
    id: "11ecd49b-2120-47f9-9abc-846a732b1749",
    name: 'Efectivo',
    description: null,
  }
];

export const PURCHARSES = [
  {
    id: "11ecd49b-2120-47f9-9abc-846a732b1156",
    currency: 'USD',
    total_cost: 1250.85,
    id_status: '11ecd49b-2120-47f9-9dbc-846a732b1749',
    id_customer: '11ecd49b-2120-47f9-9dbc-846a732b1749',
  },
  {
    id: "11ecd49b-2120-47f9-9abc-846a732b1166",
    currency: 'USD',
    total_cost: 1250.85,
    id_status: '11ecd49b-2120-47f9-9dbc-846a732b1749',
    id_customer: '11ecd49b-2120-47f9-9dbc-846a732b1749',
  }
];

export const PAYMENTS = [
  {
    id: "11ecd49b-2120-47f9-9abc-846a732b1156",
    currency: 'USD',
    amount: 100.85,
    id_payment_method: '11ecd49b-2120-47f9-9abc-846a732b1749',
    id_status: '11ecd49b-2120-47f9-9abc-846a732b1749',
    id_purchase: '11ecd49b-2120-47f9-9abc-846a732b1156',
  },
  {
    id: "11ecd49b-2120-47f9-9abc-846a732b1166",
    currency: 'USD',
    amount: 200.85,
    id_payment_method: '11ecd49b-2120-47f9-9abc-846a732b1749',
    id_status: '11ecd49b-2120-47f9-9abc-846a732b1749',
    id_purchase: '11ecd49b-2120-47f9-9abc-846a732b1166',
  }
];

export const PURCHARSESDETAIL = [
  {
    id: "11ecd49b-2120-47f9-9abc-846a732b1156",
    quantity: 2,
    sale_price: 1250.85,
    id_product: '11ecd49b-2120-47f9-9dac-846a732b1790',
    id_purchase: '11ecd49b-2120-47f9-9abc-846a732b1166',
  },
  {
    id: "11ecd49b-2120-47f9-9abc-846a732b1196",
    quantity: 3,
    sale_price: 96.00,
    id_product: '959d154f-8388-4368-a8c0-8f6ab09e798b',
    id_purchase: '11ecd49b-2120-47f9-9abc-846a732b1166',
  }
];