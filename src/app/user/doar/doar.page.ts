import { Component, OnInit } from '@angular/core';

// 1) Importa dependências
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-doar',
  templateUrl: './doar.page.html',
  styleUrls: ['./doar.page.scss'],
})
export class DoarPage implements OnInit {

  userData: any;

  constructor(

    // 2) Injeta dependências
    public auth: AngularFireAuth,
    private router: Router,
    public alert: AlertController,
    public afs: AngularFirestore, // Firestore
  ) { }

  ngOnInit() { }

  // 4) Método de login
  doar() {
    this.auth.onAuthStateChanged(

      // Se o login funcionar

        (data: any) => {

          // console.log(data.uid);

          this.afs.firestore.doc(`doadores/${data.uid}`).get()
            .then((uData) => {

              // Se tem perfil
              if (uData.exists) {
                this.feedback(
                  data.user.displayName,
                  'Você já pode acessar o página de doação.',
                  '/user/profile'
                );
              } else {
                this.feedback(
                  data.displayName,
                  'Você precisa completar seu cadastro para acessar a página de doação.',
                  '/logindoar'
                );
              }
            });
        }
      );


  }

  // 5) Feeback e saida da página
  async feedback(userName: string, message: string, routerLink: string) {
    const alert = await this.alert.create({
      header: `Olá ${userName}!`,
      message: message,
      buttons: [{
        text: 'OK',
        handler: () => {
          this.router.navigate([routerLink]);
        }
      }]
    });

    await alert.present();



}

}

