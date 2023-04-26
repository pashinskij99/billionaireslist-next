export const serializeCategory = (param) =>
  param.split(',').reduce((acc, curr, id) => {
    return { ...acc, [`category[${id}]`]: curr }
  }, {})
