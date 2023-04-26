import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps'
import { geoCylindricalStereographic } from 'd3-geo-projection'

import geographyData from './map-info.json'
import { memo } from 'react'
import { serializeMapInfo } from '../../utils/serializeMapInfo'

const Map = memo(({ setTooltipContent, mapInfo }) => {
  const handleFilter = ({ constructor: { name } }) => {
    return name !== 'MouseEvent'
  }
  return (
    <div data-tip=''>
      <ComposableMap projection={geoCylindricalStereographic()}>
        <ZoomableGroup
          translateExtent={[
            [0, 0],
            [800, 877],
          ]}>
          <Geographies geography={serializeMapInfo(geographyData, mapInfo)}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() =>
                    geo.properties['isHaveCelebrities'] &&
                    setTooltipContent({
                      name: geo.properties.nationality,
                      count: geo.properties.celebrity_count,
                      total: geo.properties.total,
                    })
                  }
                  onMouseLeave={() =>
                    geo.properties['isHaveCelebrities'] && setTooltipContent(null)
                  }
                  style={{
                    default: {
                      fill: geo.properties['isHaveCelebrities'] ? 'rgb(185 160 255)' : '#D6D6DA',
                      outline: 'none',
                    },
                    hover: {
                      fill: geo.properties['isHaveCelebrities'] ? '#9e7cff' : '#D6D6DA',
                    },
                    pressed: { outline: 'none', border: 'none' },
                  }}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  )
})

export default Map
