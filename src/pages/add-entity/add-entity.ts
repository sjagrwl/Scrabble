import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { NativeStorage } from '@ionic-native/native-storage';
import { HomePage } from '../home/home';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the AddEntityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-entity',
  templateUrl: 'add-entity.html',
})
export class AddEntityPage {

  imageURL:any;
  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  user:any;
  entity={
    name:'',
    description:'',
    imageURL: '',
    lat: -1,
    long:-1,
  };
  entity_list:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private camera: Camera,
    private nativeStorage: NativeStorage,
    private toastCtrl:ToastController,
    private geolocation: Geolocation,
  ) {
    this.user=this.navParams.get('user');
    this.nativeStorage.getItem('entity_list').then(
      (data) =>{
        this.entity_list=data;
        console.log(data);
      },
      (error) => {
        this.entity_list=[];
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEntityPage');
  }
  takePhoto(){
    this.camera.getPicture(this.options).then((imageData) => {
       this.entity.imageURL = imageData
    }, (err) => {
       console.log(err);
    });
  }
  add_location(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.entity.lat=resp.coords.latitude;
      this.entity.long=resp.coords.longitude;
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }
  saveEntity(){
    var name=new Date().getDate().toString();
    this.entity_list.push(this.user.name+'_'+this.entity.name+'_'+name);
    console.log(this.entity_list);
    this.nativeStorage.setItem('entity_list',this.entity_list).then(
      (success) => {
      this.nativeStorage.setItem(this.user.name+'_'+this.entity.name+'_'+name,this.entity).then(
        (success) =>{
          let toast = this.toastCtrl.create({
            message: "Entity Added Successfully",
            duration: 3000,
            position: 'bottom'
            });
            toast.present();
            this.navCtrl.setRoot(HomePage);
        },
        (error)=> {

        });
      });
  }
}
