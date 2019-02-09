import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { RestService } from '../../service/rest.service';
import { HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { MainserviceService } from 'src/app/main-body/mainservice.service';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import Draw from 'ol/interaction/Draw.js';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import { OSM, Vector as VectorSource } from 'ol/source.js';

var headers_object = new HttpHeaders();
headers_object.append('Content-Type', 'application/json');
headers_object.append("Authorization", "Basic" + "admin:admin");

const httpOptions = {
  withCredentials: true,
  headers: headers_object
};
declare var ol: any;

@Component({
  selector: 'app-geofence-modal',
  templateUrl: './geofence-modal.component.html',
  styleUrls: ['./geofence-modal.component.scss']
})
export class GeofenceModalComponent implements OnInit {

  closeResult: any;
  attrNames: any[] = [{
    key: 'color',
    valueType: 'color'
  }, {
    key: 'speedLimit',
    valueType: 'number',
    dataType: 'speed'
  }, {
    key: 'polylineDistance',
    valueType: 'number',
    dataType: 'distance'
  }]
  custommap;
  constructor(private modalService: NgbModal,
    private mainservice: MainserviceService,
    private ajax: RestService) { }

  geofenceIndex: string = '';
  geofences: any = [];
  geofenceEdit: any = {};
  apiurlGetgeofences: string = "http://13.232.8.87:8082/api/geofences";
  attributes: any = {};
  attributeEdit: any = {};
  attributeIndex: string = '';
  attributeNameSelected: string = '';
  areaMap: any;
  private map: any;
  // latitude: number = 18.5204;
  // longitude: number = 73.8567;
  latitude: number = 26.554783;
  longitude: number = 81.293996;
  zoom: number = 2;
  modal = false;
  areamap = false;
  newmap = false;
  draw;
  sources;
  raster;
  vectors;
  maps;
  coordinatedata;
  area;
  polysketch;
  status = false;
  Geometrydrawn;
  ngOnInit() {
    this.getgeofences();
  }

  initializemap() {
    this.areaMap = new ol.Map({
      target: 'amap',
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
    console.log('map', this.map);

  }
  onAttrNameChange(val) {
    this.attributeNameSelected = val;
  }

  getgeofences() {
    this.ajax.get(this.apiurlGetgeofences, httpOptions).then((data) => {
      this.geofences = data;
      // console.log('getgeofences', data)
      // this.attributes = {};
      // this.geofenceIndex = '';
    }).catch(error => {
      console.error(error);
    });
  }

  mapsubscribe() {
    this.mainservice.mapsubscribe();
    this.mainservice.mapsubj.subscribe((res) => {
      console.log('coming area map ', res);
      this.areaMap = res;
    })
  }
  getareamap() {
    this.mapsubscribe();
  }

  geofenceSelected(i: string) {
    this.geofenceIndex = i;
    this.attributes = this.geofences[i].attributes;
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.status = false;
    });
  }

  opencustommodel(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.status = false;
    });
    if (this.status) {
      this.editareamodal();
    } else {
      this.changemodalvalue()
    }

  }

  editareamodal() {
    var div = document.createElement("div");
    div.style.width = "100%";
    div.style.height = "calc(100vh - 65px)";
    div.style.marginLeft = "10%";
    div.id = 'amap'
    console.log('div is', div);
    document.getElementById("main").appendChild(div);
    this.editshape();

  }

  editshape() {
    const originalcoords = this.geofenceEdit.area;
    if (originalcoords.startsWith("POLYGON")) {
      alert('polygon')

      var polycoord = [];
      let ocords = originalcoords;
      ocords = ocords.substring(8);
      const rcoord = ocords.slice(2, -2);
      let split = rcoord.split(',');
      for (var i in split) {
        var cd = split[i].split(' ');
        polycoord.push([parseFloat(cd[0]), parseFloat(cd[1])]);
      }
      this.editpolygon(polycoord)

    }
    if (originalcoords.startsWith("CIRCLE")) {
      alert('circle')
      let ccords = originalcoords;
      ccords = ccords.substring(7);
      const scoord = ccords.slice(1, -1);
      let cplit = scoord.split(',');
      let clatlong = cplit[0].split(' ')
      const cradius = cplit[1];
      this.initializemap()
      this.drawCircleInMeter(this.areaMap, cradius, clatlong);

    }

  }

  editpolygon(polyco) {

    //
    var feature = new ol.Feature({
      geometry: new ol.geom.Polygon([polyco])
    })
    console.log('feature ', feature);


    var layer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [feature]
      })
    });

    var map = new ol.Map({
      target: 'amap',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM({ layer: 'sat' })
        }),
        layer
      ],
      view: new ol.View({
        center: ol.proj.transform([78.660958, 25.097339], 'EPSG:4326', 'EPSG:3857'),
        zoom: 4
      })
    });
  }

  drawCircleInMeter(map, radius, centerlatlong) {
    console.log('map', map)
    console.log('radius', radius)
    console.log('centerlatlong', centerlatlong)


    var view = map.getView();
    var projection = view.getProjection();
    var resolutionAtEquator = view.getResolution();
    console.log("resolutionAtEquator", resolutionAtEquator)
    var center = map.getView().getCenter();
    console.log('center', center)
    const comingcenter = ol.proj.transform([centerlatlong[1], centerlatlong[0]], 'EPSG:4326', 'EPSG:3857')
    console.log('comingcenter', comingcenter);

    // var pointResolution = projection.getPointResolution(resolutionAtEquator, center);
    // var resolutionFactor = resolutionAtEquator/pointResolution;
    // var radiuss = (4 / ol.proj.METERS_PER_UNIT.m) * resolutionFactor;


    var circle = new ol.geom.Circle(comingcenter, 400000);
    var circleFeature = new ol.Feature(circle);

    // Source and vector layer
    var vectorSource = new ol.source.Vector({
      projection: 'EPSG:4326'
    });
    vectorSource.addFeature(circleFeature);
    var vectorLayer = new ol.layer.Vector({
      source: vectorSource
    });

    map.addLayer(vectorLayer);
  }
  changemodalvalue() {
    var div = document.createElement("div");
    div.style.width = "100%";
    div.style.height = "calc(100vh - 65px)";
    div.style.marginLeft = "10%";

    div.id = 'areaMap'
    console.log('div is', div);
    document.getElementById("main").appendChild(div);


    // this.initializemap();
    this.openareamap();
  }

  openareamap() {
    this.raster = new TileLayer({
      source: new OSM()
    });
    this.sources = new VectorSource({ wrapX: false });

    this.vectors = new VectorLayer({
      source: this.sources
    });

    this.areamap = true;
    this.maps = new Map({
      layers: [this.raster, this.vectors],
      target: 'areaMap',
      view: new View({
        center: [-11000000, 4600000],
        zoom: 4
      })
    });

    this.addInteraction('');
  }
  changetype(e) {
    console.log('weferfer', e.target.value);
    if (e) {
      this.addInteraction(e.target.value);

    }
  }


  addInteraction(type) {
    // const typeSelect = document.getElementById('type');
    // console.log('tupeselect ' , typeSelect);
    // const value = 'Polygon';
    {
      this.draw = new Draw({
        source: this.sources,
        type: type,
        freehand: true,
        stopClick: true
      });
      this.maps.addInteraction(this.draw);
      ///
      if (type === 'Polygon') {
        this.polydraw();
      }

      if (type === 'Circle') {
        this.draw.on('drawend', function (evt) {
          var geometry = evt.feature.getGeometry();
          var radius = geometry.getRadius();
          var center = geometry.getCenter();
          this.Geometrydrawn = { type: 'circle', radius: geometry.getRadius(), center: geometry.getCenter() };
          console.log('this.cdm ', this.Geometrydrawn)
        });

        //    if (radius > 1000) {
        // const    laenge = radius / 1000;
        //    const    einheit = "km";
        //   } else {
        //      const  laenge = radius;
        //     const   einheit = "m";
        //   }

        // var len = Math.round(radius.getLength()).toString();
        // console.log('length' , len);
        //  document.getElementById("radius").innerHTML = laenge;
        //  document.getElementById("einheit").innerHTML = einheit;

      }
    }
  }


  polydraw() {
    this.draw.on('drawend', function (evt) {
      var geometry = evt.feature.getGeometry().flatCoordinates;
      console.log('Geometrydrawn pol', evt.feature.getGeometry());

      this.Geometrydrawn = { type: 'polygon', geometry: geometry };

      console.log('Geometrydrawn', this.Geometrydrawn);




    });

  }

  savegeofence() {
    console.log('drawnmap', this.draw);
    console.log('drawnmap', this.draw.Geometrydrawn);
    const drawntype = this.drawnewmap.prototype
    document.getElementById("areamodalclose").click();
    if (this.draw.Geometrydrawn.type === 'circle') {
      const latitude = this.draw.Geometrydrawn.center[0];
      const longutude = this.draw.Geometrydrawn.center[1];
      const rad = this.draw.Geometrydrawn.radius;
      this.area = 'CIRCLE ' + '(' + latitude + ' ' + longutude + ', ' + rad + ')';
      console.log('area', this.area);
    }
    if (this.draw.Geometrydrawn.type === 'polygon') {


      // console.log('polygon ' , this.draw.Geometrydrawn.geometry)

      const drawncoord = this.maps.getInteractions().array_[10].sketchCoords_;
      this.polysketch = drawncoord;
      //  const transformedcoordinates = [];
      //  const b  = ol.proj.transform(drawncoord[0][0] , drawncoord[0][1]  ,'EPSG:3857', 'EPSG:4326' );


      console.log('transformed coordinates ', drawncoord);

      const newarray = [];
      drawncoord[0].forEach(element => {
        newarray.push(element[0] + ' ' + element[1]);

      });
      console.log('new array os  ', newarray);

      this.area = 'POLYGON ' + '((' + newarray + '))';

    }

  }


  // savegeofence() {
  //   const drawntype = this.maps.getInteractions().array_[10].mode_;
  //   document.getElementById("areamodalclose").click();
  //   if (drawntype === 'Circle') {

  //     const maxX = this.maps.getInteractions().array_[10].source_.featuresRtree_.items_[51].maxX
  //     const maxY = this.maps.getInteractions().array_[10].source_.featuresRtree_.items_[51].maxY
  //     const minX = this.maps.getInteractions().array_[10].source_.featuresRtree_.items_[51].minX
  //     const minY = this.maps.getInteractions().array_[10].source_.featuresRtree_.items_[51].minY
  //     var startX = (minX + maxX) / 2;
  //     var startY = (minY + maxY) / 2;
  //     console.log('startX ', startX);
  //     console.log('startY ', startX);
  //     // var ad = new ol.Geometry.Point()
  //     //  var startPoint = new ol.Geometry.Point(startX, startY);
  //     //  var endPoint = new ol.Geometry.Point(maxX, startY);
  //     //  var radiuss = new ol.Geometry.LineString([startPoint, endPoint]);
  //     //  var len = Math.round(radiuss.getLength()).toString();
  //     // console.log('features treee length' , len);

  //     console.log('Circle drawn map ', this.maps);
  //     const drawncoord = this.maps.getInteractions().array_[10].sketchCoords_;
  //     const centercoordinates = ol.proj.transform([drawncoord[0][0], drawncoord[0][1]], 'EPSG:3857', 'EPSG:4326')
  //     const b = ol.proj.transform([drawncoord[1][0], drawncoord[1][1]], 'EPSG:3857', 'EPSG:4326')
  //     console.log('a is ', centercoordinates, 'b is ', b);
  //     const x = Math.pow((centercoordinates[0] - b[0]), 2)
  //     const y = Math.pow((centercoordinates[1] - b[1]), 2)
  //     const radius = Math.sqrt(x + y)
  //     this.area = 'CIRCLE ' + '(' + centercoordinates[0] + ' ' + centercoordinates[1] + ', ' + radius + ')';
  //   }
  //   if (drawntype === 'Polygon') {
  //     const drawncoord = this.maps.getInteractions().array_[10].sketchCoords_;
  //     this.polysketch = drawncoord;
  //     //  const transformedcoordinates = [];
  //     //  const b  = ol.proj.transform(drawncoord[0][0] , drawncoord[0][1]  ,'EPSG:3857', 'EPSG:4326' );


  //     console.log('transformed coordinates ', drawncoord);

  //     const newarray = [];
  //     drawncoord[0].forEach(element => {
  //       newarray.push(element[0] + ' ' + element[1]);

  //     });
  //     console.log('new array os  ', newarray);

  //     this.area = 'POLYGON ' + '((' + newarray + '))';

  //   }

  // }

  drawnewmap() {
    this.newmap = true;
    this.raster = new TileLayer({
      source: new OSM()
    });
    this.sources = new VectorSource({ wrapX: false });

    this.vectors = new VectorLayer({
      source: this.sources
    });

    this.areamap = true;
    this.maps = new Map({
      layers: [this.raster, this.vectors],
      target: 'newmap',
      view: new View({
        center: [-11000000, 4600000],
        zoom: 4
      })
    });

    this.addInteraction(this.drawnewmap);
  }
  closecustommodal() {
    this.custommap = false;
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  AddgeofenceSubmit(formdata, modal) {
    // this.geofences.push(formdata.value);
    let driv = {
      "attributes": this.attributes,
      "name": formdata.value.name,
      "description": formdata.value.description,
      "calendarId": formdata.value.calendarId,
      "area": this.area
    }

    console.log('drive ', driv);

    if (this.geofenceIndex) {
      driv['id'] = this.geofenceEdit.id;
      this.ajax.editDevice(this.apiurlGetgeofences + '/' + this.geofenceEdit.id, driv, httpOptions).then((value) => {
        formdata.reset();
        modal.click();
        this.getgeofences();
      }).catch(() => {
        console.log('error happened');
      });
    } else {
      console.log("entered");
      this.ajax.commonpost(this.apiurlGetgeofences, driv).then((value) => {

        console.log('add geofence res ', value)
        formdata.reset();
        modal.click();
        this.getgeofences();
      }).catch((error) => {
        console.log(' error happened', error);
      });
    }
  }

  openModal(modal) {
    this.geofenceEdit = {};
    this.geofenceIndex = '';
    this.open(modal);
  }

  getKeys(arr) {
    return Object.keys(arr);
  }

  Add(modal) {
    this.geofenceIndex = '';
    this.geofenceEdit = {};
    this.attributes = {};
    this.open(modal);
  }

  edit(modal) {
    // this.geofenceEdit['name'] = this.geofenceIndex;
    this.status = true;
    this.geofenceEdit = this.geofences[this.geofenceIndex];
    console.log('this.geofence edit ', this.geofenceEdit);
    this.open(modal);
  }

  delete() {
    this.geofenceEdit = this.geofences[this.geofenceIndex];
    this.ajax.deleteDevice(this.apiurlGetgeofences + '/' + this.geofenceEdit.id, httpOptions).then((value) => {

      this.getgeofences();
    }).catch(() => {
      console.log('error happened');
    });
  }


  AddAttributeSubmit(formdata: NgForm, closeModal: any) {
    this.attributes[formdata.value.name] = formdata.value.value;

    formdata.reset();
    closeModal.click();
  }

  editAttr(modal) {
    console.log('ediyt attr', this.attributeIndex)
    this.attributeEdit['name'] = this.attributeIndex;
    this.attributeEdit['value'] = this.attributes[this.attributeIndex];
    this.open(modal);
  }

  deleteAttr(modal) {
    delete this.attributes[this.attributeIndex];
  }

  AddAttr(modal) {
    this.attributeIndex = '';
    this.open(modal);
  }

}















// var sitePoints = [];
// var siteStyle = {
//   // style_definition
// };
// console.log('geofence area  ' ,this.geofenceEdit.area )
// var epsg4326 = new ol.proj("EPSG:4326");
// for (var i in this.geofenceEdit.area) {
//   var coord = this.geofenceEdit.area[i];
//   var point = new ol.Geometry.Point(coord.lng, coord.lat);
//   // transform from WGS 1984 to Spherical Mercator
//   point.transform(epsg4326, this.map.getProjectionObject());
//   sitePoints.push(point);
// }
// sitePoints.push(sitePoints[0]);

// var linearRing = new ol.Geometry.LinearRing(sitePoints);
// var geometry = new ol.Geometry.Polygon([linearRing]);
// var polygonFeature = new ol.Feature.Vector(geometry, null, siteStyle);
// this.vectors.addFeatures([polygonFeature]);