export const getStatus = (status) => {
  if (status == "pending")
    return { text: "در انتظار", color: "light-secondary" };
  else if (status == "confirmed")
    return { text: "تایید شده", color: "light-success" };
  else if (status == "canceled")
    return { text: "لغو شده", color: "light-danger" };
};
