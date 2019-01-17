import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../service/common-service.service';

declare var ol: any;
var vectorLayer;
@Component({
  selector: 'app-main-body',
  templateUrl: './main-body.component.html',
  styleUrls: ['./main-body.component.scss']
})



export class MainBodyComponent implements OnInit {

  latitude: number = 18.5204;
  longitude: number = 73.8567;
  zoom: number = 14;
  map: any;
  deviceDetails: any;

  constructor(private commonService: CommonServiceService) { }

  ngOnInit() {

    this.map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
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
        this.clearMap();
        this.latitude = this.deviceDetails.latitude;
        this.longitude = this.deviceDetails.longitude;
        this.setCenter();
        this.addMapPoint(this.longitude, this.latitude);
      }

    })

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
    view.setCenter(ol.proj.fromLonLat([this.longitude, this.latitude]));
    view.setZoom(this.zoom);
  }

  clearMap() {
    this.map.removeLayer(vectorLayer)
  }


}
