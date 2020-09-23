const Shopify = require("shopify-api-node");

const shopify = new Shopify({
  shopName: "shopatvoi",
  apiKey: "f39d45d049010045efb8e6999cbf826d",
  password: "5a93738fd403ecca695b35fcedc68c26",
});
const productsList = [];
let params = { since_id: 0, limit: 250 };
let stop = true;
shopify.product.count().then(async (count) => {
  do {
    // await sleep(500);
    const products = await shopify.product.list(params);
    // console.log(products.length);
    console.log(products.length);
    productsList.push(...products);
    // console.log(products[products.length - 1].id);
    if (products.length) {
      for (const prod of products) {
        for (const variant of prod.variants) {
          if (variant.inventory_management) {
            await sleep(500);
            await shopify.productVariant.update(variant.id, {
              inventory_management: null,
            });
          }
        }
      }
      params.since_id = products[products.length - 1].id;
    } else {
      stop = false;
    }
  } while (stop);
  console.log("asdad", productsList.length);
});

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
