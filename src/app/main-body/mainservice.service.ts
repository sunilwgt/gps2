import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CommonServiceService } from '../service/common-service.service';
import { AuthenticationService } from '../Authentication/authentication.service';
declare var ol: any;
var vectorLayer;
@Injectable({
  providedIn: 'root'
})
export class MainserviceService {
  // latitude: number = 18.5204;
  // longitude: number = 73.8567;
  latitude;
  longitude;
  devicelatitude;
  devicelongitude;
  zoom: number = 14;
  map: any;
  deviceDetails: any;
  getlat;
  getlong;
  getzoom;
  transformedcordinate;
  public mapsubj = new Subject();


  constructor(private commonService: CommonServiceService, private authenticationservice: AuthenticationService) {
  }

  async initializemap() {
    const currentuser = this.authenticationservice.getUser()
    this.latitude = currentuser.latitude;
    this.longitude = currentuser.longitude;
    this.zoom = currentuser.zoom;
    this.map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        // Projection:'EPSG:3426',
        center: ol.proj.fromLonLat([this.longitude, this.latitude]),
        zoom: this.zoom
      })
    });

    this.commonService.deviceDetails.subscribe((value) => {
      // console.log(value);
      // if (value.hasOwnProperty(0)) {
      this.deviceDetails = value;
      // } else {
      //   this.deviceDetails = value;
      // }

      // console.log(this.deviceDetails);
      if (this.deviceDetails) {
        // this.clearMap();
        this.devicelatitude = this.deviceDetails.latitude;
        this.devicelongitude = this.deviceDetails.longitude;
        this.setCenter();
        this.addMapPoint(this.devicelongitude, this.devicelatitude);
      }

    })
this.mapsubj.next(this.map);
  }

  addMapPoint(lng, lat) {

    vectorLayer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [new ol.Feature({
          geometry: new ol.geom.Point(ol.proj.transform([parseFloat(lng), parseFloat(lat)], 'EPSG:4326', 'EPSG:3857')),
        })]
      }),
      style: new ol.style.Style({
        image: new ol.style.Icon({
          anchor: [0.5, 0.5],
          anchorXUnits: "fraction",
          anchorYUnits: "fraction",
          src: "https://upload.wikimedia.org/wikipedia/commons/e/ec/RedDot.svg"
        })
      })
    });
    this.map.addLayer(vectorLayer);
  }

  setCenter() {
    var view = this.map.getView();
    view.setCenter(ol.proj.fromLonLat([this.latitude, this.longitude]));
    view.setZoom(this.zoom);
  }

  clearMap() {
    this.map.removeLayer(vectorLayer)
  }

  getmapstate() {
    const center = this.map.getView().getCenter();
    this.getzoom = this.map.getView().getZoom();
    this.getlat = center[0];
    this.getlong = center[1];
    this.transformedcordinate = ol.proj.transform([this.getlat, this.getlong], 'EPSG:3857', 'EPSG:4326');

  }

  setmapstate() {
    const b = ol.proj.transform([this.getlat, this.getlong], 'EPSG:3857', 'EPSG:4326');
    this.map.getView().setCenter(ol.proj.fromLonLat([b[0], b[1]]));
    this.map.getView().setZoom(this.getzoom)
    this.mapsubj.next(this.map);

  }

  mapsubscribe() {
  
    this.mapsubj.next(this.map);
  }

  async getmapcenterandzoom() {
    await this.getmapstate();
    this.setmapstate();
    const mapcentre = {
      co: this.transformedcordinate,
      zoom: this.getzoom
    }
    return mapcentre;
  }

}
