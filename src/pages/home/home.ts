import { Component } from '@angular/core';
import { NavController, ToastController, AlertController } from 'ionic-angular';
import { AddEntityPage } from '../add-entity/add-entity';
import { NativeStorage } from '@ionic-native/native-storage';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation,
  MyLocation
 } from '@ionic-native/google-maps';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user={
    username:'',
    name:''
  };
  mapReady: boolean = false;
  map: GoogleMap;
  entity_list:any;
  entities:any;
  constructor(public navCtrl: NavController,
    private nativeStorage: NativeStorage,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    ) {
    this.user.username='sahaj'
    this.user.name='Sahaj Agarwal'
    this.nativeStorage.getItem('entity_list').then(
      (data) => {
        this.entity_list=data;
        this.entities=[];
        for(const x of this.entity_list) {
          this.nativeStorage.getItem(x).then(
            (data) =>{
              this.entities.push(data);
              this.map.addMarker({
                title: data.name+'\nLatitude: '+data.lat+'\nLongitude: '+data.long,
                snippet: '',
                position: {lat: data.lat,lng: data.long },
                animation: GoogleMapsAnimation.BOUNCE
              });
            }
          );
        }
      }
    );
  }
  ionViewDidLoad(){
    this.loadMap();
  }
  loadMap(){

    // Create a map after the view is loaded.
   // (platform is already ready in app.component.ts)
   this.map = GoogleMaps.create('map_canvas', {
     camera: {
       target: {
         lat: 13.5619761,
         lng: 80.0235798
       },
       zoom: 18,
       tilt: 30
     }
     
   });

   // Wait the maps plugin is ready until the MAP_READY event
   this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
     this.mapReady = true;
     this.map.setMyLocationEnabled(true);
   });
 }
 showToast(message: string) {
  let toast = this.toastCtrl.create({
    message: message,
    duration: 2000,
    position: 'bottom'
  });

  toast.present(toast);
}
 /* onButtonClick() {
  if (!this.mapReady) {
    this.showToast('map is not ready yet. Please try again.');
    return;
  }
  this.map.clear();

  // Get the location of you
  this.map.getMyLocation()
    .then((location: MyLocation) => {
      console.log(JSON.stringify(location, null ,2));

      // Move the map camera to the location with animation
      return this.map.animateCamera({
        target: location.latLng,
        zoom: 17,
        tilt: 30
      }).then(() => {
        // add a marker
        return this.map.addMarker({
          title: 'Your Location\nLatitude: '+location.latLng.lat+'\nLongitude: '+location.latLng.lng,
          snippet: '',
          position: location.latLng,
          animation: GoogleMapsAnimation.BOUNCE
        });
      })
    }).then((marker: Marker) => {
      // show the infoWindow
      marker.showInfoWindow();

      // If clicked it, display the alert
      marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      });
    });
} */
  clear(){
    this.entities=[];
    for(const x in this.entity_list){
      this.nativeStorage.remove(x);
    }
    this.nativeStorage.remove('entity_list');
    this.entity_list=[];
  }
  addNew(){
    this.navCtrl.push(AddEntityPage,{'user':this.user});
  }
}
