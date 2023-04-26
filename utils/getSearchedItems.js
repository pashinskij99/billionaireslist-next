export const getSearchedItems = (array, searchTerm) =>
  array.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
