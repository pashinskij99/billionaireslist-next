export const serializeMapInfo = (geographyData, mapInfo) => {
  const result = []

  geographyData.objects.world.geometries.forEach((geo) => {
    if (mapInfo.find((country) => geo.properties.name === country.nationality)) {
      result.push({
        ...geo,

        properties: {
          ...mapInfo.find((country) => geo.properties.name === country.nationality),
          isHaveCelebrities: true,
        },
      })
    } else {
      result.push(geo)
    }
  })
  return {
    ...geographyData,
    objects: { world: { ...geographyData.objects.world, geometries: result } },
  }
}
