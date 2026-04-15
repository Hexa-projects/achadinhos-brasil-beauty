export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function formatInstallments(value: number, count: number = 3): string {
  const installment = value / count;
  return `${count}x de ${formatCurrency(installment)} sem juros`;
}
