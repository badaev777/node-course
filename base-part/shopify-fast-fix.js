const Shopify = require("shopify-api-node");

const shopify = new Shopify({
  shopName: "shopatvoi",
  apiKey: "f39d45d049010045efb8e6999cbf826d",
  password: "5a93738fd403ecca695b35fcedc68c26",
});

const productsList = [];
let params = { since_id: 0, limit: 250 };
let stop = true;
let limitRemaining = 40;
let counter = 0;

shopify.product.count().then(async (count) => {
  console.log('total count -->', count);
  do {
    await sleep(500);
    const products = await shopify.product.list(params);
    productsList.push(...products);
    counter += products.length;
    console.log('page next -->', products.length);
    console.log('counter -->',counter);
    if (products.length) {
      for (const prod of products) {
        for (const variant of prod.variants) {
          if (variant.inventory_management) {
            if(limitRemaining < 10){
              console.log('shopifyCallLimitRemaning', limitRemaining)
              await sleep(2000);
            }
            console.log('prod.id',prod.id);
            console.log('variant.id',variant.id);
            await shopify.productVariant.update(variant.id, {
              inventory_management: null,
            });
            console.log('variant.id complete',variant.id);
          }
        }
      }
      params.since_id = products[products.length - 1].id;
    } else {
      stop = false;
    }
  } while (stop);
  console.log("done -->", productsList.length);
});

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

shopify.on('callLimits', (limits) => {
  limitRemaining = limits.remaining;
});
