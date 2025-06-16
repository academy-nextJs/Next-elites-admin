export const getRoleColor = (role) => {
  if (role == "buyer") return { color: "primary", text: "خریدار" };
  if (role == "seller") return { color: "info", text: "فروشنده" };
  if (role == "admin") return { color: "success", text: "ادمین" };
};
