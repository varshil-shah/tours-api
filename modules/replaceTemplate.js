module.exports = (templateCard, product) => {
  let output = templateCard
    .replace(/{%NAME%}/g, product.productName)
    .replace(/{%PATHNAME%}/g, product.pathName)
    .replace(/{%IMAGE%}/g, product.image)
    .replace(/{%QUANTITY%}/g, product.quantity)
    .replace(/{%PRICE%}/g, product.price)
    .replace(/{%ID%}/g, product.id)
    .replace(/{%FROM%}/g, product.from)
    .replace(/{%NUTRIENTS%}/g, product.nutrients)
    .replace(/{%DESCRIPTION%}/g, product.description);

  if (!product.organic)
    output = output.replace(/{%NON_ORGANIC%}/g, 'not-organic');
  return output;
};
