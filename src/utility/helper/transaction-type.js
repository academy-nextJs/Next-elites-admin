export const getTransactionType = (type) => {
  if (type == "rental") return "اجاره";
  if (type == "reservation") return "رزرو";
  if (type == "direct_purchase") return "نقدی";
  if (type == "mortgage") return "رهن";
};
