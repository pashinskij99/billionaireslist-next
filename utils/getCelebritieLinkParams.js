export const getCelebritieLinkParams = (name, id) => {
  return {
    pathname: name.toLowerCase().split(' ').join('-'), 
    query: {i: id}
  }
}