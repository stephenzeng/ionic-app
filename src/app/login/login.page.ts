import { Component, OnInit } from '@angular/core';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { NavController, AlertController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private faio: FingerprintAIO, private navControoler: NavController,
    private alertController: AlertController, private platform: Platform, private camera: Camera) { }

  ngOnInit() {
  }

  async onCheckPlatform() {
    const platforms = this.platform.platforms();
    await this.showAlert(platforms.join());
  }

  async onVerify() {
    const isReady = await this.platform.ready();
    await this.showAlert('isReady: ' + isReady);

    if (isReady) {
      const isAvailable = await this.faio.isAvailable();
      await this.showAlert('isAvailable ' + isAvailable);

      if (isAvailable) {
        const result = await this.faio.show({
          clientId: 'com.daigoushops.app',
          localizedFallbackTitle: 'Pin',
          localizedReason: 'Authenticate'
        });

        if (result) {
          this.navControoler.navigateRoot('home');
        }
      }
    }
  }

  async onOpenCamera() {
    await this.showAlert('camera');
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    const imageData = await this.camera.getPicture(options);
    await this.showAlert(imageData);
  }

  async showAlert(message: string) {
    const alert = await this.alertController.create({ message: message, buttons: ['OK'] });
    alert.present();
  }
}
