export const getQuotePath = (name, id) =>
  `/quote/${name.toLowerCase().split(' ').join('-')}-quote-${id}`
