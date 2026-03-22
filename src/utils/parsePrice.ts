export const parsePrice = (price: string): number => {
  // error handling - infinity/NAN etc
  try {
    const output = parseFloat(price.replace(/[^0-9.]/g, ""));
    if (Number.isNaN(output)) {
      throw new Error("Cannot Parse price");
    }
    return output;
  } catch (error) {
    console.error(`Cannot parse price. Price: ${price} Error: ${error}`);
    return 0;
  }
};
