import React, { Component, Fragment } from 'react'
import { Map, TileLayer, FeatureGroup  } from 'react-leaflet'
import { EditControl } from 'react-leaflet-draw';
import * as turf from '@turf/turf'
import '../styles/map.css'

export default class MapComponent extends Component {
  state = {
    lat: 4.35,
    lng: -72.04,
    zoom: 5,
  }
  render() {
    const position = [this.state.lat, this.state.lng]
    const analisysShape = layer => {
      switch (layer.layerType) {
      case 'polyline':
        var distance
        var pointsLength = layer.layer._latlngs.length
        var from = turf.point([layer.layer._latlngs[0].lat, layer.layer._latlngs[0].lng]);
        var to = turf.point([layer.layer._latlngs[1].lat, layer.layer._latlngs[1].lng]);
        var options = {units: 'kilometers'};
        var multipoints = []
        if(pointsLength > 2) {
          layer.layer._latlngs.map(points => {
            return multipoints.push([points.lat, points.lng])
          })
          distance = turf.length(turf.lineString(multipoints), options);
          return console.log('The final distance is', distance)
        }
        distance = turf.distance(from, to, options);
        return console.log('The distance is', distance)
      case 'polygon':
        return console.log('Create a polygon')
      case 'marker':
        return console.log('create a marker')
      case 'rectangle':
        return console.log('create a rectangle')
      default:
        return console.log('create a circle')
      }
    }

    const _onEdited = (e) => {
      let numEdited = 0
      e.layers.eachLayer(layer => {
        numEdited += 1
      })
      console.log(`_onEdited: edited ${numEdited} layers`, e)
    }
    const _onCreated = (e) => {
      analisysShape(e)
    }
    // const _onChange = () => {
    // // this._editableFG contains the edited geometry,
    // // which can be manipulated through the leaflet API
    //   const { onChange } = this.props
    //   if (!this._editableFG || !onChange) {
    //     return
    //   }
    //   const geojsonData = this._editableFG.leafletElement.toGeoJSON()
    //   console.log('DATA', geojsonData)
    //   onChange(geojsonData)
    // }
    return (
      <Fragment>
        <Map
          center={position}
          zoom={this.state.zoom}
        >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <FeatureGroup>
            <EditControl
              position='topright'
              onEdited={_onEdited}
              onCreated={_onCreated}
              onDeleted={this._onDeleted}
              onMounted={this._onMounted}
              onEditStart={this._onEditStart}
              onEditStop={this._onEditStop}
              onDeleteStart={this._onDeleteStart}
              onDeleteStop={this._onDeleteStop}
              draw={{
                circlemarker: false,
              }}
            />
          </FeatureGroup>
        </Map>
      </Fragment>
    )
  }
}
