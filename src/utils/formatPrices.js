export const formatPriceARS = (price) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
  }).format(price);
};

export const formatDate = (string) => {
  const date = new Date(string);

  const fecha = new Date(date);
  const mes = fecha.getMonth();
  const dia = fecha.getDate();
  const year = fecha.getFullYear();
  return `${dia}/${mes + 1}/${year}`;
};
