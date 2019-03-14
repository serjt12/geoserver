import React, { Component, Fragment } from 'react'
import { Map, TileLayer, FeatureGroup, Marker, Popup, LayersControl  } from 'react-leaflet'
import { EditControl } from 'react-leaflet-draw';
import * as turf from '@turf/turf'
import '../styles/map.css'
const {BaseLayer, Overlay} = LayersControl
export default class MapComponent extends Component {
  state = {
    lat: 9.94346741544528,
    // lat: 51.505,
    // lng: -0.09,
    lng: -83.74555260348282,
    zoom: 18,
  }
  handleMapClicked = (e) => {
    console.log(e)
    this.setState({
      lat: e.latlng.lat,
      lng: e.latlng.lng
    })
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
    const bounds = [[9.941811040989872, -83.74462961356006], [9.945123789900686, -83.74647559340558]]
    return (
      <Fragment>
        <Map
          center={position}
          zoom={this.state.zoom}
          onClick={this.handleMapClicked}
          maxBounds={bounds}
        >
        <LayersControl>
           <BaseLayer checked name="OpenStreetMap">
             <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
           </BaseLayer>
           <BaseLayer name="Carto Dark Matter">
             <TileLayer url="http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"/>
           </BaseLayer>
           <BaseLayer name="Stamer tonner">
             <TileLayer url="http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png"/>
           </BaseLayer>
           <Overlay checked name="Layer">
             <TileLayer
               tms={true}
               opacity={1.0}
               attribution=""
               maxZoom={30}
               minZoom={15}
               url="http://181.143.87.202:5560/tiles/{z}/{x}/{y}.png"
               />
           </Overlay>
          <FeatureGroup>
            <Marker position={position}>
              <Popup>
                <span>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </span>
              </Popup>
            </Marker>
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
        </LayersControl>
        </Map>
      </Fragment>
    )
  }
}
