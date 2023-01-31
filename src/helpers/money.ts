export const formatMoneyToNumber = (str: string): number => {
  return Number(str.replaceAll(".", "").replace(" ", "").replace("VND", ""));
};

export const formatMoneyToVND = (num: number): string => {
  return num.toLocaleString("it-IT", { style: "currency", currency: "VND" });
};
