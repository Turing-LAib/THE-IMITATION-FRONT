export function truncateAddress(
  address?: string,
  startLength = 6,
  endLength = 4
): string {
  if (!address || typeof address !== "string") {
    return "Invalid Address";
  }

  if (address.length <= startLength + endLength) {
    return address;
  }

  return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
}
export function numberToRoman(num: number = 1): string {
  if (typeof num !== "number" || num < 1 || num > 3999) {
    return "Invalid Number";
  }

  const val = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const syms = [
    "M",
    "CM",
    "D",
    "CD",
    "C",
    "XC",
    "L",
    "XL",
    "X",
    "IX",
    "V",
    "IV",
    "I",
  ];

  let roman = "";
  val.forEach((value, index) => {
    while (num >= value) {
      roman += syms[index];
      num -= value;
    }
  });
  return roman;
}
