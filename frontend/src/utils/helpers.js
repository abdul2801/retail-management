export const formatCurrency = (amount) => {
  if (amount == null) return "";
  return `₹ ${amount.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })}`;
};

export const formatDate = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toISOString().slice(0, 10);
};
