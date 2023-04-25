export const numberFormat = (number) => {
  return Intl.NumberFormat().format(number);
};

export const formatToVND = (number) => {
  if (typeof number !== "number") {
    return null;
  }
  const parts = number.toFixed(0).toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(",") + "";
};
