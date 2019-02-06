import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../service/common-service.service';
import Projection from 'ol/proj/Projection';
import Map from 'ol/Map.js';
import { MainserviceService } from './mainservice.service';
// import View from 'ol/View.js';
// import GeoJSON from 'ol/format/GeoJSON.js';
// import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
// import {OSM, Vector as VectorSource} from 'ol/source.js';
// import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style.js';

declare var ol: any;
var vectorLayer;
@Component({
  selector: 'app-main-body',
  templateUrl: './main-body.component.html',
  styleUrls: ['./main-body.component.scss']
})



export class MainBodyComponent implements OnInit {

  // latitude: number = 18.5204;
  // longitude: number = 73.8567;
  // zoom: number = 14;
  map: any;
  // deviceDetails: any;
  // getlat;
  // getlong;
  // getzoom;

  constructor(private commonService: CommonServiceService, private maminservice: MainserviceService) {
  }

  async ngOnInit() {
    this.maminservice.initializemap();
    this.maminservice.mapsubscribe();
    this.maminservice.mapsubj.subscribe((res) => {
      this.map = res;
      console.log('map res from main component ' , this.map);

    })

  }
  getmapstate() {
    this.maminservice.getmapstate();
  }
  setmapstate() {
    this.maminservice.setmapstate();
  }


  // this.map = new ol.Map({
  //   target: 'map',
  //   layers: [
  //     new ol.layer.Tile({
  //       source: new ol.source.OSM()
  //     })
  //   ],
  //   view: new ol.View({
  //     // Projection:'EPSG:3426',
  //     center: ol.proj.fromLonLat([this.longitude, this.latitude]),
  //     zoom: this.zoom
  //   })
  // });

  // this.commonService.deviceDetails.subscribe((value) => {
  //   // console.log(value);
  //   // if (value.hasOwnProperty(0)) {
  //   this.deviceDetails = value;
  //   // } else {
  //   //   this.deviceDetails = value;
  //   // }

  //   // console.log(this.deviceDetails);
  //   if (this.deviceDetails) {
  //     this.clearMap();
  //     this.latitude = this.deviceDetails.latitude;
  //     this.longitude = this.deviceDetails.longitude;
  //     this.setCenter();
  //     this.addMapPoint(this.longitude, this.latitude);
  //   }

  // })

  // }

  // addMapPoint(lng, lat) {

  //   vectorLayer = new ol.layer.Vector({
  //     source: new ol.source.Vector({
  //       features: [new ol.Feature({
  //         geometry: new ol.geom.Point(ol.proj.transform([parseFloat(lng), parseFloat(lat)], 'EPSG:4326', 'EPSG:3857')),
  //       })]
  //     }),
  //     style: new ol.style.Style({
  //       image: new ol.style.Icon({
  //         anchor: [0.5, 0.5],
  //         anchorXUnits: "fraction",
  //         anchorYUnits: "fraction",
  //         src: "https://upload.wikimedia.org/wikipedia/commons/e/ec/RedDot.svg"
  //       })
  //     })
  //   });
  //   this.map.addLayer(vectorLayer);
  // }

  // setCenter() {
  //   var view = this.map.getView();
  //   console.log('view', view)
  //   view.setCenter(ol.proj.fromLonLat([this.longitude, this.latitude]));
  //   view.setZoom(this.zoom);
  //   console.log('zoom is ', this.map.getView().getZoom())
  // }

  // clearMap() {
  //   this.map.removeLayer(vectorLayer)
  // }

  // getmapstate() {
  //   console.log('map ', this.map);
  //   const center = this.map.getView().getCenter();
  //   this.getzoom = this.map.getView().getZoom();
  //   this.getlat = center[0];
  //   this.getlong = center[1];

  //   console.log('centre is ', center);
  //   const b = ol.proj.transform([this.getlat, this.getlong], 'EPSG:3857', 'EPSG:4326');
  //   console.log('transformed coordinate are ', b);

  // }

  // setmapstate() {
  //   const b = ol.proj.transform([this.getlat, this.getlong], 'EPSG:3857', 'EPSG:4326');
  //   console.log('transformed coordinate are ', b);
  //   this.map.getView().setCenter(ol.proj.fromLonLat([b[0], b[1]]));
  //   this.map.getView().setZoom(this.getzoom)

  // }


}

// https://stackoverflow.com/questions/31348541/openlayers-3-6-getting-the-center-of-the-current-map-view