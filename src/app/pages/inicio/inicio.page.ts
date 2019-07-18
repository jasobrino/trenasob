import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { Ilista } from '../../interfaces/dbInterfaces';
import { PopoverController, LoadingController, ModalController, Platform } from '@ionic/angular';
import { PopoverComponent } from '../../components/popover/popover.component';
import { ModalTablaComponent } from '../../components/modal-tabla/modal-tabla.component';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { ArchivosService } from '../../services/archivos.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  verCompanias = false;
  pagPreparada = false;
  loading: any;

  // contiene el objeto imagen y su url local
  data: object;
  imagenURL: string;

  // archivo a guardar/mostrar
  nomArchivo = 'Mapa.pdf';

  ramo: any = {campo: 'LOBEZNO'};
  compania: Ilista = {ID: 0, campo: ''};


  constructor( public dbs: DatabaseService,
               private popoverCtrl: PopoverController,
               private modalCtrl: ModalController,
               private loadingCtrl: LoadingController,
               private fileOpener: FileOpener,
               private platform: Platform,
               private archivos: ArchivosService ) { }

  ngOnInit() {
    // this.imagenURL = '../../assets/icon/favicon.png';

    // tenemos que esperar que se cree el objeto loading antes de llamar a dismiss
    this.mostrarLoading('Cargando datos...')
      .then ( (resp: any) => this.dbs.cargaFijas() )
      .then( (resp: any) => {
        console.log( resp );
        this.pagPreparada = true;
        console.log('carga finalizada onInit');
        this.loading.dismiss();
      })
      .catch( err => {
        console.log('cargaFijas error:', JSON.stringify(err));
      });

  }

  cargaImagen( nombre: string) {
    this.dbs.cargaArchivo(nombre)
    .then( data => {
      this.data = data;
      const dataURL = URL.createObjectURL(this.data);
      console.log('archivo:', data);
      console.log('url archivo:', dataURL);
      if ( data.type.match('^image')) {
        this.imagenURL = dataURL;
      }
      if (data.type.match('application/pdf')) {
        console.log('mostrando el pdf...');
        this.fileOpener.open(dataURL, 'application/pdf')
          .then(() => console.log('pdf abierto'))
          .catch( err => console.log( JSON.stringify(err) ));
        }
    })
    .catch( err => {
      console.log('No se pudo recuperar el archivo', err);
    });

  }

  procesaFich() {
    if ( this.platform.is('android') ) {
      this.archivos.guardarMovil(this.nomArchivo);
    } else {
      // navegador
      this.archivos.guardarBLOB(this.nomArchivo);
    }
  }



  selRamo( event ) {
    if ( this.dbs.ramos.length > 0 ) {
      this.mostrarPop( event, this.dbs.ramos )
        .then( resp => {
          console.log(resp);
          if ( resp.data ) {
            this.ramo = resp.data;
          }
        });
    }
  }

  selCompania( event ) {
    if ( this.dbs.companias.length > 0 ) {
      this.mostrarPop( event, this.dbs.companias )
        .then( resp => {
          console.log(resp);
          if ( resp.data ) {
            this.compania = resp.data;
          }
        });
    }
  }

  async mostrarModal() {
    const modal = await this.modalCtrl.create({
      component: ModalTablaComponent,
      componentProps: {
       nomtabla: 'companias',
       opciones: { 
        //  campos: 'idcompania as ID, compania as campo',
         nombreID: 'idcompania',
         nombreCampo: 'compania'
        }
     }
    });
    await modal.present();
    // este listener se diparará cuando se cierre el modal, capturando data
    const { data } =  await modal.onDidDismiss();
    console.log('Retorno del modal', data);
  }

  async mostrarLoading( message: string ) {
    this.loading = await this.loadingCtrl.create({
      message
    });
    return this.loading.present();
  }

  async mostrarPop( event, valores ) {

    const popover = await this.popoverCtrl.create({
      component: PopoverComponent,
      componentProps: { lista: valores }, // valores a representar
      event,
      mode: 'ios',
      backdropDismiss: true // false: no se puede cerrar pulsando fuera del elemento
    });

    // presentamos el popover
    popover.present();

    // onWillDismiss no espera a que se cierre el componente,
    // se lanza el evento mientras se cierra
    return await popover.onWillDismiss();

  }


}
