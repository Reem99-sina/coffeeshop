export const isValidImage = (img) => {
  if (!img) return false; // null أو undefined
  if (Array.isArray(img)) img = img[0]; // لو مصفوفة
  // تحقق أن النص يبدأ بـ http أو https
  return typeof img === "string" && (img.startsWith("http://") || img.startsWith("https://"));
};