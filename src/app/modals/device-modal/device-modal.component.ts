import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CommonServiceService } from '../../service/common-service.service';
import { RestService } from '../../service/rest.service';
import { NgForm } from '@angular/forms';


// var headers_object = new HttpHeaders();
// headers_object.append('Content-Type', 'application/json');
// headers_object.append("Authorization", "Basic " + "admin:admin");

// const httpOptions = {
//   withCredentials: true,
//   headers: headers_object
// };
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + 'YWRtaW46YWRtaW4='
  })
};


@Component({
  selector: 'app-device-modal',
  templateUrl: './device-modal.component.html',
  styleUrls: ['./device-modal.component.scss']
})
export class DeviceModalComponent implements OnInit {



  model: any = {
    'disabled': false
  };
  attributeEdit: any = {};
  closeResult: string;

  timezones: any = [{
    key: 'Africa/Abidjan'
  }, {
    key: 'Africa/Accra'
  }, {
    key: 'Africa/Bissau'
  }, {
    key: 'Africa/Casablanca'
  }, {
    key: 'Africa/El_Aaiun'
  }, {
    key: 'Africa/Monrovia'
  }, {
    key: 'America/Danmarkshavn'
  }, {
    key: 'Antarctica/Troll'
  }, {
    key: 'Atlantic/Canary'
  }, {
    key: 'Atlantic/Faroe'
  }, {
    key: 'Atlantic/Madeira'
  }, {
    key: 'Atlantic/Reykjavik'
  }, {
    key: 'GMT'
  }, {
    key: 'Etc/GMT'
  }, {
    key: 'Etc/UCT'
  }, {
    key: 'Etc/UTC'
  }, {
    key: 'Europe/Dublin'
  }, {
    key: 'Europe/Lisbon'
  }, {
    key: 'Europe/London'
  }, {
    key: 'WET'
  }, {
    key: 'Africa/Algiers'
  }, {
    key: 'Africa/Ceuta'
  }, {
    key: 'Africa/Lagos'
  }, {
    key: 'Africa/Ndjamena'
  }, {
    key: 'Africa/Tunis'
  }, {
    key: 'Africa/Windhoek'
  }, {
    key: 'CET'
  }, {
    key: 'Etc/GMT-1'
  }, {
    key: 'Europe/Amsterdam'
  }, {
    key: 'Europe/Andorra'
  }, {
    key: 'Europe/Belgrade'
  }, {
    key: 'Europe/Berlin'
  }, {
    key: 'Europe/Brussels'
  }, {
    key: 'Europe/Budapest'
  }, {
    key: 'Europe/Copenhagen'
  }, {
    key: 'Europe/Gibraltar'
  }, {
    key: 'Europe/Luxembourg'
  }, {
    key: 'Europe/Madrid'
  }, {
    key: 'Europe/Malta'
  }, {
    key: 'Europe/Monaco'
  }, {
    key: 'Europe/Oslo'
  }, {
    key: 'Europe/Paris'
  }, {
    key: 'Europe/Prague'
  }, {
    key: 'Europe/Rome'
  }, {
    key: 'Europe/Stockholm'
  }, {
    key: 'Europe/Tirane'
  }, {
    key: 'Europe/Vienna'
  }, {
    key: 'Europe/Warsaw'
  }, {
    key: 'Europe/Zurich'
  }, {
    key: 'MET'
  }, {
    key: 'Africa/Cairo'
  }, {
    key: 'Africa/Johannesburg'
  }, {
    key: 'Africa/Maputo'
  }, {
    key: 'Africa/Tripoli'
  }, {
    key: 'Asia/Amman'
  }, {
    key: 'Asia/Beirut'
  }, {
    key: 'Asia/Damascus'
  }, {
    key: 'Asia/Gaza'
  }, {
    key: 'Asia/Hebron'
  }, {
    key: 'Asia/Jerusalem'
  }, {
    key: 'Asia/Nicosia'
  }, {
    key: 'EET'
  }, {
    key: 'Etc/GMT-2'
  }, {
    key: 'Europe/Athens'
  }, {
    key: 'Europe/Bucharest'
  }, {
    key: 'Europe/Chisinau'
  }, {
    key: 'Europe/Helsinki'
  }, {
    key: 'Europe/Kaliningrad'
  }, {
    key: 'Europe/Kiev'
  }, {
    key: 'Europe/Riga'
  }, {
    key: 'Europe/Sofia'
  }, {
    key: 'Europe/Tallinn'
  }, {
    key: 'Europe/Uzhgorod'
  }, {
    key: 'Europe/Vilnius'
  }, {
    key: 'Europe/Zaporozhye'
  }, {
    key: 'Africa/Khartoum'
  }, {
    key: 'Africa/Nairobi'
  }, {
    key: 'Antarctica/Syowa'
  }, {
    key: 'Asia/Baghdad'
  }, {
    key: 'Asia/Famagusta'
  }, {
    key: 'Asia/Qatar'
  }, {
    key: 'Asia/Riyadh'
  }, {
    key: 'Etc/GMT-3'
  }, {
    key: 'Europe/Istanbul'
  }, {
    key: 'Europe/Kirov'
  }, {
    key: 'Europe/Minsk'
  }, {
    key: 'Europe/Moscow'
  }, {
    key: 'Europe/Simferopol'
  }, {
    key: 'Europe/Volgograd'
  }, {
    key: 'Asia/Tehran'
  }, {
    key: 'Asia/Baku'
  }, {
    key: 'Asia/Dubai'
  }, {
    key: 'Asia/Tbilisi'
  }, {
    key: 'Asia/Yerevan'
  }, {
    key: 'Etc/GMT-4'
  }, {
    key: 'Europe/Astrakhan'
  }, {
    key: 'Europe/Samara'
  }, {
    key: 'Europe/Saratov'
  }, {
    key: 'Europe/Ulyanovsk'
  }, {
    key: 'Indian/Mahe'
  }, {
    key: 'Indian/Mauritius'
  }, {
    key: 'Indian/Reunion'
  }, {
    key: 'Asia/Kabul'
  }, {
    key: 'Antarctica/Mawson'
  }, {
    key: 'Asia/Aqtau'
  }, {
    key: 'Asia/Aqtobe'
  }, {
    key: 'Asia/Ashgabat'
  }, {
    key: 'Asia/Atyrau'
  }, {
    key: 'Asia/Dushanbe'
  }, {
    key: 'Asia/Karachi'
  }, {
    key: 'Asia/Oral'
  }, {
    key: 'Asia/Samarkand'
  }, {
    key: 'Asia/Tashkent'
  }, {
    key: 'Asia/Yekaterinburg'
  }, {
    key: 'Etc/GMT-5'
  }, {
    key: 'Indian/Kerguelen'
  }, {
    key: 'Indian/Maldives'
  }, {
    key: 'Asia/Colombo'
  }, {
    key: 'Asia/Kolkata'
  }, {
    key: 'Asia/Kathmandu'
  }, {
    key: 'Antarctica/Vostok'
  }, {
    key: 'Asia/Almaty'
  }, {
    key: 'Asia/Bishkek'
  }, {
    key: 'Asia/Dhaka'
  }, {
    key: 'Asia/Omsk'
  }, {
    key: 'Asia/Qyzylorda'
  }, {
    key: 'Asia/Thimphu'
  }, {
    key: 'Asia/Urumqi'
  }, {
    key: 'Etc/GMT-6'
  }, {
    key: 'Indian/Chagos'
  }, {
    key: 'Asia/Yangon'
  }, {
    key: 'Indian/Cocos'
  }, {
    key: 'Antarctica/Davis'
  }, {
    key: 'Asia/Bangkok'
  }, {
    key: 'Asia/Barnaul'
  }, {
    key: 'Asia/Ho_Chi_Minh'
  }, {
    key: 'Asia/Hovd'
  }, {
    key: 'Asia/Jakarta'
  }, {
    key: 'Asia/Krasnoyarsk'
  }, {
    key: 'Asia/Novokuznetsk'
  }, {
    key: 'Asia/Novosibirsk'
  }, {
    key: 'Asia/Pontianak'
  }, {
    key: 'Asia/Tomsk'
  }, {
    key: 'Etc/GMT-7'
  }, {
    key: 'Indian/Christmas'
  }, {
    key: 'Asia/Brunei'
  }, {
    key: 'Asia/Choibalsan'
  }, {
    key: 'Asia/Hong_Kong'
  }, {
    key: 'Asia/Irkutsk'
  }, {
    key: 'Asia/Kuala_Lumpur'
  }, {
    key: 'Asia/Kuching'
  }, {
    key: 'Asia/Macau'
  }, {
    key: 'Asia/Makassar'
  }, {
    key: 'Asia/Manila'
  }, {
    key: 'Asia/Shanghai'
  }, {
    key: 'Asia/Singapore'
  }, {
    key: 'Asia/Taipei'
  }, {
    key: 'Asia/Ulaanbaatar'
  }, {
    key: 'Australia/Perth'
  }, {
    key: 'Etc/GMT-8'
  }, {
    key: 'Asia/Pyongyang'
  }, {
    key: 'Australia/Eucla'
  }, {
    key: 'Asia/Chita'
  }, {
    key: 'Asia/Dili'
  }, {
    key: 'Asia/Jayapura'
  }, {
    key: 'Asia/Khandyga'
  }, {
    key: 'Asia/Seoul'
  }, {
    key: 'Asia/Tokyo'
  }, {
    key: 'Asia/Yakutsk'
  }, {
    key: 'Etc/GMT-9'
  }, {
    key: 'Pacific/Palau'
  }, {
    key: 'Australia/Adelaide'
  }, {
    key: 'Australia/Broken_Hill'
  }, {
    key: 'Australia/Darwin'
  }, {
    key: 'Antarctica/DumontDUrville'
  }, {
    key: 'Asia/Ust-Nera'
  }, {
    key: 'Asia/Vladivostok'
  }, {
    key: 'Australia/Brisbane'
  }, {
    key: 'Australia/Currie'
  }, {
    key: 'Australia/Hobart'
  }, {
    key: 'Australia/Lindeman'
  }, {
    key: 'Australia/Melbourne'
  }, {
    key: 'Australia/Sydney'
  }, {
    key: 'Etc/GMT-10'
  }, {
    key: 'Pacific/Chuuk'
  }, {
    key: 'Pacific/Guam'
  }, {
    key: 'Pacific/Port_Moresby'
  }, {
    key: 'Australia/Lord_Howe'
  }, {
    key: 'Antarctica/Casey'
  }, {
    key: 'Antarctica/Macquarie'
  }, {
    key: 'Asia/Magadan'
  }, {
    key: 'Asia/Sakhalin'
  }, {
    key: 'Asia/Srednekolymsk'
  }, {
    key: 'Etc/GMT-11'
  }, {
    key: 'Pacific/Bougainville'
  }, {
    key: 'Pacific/Efate'
  }, {
    key: 'Pacific/Guadalcanal'
  }, {
    key: 'Pacific/Kosrae'
  }, {
    key: 'Pacific/Norfolk'
  }, {
    key: 'Pacific/Noumea'
  }, {
    key: 'Pacific/Pohnpei'
  }, {
    key: 'Asia/Anadyr'
  }, {
    key: 'Asia/Kamchatka'
  }, {
    key: 'Etc/GMT-12'
  }, {
    key: 'Pacific/Auckland'
  }, {
    key: 'Pacific/Fiji'
  }, {
    key: 'Pacific/Funafuti'
  }, {
    key: 'Pacific/Kwajalein'
  }, {
    key: 'Pacific/Majuro'
  }, {
    key: 'Pacific/Nauru'
  }, {
    key: 'Pacific/Tarawa'
  }, {
    key: 'Pacific/Wake'
  }, {
    key: 'Pacific/Wallis'
  }, {
    key: 'Pacific/Chatham'
  }, {
    key: 'Etc/GMT-13'
  }, {
    key: 'Pacific/Apia'
  }, {
    key: 'Pacific/Enderbury'
  }, {
    key: 'Pacific/Fakaofo'
  }, {
    key: 'Pacific/Tongatapu'
  }, {
    key: 'Etc/GMT-14'
  }, {
    key: 'Pacific/Kiritimati'
  }, {
    key: 'America/Scoresbysund'
  }, {
    key: 'Atlantic/Azores'
  }, {
    key: 'Atlantic/Cape_Verde'
  }, {
    key: 'Etc/GMT+1'
  }, {
    key: 'America/Noronha'
  }, {
    key: 'Atlantic/South_Georgia'
  }, {
    key: 'Etc/GMT+2'
  }, {
    key: 'America/Araguaina'
  }, {
    key: 'America/Argentina/Buenos_Aires'
  }, {
    key: 'America/Argentina/Catamarca'
  }, {
    key: 'America/Argentina/Cordoba'
  }, {
    key: 'America/Argentina/Jujuy'
  }, {
    key: 'America/Argentina/La_Rioja'
  }, {
    key: 'America/Argentina/Mendoza'
  }, {
    key: 'America/Argentina/Rio_Gallegos'
  }, {
    key: 'America/Argentina/Salta'
  }, {
    key: 'America/Argentina/San_Juan'
  }, {
    key: 'America/Argentina/San_Luis'
  }, {
    key: 'America/Argentina/Tucuman'
  }, {
    key: 'America/Argentina/Ushuaia'
  }, {
    key: 'America/Bahia'
  }, {
    key: 'America/Belem'
  }, {
    key: 'America/Cayenne'
  }, {
    key: 'America/Fortaleza'
  }, {
    key: 'America/Godthab'
  }, {
    key: 'America/Maceio'
  }, {
    key: 'America/Miquelon'
  }, {
    key: 'America/Montevideo'
  }, {
    key: 'America/Paramaribo'
  }, {
    key: 'America/Recife'
  }, {
    key: 'America/Santarem'
  }, {
    key: 'America/Sao_Paulo'
  }, {
    key: 'Antarctica/Rothera'
  }, {
    key: 'Atlantic/Stanley'
  }, {
    key: 'Etc/GMT+3'
  }, {
    key: 'America/St_Johns'
  }, {
    key: 'America/Asuncion'
  }, {
    key: 'America/Barbados'
  }, {
    key: 'America/Blanc-Sablon'
  }, {
    key: 'America/Boa_Vista'
  }, {
    key: 'America/Campo_Grande'
  }, {
    key: 'America/Caracas'
  }, {
    key: 'America/Cuiaba'
  }, {
    key: 'America/Curacao'
  }, {
    key: 'America/Glace_Bay'
  }, {
    key: 'America/Goose_Bay'
  }, {
    key: 'America/Grand_Turk'
  }, {
    key: 'America/Guyana'
  }, {
    key: 'America/Halifax'
  }, {
    key: 'America/La_Paz'
  }, {
    key: 'America/Manaus'
  }, {
    key: 'America/Martinique'
  }, {
    key: 'America/Moncton'
  }, {
    key: 'America/Port_of_Spain'
  }, {
    key: 'America/Porto_Velho'
  }, {
    key: 'America/Puerto_Rico'
  }, {
    key: 'America/Santiago'
  }, {
    key: 'America/Santo_Domingo'
  }, {
    key: 'America/Thule'
  }, {
    key: 'Antarctica/Palmer'
  }, {
    key: 'Atlantic/Bermuda'
  }, {
    key: 'Etc/GMT+4'
  }, {
    key: 'America/Atikokan'
  }, {
    key: 'America/Bogota'
  }, {
    key: 'America/Cancun'
  }, {
    key: 'America/Detroit'
  }, {
    key: 'America/Eirunepe'
  }, {
    key: 'America/Guayaquil'
  }, {
    key: 'America/Havana'
  }, {
    key: 'America/Indiana/Indianapolis'
  }, {
    key: 'America/Indiana/Marengo'
  }, {
    key: 'America/Indiana/Petersburg'
  }, {
    key: 'America/Indiana/Vevay'
  }, {
    key: 'America/Indiana/Vincennes'
  }, {
    key: 'America/Indiana/Winamac'
  }, {
    key: 'America/Iqaluit'
  }, {
    key: 'America/Jamaica'
  }, {
    key: 'America/Kentucky/Louisville'
  }, {
    key: 'America/Kentucky/Monticello'
  }, {
    key: 'America/Lima'
  }, {
    key: 'America/Nassau'
  }, {
    key: 'America/New_York'
  }, {
    key: 'America/Nipigon'
  }, {
    key: 'America/Panama'
  }, {
    key: 'America/Pangnirtung'
  }, {
    key: 'America/Port-au-Prince'
  }, {
    key: 'America/Rio_Branco'
  }, {
    key: 'America/Thunder_Bay'
  }, {
    key: 'America/Toronto'
  }, {
    key: 'EST'
  }, {
    key: 'EST5EDT'
  }, {
    key: 'Etc/GMT+5'
  }, {
    key: 'America/Bahia_Banderas'
  }, {
    key: 'America/Belize'
  }, {
    key: 'America/Chicago'
  }, {
    key: 'America/Costa_Rica'
  }, {
    key: 'America/El_Salvador'
  }, {
    key: 'America/Guatemala'
  }, {
    key: 'America/Indiana/Knox'
  }, {
    key: 'America/Indiana/Tell_City'
  }, {
    key: 'America/Managua'
  }, {
    key: 'America/Matamoros'
  }, {
    key: 'America/Menominee'
  }, {
    key: 'America/Merida'
  }, {
    key: 'America/Mexico_City'
  }, {
    key: 'America/Monterrey'
  }, {
    key: 'America/North_Dakota/Beulah'
  }, {
    key: 'America/North_Dakota/Center'
  }, {
    key: 'America/North_Dakota/New_Salem'
  }, {
    key: 'America/Rainy_River'
  }, {
    key: 'America/Rankin_Inlet'
  }, {
    key: 'America/Regina'
  }, {
    key: 'America/Resolute'
  }, {
    key: 'America/Swift_Current'
  }, {
    key: 'America/Tegucigalpa'
  }, {
    key: 'America/Winnipeg'
  }, {
    key: 'CST6CDT'
  }, {
    key: 'Etc/GMT+6'
  }, {
    key: 'Pacific/Easter'
  }, {
    key: 'Pacific/Galapagos'
  }, {
    key: 'America/Boise'
  }, {
    key: 'America/Cambridge_Bay'
  }, {
    key: 'America/Chihuahua'
  }, {
    key: 'America/Creston'
  }, {
    key: 'America/Dawson_Creek'
  }, {
    key: 'America/Denver'
  }, {
    key: 'America/Edmonton'
  }, {
    key: 'America/Fort_Nelson'
  }, {
    key: 'America/Hermosillo'
  }, {
    key: 'America/Inuvik'
  }, {
    key: 'America/Mazatlan'
  }, {
    key: 'America/Ojinaga'
  }, {
    key: 'America/Phoenix'
  }, {
    key: 'America/Yellowknife'
  }, {
    key: 'Etc/GMT+7'
  }, {
    key: 'MST'
  }, {
    key: 'MST7MDT'
  }, {
    key: 'America/Dawson'
  }, {
    key: 'America/Los_Angeles'
  }, {
    key: 'America/Tijuana'
  }, {
    key: 'America/Vancouver'
  }, {
    key: 'America/Whitehorse'
  }, {
    key: 'Etc/GMT+8'
  }, {
    key: 'Pacific/Pitcairn'
  }, {
    key: 'PST8PDT'
  }, {
    key: 'America/Anchorage'
  }, {
    key: 'America/Juneau'
  }, {
    key: 'America/Metlakatla'
  }, {
    key: 'America/Nome'
  }, {
    key: 'America/Sitka'
  }, {
    key: 'America/Yakutat'
  }, {
    key: 'Etc/GMT+9'
  }, {
    key: 'Pacific/Gambier'
  }, {
    key: 'Pacific/Marquesas'
  }, {
    key: 'America/Adak'
  }, {
    key: 'Etc/GMT+10'
  }, {
    key: 'HST'
  }, {
    key: 'Pacific/Honolulu'
  }, {
    key: 'Pacific/Rarotonga'
  }, {
    key: 'Pacific/Tahiti'
  }, {
    key: 'Etc/GMT+11'
  }, {
    key: 'Pacific/Niue'
  }, {
    key: 'Pacific/Pago_Pago'
  }, {
    key: 'Etc/GMT+12'
  }];

  attrNames: any[] = [{
    key: 'web.reportColor',
    valueType: 'color'
  }, {
    key: 'devicePassword',
    valueType: 'string'
  }, {
    key: 'processing.copyAttributes',
    valueType: 'string'
  }, {
    key: 'decoder.timezone',
    valueType: 'string',
    dataType: 'timezone'
  },
  {
    key: 'speedLimit',
    valueType: 'number',
    dataType: 'speed'
  }, {
    key: 'report.ignoreOdometer',
    valueType: 'boolean'
  }]

  constructor(private modalService: NgbModal, public CommonService: CommonServiceService, private ajax: RestService) { }

  @ViewChild('DeviceForm') deviceForm: NgForm;
  @ViewChild('deviceclose') closedeviceform: any;
  @ViewChild('Device') Device: any;
  apiurladd: string = "http://13.232.8.87:8082/api/devices/";
  apiurlGetGroup: string = "http://13.232.8.87:8082/api/groups/";
  groups: any = [];
  category: any = ['arrow', 'default', 'animal', 'bicycle', 'boat', 'bus', 'car', 'train', 'hellicopter'];
  attributes: any = {};
  attributeNameSelected: string = '';
  attributeIndex: string = '';
  editDevice: boolean = false;


  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  onAttrNameChange(val) {
    this.attributeNameSelected = val;
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

  ngOnInit() {
    this.ajax.get(this.apiurlGetGroup, httpOptions).then((data) => {
      this.groups = data;
    }).catch(error => {
      console.error(error);
    });

    this.CommonService.deviceDetailsEdit.subscribe((data) => {
      this.editDevice = true;
      this.model = data;
      this.attributes = data.attributes;
      this.open(this.Device);
    })
  }



  AddSubmit(data: NgForm, closeModal: any) {
    let deviceData = data.value;
    var device = {
      "attributes": this.attributes,
      "groupId": deviceData.groupId,
      "name": deviceData.name,
      "uniqueId": deviceData.uniqueId,
      "phone": deviceData.phone,
      "model": deviceData.model,
      "contact": deviceData.contact,
      "category": deviceData.category,
      "disabled": deviceData.disabled ? true : false
    };

    if (this.editDevice) {
      device['id'] = this.model.id;
      this.ajax.editDevice(this.apiurladd + this.model.id, device, httpOptions).then((value) => {
        data.reset();
        closeModal.click();
        this.ajax.get(this.apiurladd, httpOptions).then((value) => {
          this.CommonService.deviceemit(value)
        }).catch(() => {
          console.error('error happened');
        });
      }).catch(() => {
        console.log('error happened');
      });
    } else {
      this.ajax.addDevice(this.apiurladd, device, httpOptions).then((value) => {
        data.reset();
        closeModal.click();
        this.ajax.get(this.apiurladd, httpOptions).then((value) => {
          this.CommonService.deviceemit(value)
        }).catch(() => {
          console.error('error happened');
        });
      }).catch(() => {
        console.log('error happened');
      });
    }


  }

  openDevice(modal) {
    this.editDevice = false;
    this.model = {};
    this.attributes = {};
    this.open(modal);
  }

  getKeys(arr) {
    return Object.keys(arr);
  }


  AddAttributeSubmit(formdata: NgForm, closeModal: any) {
    if (formdata.value.name == "report.ignoreOdometer") {
      this.attributes[formdata.value.name] = formdata.value.value ? true : false;
    } else {
      this.attributes[formdata.value.name] = formdata.value.value;
    }

    formdata.reset();
    closeModal.click();
  }

  editAttr(modal) {
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
