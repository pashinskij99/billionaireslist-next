export const errorCatch = (error) =>
  error.response && error.response.data
    ? typeof error.response.data.message === 'object'
      ? error.response.data.error[Object.keys(error.response.data.error)[0]][0]
      : error.response.data.error[Object.keys(error.response.data.error)[0]][0]
    : error.message
