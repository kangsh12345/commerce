import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const sneakers = [
  {
    name: 'Sneakers 1',
    contents: `{"blocks":[{"key":"7rkjr","text":"본 제품은","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url:
      'https://cdn.shopify.com/s/files/1/0052/8164/4662/products/1-900x900_900x900.jpg?v=1529459207',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'Sneakers 2',
    contents: `{"blocks":[{"key":"7rkjr","text":"본 제품은","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url:
      'https://cdn.shopify.com/s/files/1/0052/8164/4662/products/23-900x900_b39fb859-0eee-4974-8ffd-05813674cd9d_900x900.jpg?v=1530126156',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'Sneakers 3',
    contents: `{"blocks":[{"key":"7rkjr","text":"본 제품은","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url:
      'https://cdn.shopify.com/s/files/1/0052/8164/4662/products/24-900x900_62afca2f-c0ea-421e-bc90-d3f019033a1a_900x900.jpg?v=1530126156',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'Sneakers 4',
    contents: `{"blocks":[{"key":"7rkjr","text":"본 제품은","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url:
      'https://cdn.shopify.com/s/files/1/0052/8164/4662/products/25-900x900_e0f86cd2-fa75-482a-b97c-217e7cc0af8e_900x900.jpg?v=1530126156',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'Sneakers 5',
    contents: `{"blocks":[{"key":"7rkjr","text":"본 제품은","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url:
      'https://cdn.shopify.com/s/files/1/0052/8164/4662/products/26-900x900_16154acb-81fc-4eab-807d-c6a1b38b54c4_900x900.jpg?v=1530126156',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'Sneakers 6',
    contents: `{"blocks":[{"key":"7rkjr","text":"본 제품은","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url:
      'https://cdn.shopify.com/s/files/1/0052/8164/4662/products/6-900x900_00b3349a-79c8-44dd-9528-c4d13f136ad3_900x900.jpg?v=1530125312',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'Sneakers 7',
    contents: `{"blocks":[{"key":"7rkjr","text":"본 제품은","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url:
      'https://cdn.shopify.com/s/files/1/0052/8164/4662/products/7-900x900_6b888ab9-d9c6-4d25-9a94-bff49e969177_900x900.jpg?v=1530125312',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'Sneakers 8',
    contents: `{"blocks":[{"key":"7rkjr","text":"본 제품은","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url:
      'https://cdn.shopify.com/s/files/1/0052/8164/4662/products/4-900x900_6441b696-3959-43e7-9c81-ace259810b8b_900x900.jpg?v=1530125312',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'Sneakers 9',
    contents: `{"blocks":[{"key":"7rkjr","text":"본 제품은","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url:
      'https://cdn.shopify.com/s/files/1/0052/8164/4662/products/25-900x900_e0f86cd2-fa75-482a-b97c-217e7cc0af8e_900x900.jpg?v=1530126156',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'Sneakers 10',
    contents: `{"blocks":[{"key":"7rkjr","text":"본 제품은","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url:
      'https://cdn.shopify.com/s/files/1/0052/8164/4662/products/26-900x900_16154acb-81fc-4eab-807d-c6a1b38b54c4_900x900.jpg?v=1530126156',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
];
const tShirt = [
  {
    name: 'T-Shirt 1',
    contents: `{"blocks":[{"key":"7rkjr","text":"본 제품은","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url:
      'https://cdn.shopify.com/s/files/1/0213/2542/products/Rocket_ejection_seat_280x.jpg?v=1535021523',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'T-Shirt 2',
    contents: `{"blocks":[{"key":"7rkjr","text":"본 제품은","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url:
      'https://cdn.shopify.com/s/files/1/0213/2542/products/basic-six-instruments-dark-slate-grey-t-shirt_280x.jpg?v=1533835752',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'T-Shirt 3',
    contents: `{"blocks":[{"key":"7rkjr","text":"본 제품은","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url:
      'https://cdn.shopify.com/s/files/1/0213/2542/products/Aviate-Navigate-Communicate-Dark-Red-Aviation-T-Shirt-Basic-Six_280x.jpg?v=1492255110',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'T-Shirt 4',
    contents: `{"blocks":[{"key":"7rkjr","text":"본 제품은","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url:
      'https://cdn.shopify.com/s/files/1/0213/2542/products/danger-ejection-seat-red-t-shirt_341a3696-8b83-4a6e-9768-7eacee920dbf_280x.jpg?v=1491308622',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'T-Shirt 5',
    contents: `{"blocks":[{"key":"7rkjr","text":"본 제품은","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url:
      'https://cdn.shopify.com/s/files/1/0213/2542/products/vertical-speed-indicator-dark-slate-grey-t-shirt_280x.jpg?v=1491308527',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'T-Shirt 6',
    contents: `{"blocks":[{"key":"7rkjr","text":"본 제품은","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url:
      'https://cdn.shopify.com/s/files/1/0213/2542/products/soviet-excellent-aircraft-badge-light-blue-aviation-t-shirt_280x.jpg?v=1532173140',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'T-Shirt 7',
    contents: `{"blocks":[{"key":"7rkjr","text":"본 제품은","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url:
      'https://cdn.shopify.com/s/files/1/0015/2602/files/offwhiteteegroup_295x.png?v=1684355928',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'T-Shirt 8',
    contents: `{"blocks":[{"key":"7rkjr","text":"본 제품은","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url:
      'https://cdn.shopify.com/s/files/1/0015/2602/files/MRLLOGOPURPLEHOODIE1_295x.png?v=1683931945',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'T-Shirt 9',
    contents: `{"blocks":[{"key":"7rkjr","text":"본 제품은","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url:
      'https://cdn.shopify.com/s/files/1/0015/2602/files/MRLLOGOREDHOODIE1_295x.png?v=1683931398',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'T-Shirt 10',
    contents: `{"blocks":[{"key":"7rkjr","text":"본 제품은","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url:
      'https://cdn.shopify.com/s/files/1/0015/2602/files/Pinback-WrongBlackT-Shirt.png?v=1683754540',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
];
const pants = [
  {
    name: 'Pants 1',
    contents: `{"blocks":[{"key":"7rkjr","text":"본 제품은","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url:
      'https://cdn.shopify.com/s/files/1/2617/9878/products/avenue-shopify-theme-mens-bottoms-7.jpg?v=1533829333&width=480',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'Pants 2',
    contents: `{"blocks":[{"key":"7rkjr","text":"본 제품은","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url:
      'https://cdn.shopify.com/s/files/1/2617/9878/products/avenue-shopify-theme-mens-bottoms-8.jpg?v=1534005833&width=480',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'Pants 3',
    contents: `{"blocks":[{"key":"7rkjr","text":"본 제품은","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url:
      'https://cdn.shopify.com/s/files/1/2617/9878/products/avenue-shopify-theme-mens-bottoms-16.jpg?v=1533829175&width=480',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'Pants 4',
    contents: `{"blocks":[{"key":"7rkjr","text":"본 제품은","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url:
      'https://cdn.shopify.com/s/files/1/2617/9878/products/avenue-shopify-theme-mens-bottoms-14.jpg?v=1533829288&width=480',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'Pants 5',
    contents: `{"blocks":[{"key":"7rkjr","text":"본 제품은","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url:
      'https://cdn.shopify.com/s/files/1/2617/9878/products/avenue-shopify-theme-mens-bottoms-13.jpg?v=1534005833&width=125',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'Pants 6',
    contents: `{"blocks":[{"key":"7rkjr","text":"본 제품은","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url:
      'https://cdn.shopify.com/s/files/1/2617/9878/products/avenue-shopify-theme-mens-bottoms-15.jpg?v=1533828980&width=480',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'Pants 7',
    contents: `{"blocks":[{"key":"7rkjr","text":"본 제품은","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url:
      'https://cdn.shopify.com/s/files/1/2617/9878/products/avenue-shopify-theme-mens-bottoms-3.jpg?v=1583793059&width=125',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'Pants 8',
    contents: `{"blocks":[{"key":"7rkjr","text":"본 제품은","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url:
      'https://cdn.shopify.com/s/files/1/2617/9878/products/avenue-shopify-theme-mens-bottoms-5.jpg?v=1583793065&width=125',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'Pants 9',
    contents: `{"blocks":[{"key":"7rkjr","text":"본 제품은","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url:
      'https://cdn.shopify.com/s/files/1/2617/9878/products/avenue-shopify-theme-mens-bottoms-4.jpg?v=1583793051&width=125',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'Pants 10',
    contents: `{"blocks":[{"key":"7rkjr","text":"본 제품은","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url:
      'https://cdn.shopify.com/s/files/1/2617/9878/products/avenue-shopify-theme-mens-bottoms-2.jpg?v=1583793006&width=125',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
];
const cap = [
  {
    name: 'Cap 1',
    contents: `{"blocks":[{"key":"7rkjr","text":"본 제품은","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 4,
    image_url:
      'https://cdn.shopify.com/s/files/1/0466/9253/2373/products/Product9_grande.jpg?v=1600327630',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'Cap 2',
    contents: `{"blocks":[{"key":"7rkjr","text":"본 제품은","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 4,
    image_url:
      'https://cdn.shopify.com/s/files/1/0466/9253/2373/products/Product11_grande.jpg?v=1600329332',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'Cap 3',
    contents: `{"blocks":[{"key":"7rkjr","text":"본 제품은","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 4,
    image_url:
      'https://cdn.shopify.com/s/files/1/0466/9253/2373/products/Product4_grande.jpg?v=1600326672',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'Cap 4',
    contents: `{"blocks":[{"key":"7rkjr","text":"본 제품은","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 4,
    image_url:
      'https://cdn.shopify.com/s/files/1/0466/9253/2373/products/Product11_ac734626-9900-4fb5-b4fe-00d50482d60b_grande.jpg?v=1600329574',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'Cap 5',
    contents: `{"blocks":[{"key":"7rkjr","text":"본 제품은","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 4,
    image_url:
      'https://cdn.shopify.com/s/files/1/0466/9253/2373/products/Product7_grande.jpg?v=1600327481',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'Cap 6',
    contents: `{"blocks":[{"key":"7rkjr","text":"본 제품은","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 4,
    image_url:
      'https://cdn.shopify.com/s/files/1/0466/9253/2373/products/Product8_grande.jpg?v=1600327630',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'Cap 7',
    contents: `{"blocks":[{"key":"7rkjr","text":"본 제품은","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 4,
    image_url:
      'https://cdn.shopify.com/s/files/1/0466/9253/2373/products/Product10_c08e409a-75eb-4177-805a-e79010a6e60a_grande.jpg?v=1600329459',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'Cap 8',
    contents: `{"blocks":[{"key":"7rkjr","text":"본 제품은","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 4,
    image_url:
      'https://cdn.shopify.com/s/files/1/0466/9253/2373/products/Product9_2ac2ae6d-5797-45db-950a-c1d4d4e6a796_grande.jpg?v=1600329332',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'Cap 9',
    contents: `{"blocks":[{"key":"7rkjr","text":"본 제품은","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 4,
    image_url:
      'https://cdn.shopify.com/s/files/1/0466/9253/2373/products/Product5_1650b3ab-0bc7-4806-9784-9da21068914a_grande.jpg?v=1600327027',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'Cap 10',
    contents: `{"blocks":[{"key":"7rkjr","text":"본 제품은","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 4,
    image_url:
      'https://cdn.shopify.com/s/files/1/0466/9253/2373/products/Product3_medium.jpg?v=1600326522',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
];
const hoodie = [
  {
    name: 'Hoodie 1',
    contents: `{"blocks":[{"key":"7rkjr","text":"본 제품은","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 5,
    image_url:
      'https://cdn.shopify.com/s/files/1/0198/4702/products/RB-BaseballGaiterHoodie-GREY_120x.png?v=1675107468',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'Hoodie 2',
    contents: `{"blocks":[{"key":"7rkjr","text":"본 제품은","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 5,
    image_url:
      'https://cdn.shopify.com/s/files/1/0198/4702/products/RoutineTWAW42-BlackHoodie-5_120x.png?v=1649347741',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'Hoodie 3',
    contents: `{"blocks":[{"key":"7rkjr","text":"본 제품은","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 5,
    image_url:
      'https://cdn.shopify.com/s/files/1/0198/4702/products/WAW42-Hoodie-Blue-6_120x.png?v=1657061730',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'Hoodie 4',
    contents: `{"blocks":[{"key":"7rkjr","text":"본 제품은","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 5,
    image_url:
      'https://cdn.shopify.com/s/files/1/2617/9878/products/avenue-shopify-theme-mens-tops-3.jpg?v=1533830957&width=480',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'Hoodie 5',
    contents: `{"blocks":[{"key":"7rkjr","text":"본 제품은","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 5,
    image_url:
      'https://cdn.shopify.com/s/files/1/2617/9878/products/avenue-shopify-theme-mens-tops-7.jpg?v=1533831065&width=480',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'Hoodie 6',
    contents: `{"blocks":[{"key":"7rkjr","text":"본 제품은","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 5,
    image_url:
      'https://cdn.shopify.com/s/files/1/2617/9878/products/avenue-shopify-theme-mens-tops-10.jpg?v=1533831213&width=480',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'Hoodie 7',
    contents: `{"blocks":[{"key":"7rkjr","text":"본 제품은","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 5,
    image_url:
      'https://cdn.shopify.com/s/files/1/2617/9878/products/avenue-shopify-theme-mens-tops-11.jpg?v=1533830557&width=480',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'Hoodie 8',
    contents: `{"blocks":[{"key":"7rkjr","text":"본 제품은","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 5,
    image_url:
      'https://cdn.shopify.com/s/files/1/2617/9878/products/avenue-shopify-theme-mens-tops-6.jpg?v=1533830617&width=480',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'Hoodie 9',
    contents: `{"blocks":[{"key":"7rkjr","text":"본 제품은","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 5,
    image_url:
      'https://cdn.shopify.com/s/files/1/2617/9878/products/avenue-shopify-theme-mens-tops-5.jpg?v=1533831683&width=480',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
  {
    name: 'Hoodie 10',
    contents: `{"blocks":[{"key":"7rkjr","text":"본 제품은","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 5,
    image_url:
      'https://cdn.shopify.com/s/files/1/2617/9878/products/avenue-shopify-theme-mens-tops-8.jpg?v=1533831065&width=125',
    price: Math.floor(Math.random() * (100000 - 20000) + 20000),
  },
];

const productData: Prisma.productsCreateInput[] = [
  ...sneakers,
  ...tShirt,
  ...pants,
  ...cap,
  ...hoodie,
];

async function main() {
  const CATEGORIES = ['SNEAKERS', 'T-SHIRT', 'PANTS', 'CAP', 'HOODIE'];
  CATEGORIES.forEach(async (c, i) => {
    const product = await prisma.categories.upsert({
      where: {
        id: i + 1,
      },
      update: {
        name: c,
      },
      create: {
        name: c,
      },
    });
    console.log(`Upsert category id: ${product.id}`);
  });

  await prisma.products.deleteMany({});

  for (const p of productData) {
    const product = await prisma.products.create({
      data: p,
    });
    console.log(`Created id: ${product.id}`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
