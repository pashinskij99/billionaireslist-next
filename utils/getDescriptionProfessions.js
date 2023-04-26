export const getDescriptionProfessions = (professions) => {
  return professions
    .map((item, key) => {
      if (professions.length > 1) {
        if (key === professions.length - 1) {
          return `and ${item}`
        } else {
          return item
        }
      } else return item
    })
    .join(', ')
}
