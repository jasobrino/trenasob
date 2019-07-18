import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import * as FileSaver from 'file-saver';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';

import { LoadingController, AlertController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class ArchivosService {

  loading: any;
  dirAndroid: string;

  constructor( private dbs: DatabaseService,
               private loadingCtrl: LoadingController,
               private alertCtrl: AlertController,
               private file: File,
               private fileOpener: FileOpener,
               private platform: Platform
    ) {
        this.dirAndroid = this.file.externalRootDirectory; // this.file.dataDirectory;
    }

  // recibe la ruta con el archivo a guardar
  guardar( ruta: string ) {
    const campos = ruta.split('/');
    const nombreFichero = campos.pop();

    console.log('guardando archivo ', nombreFichero);
    FileSaver.saveAs( ruta, nombreFichero);
    console.log('documento guardado.');
  }

  // Solicita el archivo al servidor REST y lo guarda en local
  // pasos: dbs.cargaArchivo devuelve una promesa con un BLOB
  //        FileSaver.saveAs guarda el blob en el disco local
  //        la promesa es pasada al loading y cuando acaba cierra el loading
  guardarBLOB( archivo: string = '' ) {
    this.mostrarLoading(`cargando ${archivo}`)
      .then(resp => this.dbs.cargaArchivo( archivo ))
      .then( (data: Blob) => FileSaver.saveAs(data, archivo) )
      .then( () => this.loading.dismiss() )
      .catch((err) => {
        console.log('error en guardar blob:');
        console.log(JSON.stringify(err));
        this.loading.dismiss();
        if ( err.status === 404 ) { // no existe el fichero en el server
          this.mostrarAlert(`el archivo ${archivo} no existe`);
        } else {
          this.mostrarAlert(JSON.stringify(err));
        }
      });


  }

  async guardarMovil( nomFich: string ) {
    // primero comprobamos que el directorio existe
    // await this.crearDirectorioMovil();

    // comprobacion del tipo de archivo
    const extension = nomFich.split('.').pop().toLocaleLowerCase();
    let tipoMime: string;
    switch (extension) {
      case 'jpeg':
      case 'jpg': tipoMime = 'image/jpeg'; break;
      case 'png': tipoMime = 'image/png'; break;
      case 'pdf': tipoMime = 'application/pdf'; break;
      case 'mp4': tipoMime = 'video/mp4'; break;
    }
    // y ahora podemos guardar el archivo    
    this.dbs.cargaArchivo(nomFich)
      // una vez obtenido el blob del servidor, procedemos a guardar el archivo en el dispositivo
      .then( (data: Blob) => this.file.writeFile( `${this.dirAndroid}/Download`, nomFich, data,  { replace: true }))
      .then ( () => this.fileOpener.open(`${this.dirAndroid}/Download/${nomFich}`, tipoMime ) )
      .then( () => console.log(`archivo ${nomFich} creado en /Download.`))
      .catch( err => console.log(JSON.stringify(err)) );
  }

  crearDirectorioMovil( dirName: string ) {
    this.platform.ready()
      // comprobamos que el directorio exista
      .then( () => this.file.checkDir(this.dirAndroid, dirName ))
      .then( _ => {
        console.log(`directorio ${dirName} localizado en ${this.dirAndroid}`);
      })
      .catch( err =>  {
        this.file.createDir(this.dirAndroid , dirName, false)
          .then( () => console.log(`creado directorio ${dirName} en ${this.dirAndroid}`) );
      });
  }

  async mostrarLoading(message: string) {
    this.loading = await this.loadingCtrl.create({
      message
    });
    return this.loading.present();
  }

  async mostrarAlert(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'ERROR',
      message,
      buttons: ['cerrar']
    });
    await alert.present();
  }

}
