import { ErrorHandler, Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable()
export class MyErrorHandler implements ErrorHandler {
    constructor(private alertController: AlertController) { }

    async handleError(err) {
        console.error(err);
        const alert = await this.alertController.create({ message: err, buttons: ['OK'] });
        alert.present();
    }
}
