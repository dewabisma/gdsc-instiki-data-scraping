const createPopularProduct = (
  constructor = {
    monthlySoldCount: "",
    productName: "",
    productUrl: "",
  }
) => {
  if (
    !constructor.monthlySoldCount ||
    !constructor.productName ||
    !constructor.productUrl
  )
    return null;

  const popularProduct = { ...constructor };

  return popularProduct;
};

export default createPopularProduct;
