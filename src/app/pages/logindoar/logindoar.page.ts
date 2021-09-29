import { Component, OnInit } from '@angular/core';

// 1) Importa dependências
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatePipe } from '@angular/common';

// Alert Controller
import { AlertController } from '@ionic/angular';

// Usuário autenticado
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

// 6) Não permite somente espaços nos campos
export function removeSpaces(control: AbstractControl) {
  if (control && control.value && !control.value.replace(/\s/g, '').length) {
    control.setValue('');
  }
  return null;
}

@Component({
  selector: 'app-logindoar',
  templateUrl: './logindoar.page.html',
  styleUrls: ['./logindoar.page.scss'],
})
export class LogindoarPage implements OnInit {
  // 3) Atributos
  public doarForm: FormGroup; // Contém o formulário de cadastro
  public pipe = new DatePipe('en_US'); // Formatar as datas

  constructor(
    // 2) Injeta dependências
    public form: FormBuilder,
    public afs: AngularFirestore,

    // Alert Controller
    public alert: AlertController,

    // Usuário autenticado
    public auth: AngularFireAuth,

    // routerLInk
    public router: Router
  ) {}

  ionViewWillEnter() {
    this.auth.onAuthStateChanged((userData) => {
      if (userData) {
        this.afs.firestore
          .doc(`register/${userData.uid}`)
          .get()
          .then((uData) => {
            // Se não tem perfil
            if (uData.exists) {
              this.router.navigate(['/user/profile']);
            }
          });
      }
    });
  }

  ngOnInit() {
    // 4) Cria o formulário de contatos
    this.doarFormCreate();

    // Preenche os campos se usuário está logado
    if (this.doarForm) {
      this.auth.onAuthStateChanged((userData) => {
        if (userData) {
          this.doarForm.controls.uid.setValue(userData.uid.trim());
        }
      });
    }
  }

  // 5) Cria o formulário de contatos
  doarFormCreate() {
    // 'adotarForm' contém o formulário
    // Um formulário é um 'agrupamento' (group) de campos...
    this.doarForm = this.form.group({
      uid: [''],
      nomedoanimal: ['', Validators.compose([Validators.required, removeSpaces])],
      raca: ['', Validators.compose([Validators.required, removeSpaces])],
      datadenascieidade:['', Validators.compose([Validators.required])],
      especie:['', Validators.compose([Validators.required, removeSpaces])],
      vacina:['',],
      datainclusao:['', Validators.compose([Validators.required, removeSpaces])],
      descricao:['', Validators.compose([Validators.required, removeSpaces])],
      nomedoador:['', Validators.compose([Validators.required, removeSpaces])],
      fotodoanimal:[''],
      motivodadoacao:['', Validators.compose([Validators.required, removeSpaces])],

    });
  }

  // 7) Processa o envio do formulário]
  registerSend() {
    // Cria e formata a data
    this.doarForm.controls.date.setValue(
      this.pipe.transform(Date.now(), 'yyyy-MM-dd HH:mm:ss').trim()
    );

    // Salva em um novo documento do Firebase Firestore
    this.afs
      .collection('doadores')
      .doc(this.doarForm.value.uid)
      .set(this.doarForm.value)
      .then(() => {
        // Feedback
        this.presentAlert();
      })
      .catch(
        // Exibe erro se não salvar
        (error) => {
          alert('Erro ao cadastrar.' + error);
        }
      );
  }

  // Feedback
  // Exibe feedback
  async presentAlert() {
    const alert = await this.alert.create({
      header: 'Oba!',
      message: 'Cadastro realizado com sucesso!',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            // Reset do formulário
            this.doarForm.reset();

            // Vai para perfil
            this.router.navigate(['/user/profile']);
          },
        },
      ],
    });

    await alert.present();
  }
}
