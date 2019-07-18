import { Component, OnInit, Input } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { DBquery, Ilista } from '../../interfaces/dbInterfaces';
import { IonInput, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-listatabla',
  templateUrl: './listatabla.component.html',
  styleUrls: ['./listatabla.component.scss'],
})
export class ListatablaComponent implements OnInit {

  @Input() nomtabla: string;
  @Input() opciones: DBquery;

  lista: Ilista[] = [];
  ItemlengthMin = 3;

  constructor( public dbs: DatabaseService,
               private toastCtrl: ToastController ) {
  }

  ngOnInit() {
    // cargamos la tabla fija en lista
    console.log('en listatabla:', this.nomtabla, this.opciones);
    this.cargarTablaFija();
  }

  cargarTablaFija() {
    // console.log('nomtabla: ', this.nomtabla);
    // console.log('opciones: ', this.opciones);
    this.opciones.where = undefined; // debemos cargar todos los registros
    // creamos los campos en la página modal
    this.opciones.campos = `${this.opciones.nombreID} as ID, ${this.opciones.nombreCampo} as campo`;
    this.dbs.getTabla( this.nomtabla, this.opciones )
      // .subscribe( (resp: DBresp) => {
      .then(  (resp: any) => {
        console.log('resp:', resp);
        if ( resp.ok ) {
          this.lista = resp.data;
          console.log('registros:', resp.count);
          // console.log('data:', this.lista);
        } else {
          console.log('REST server error:', resp.err);
        }
      })
      .catch( err => {
        console.log('getTabla: ', err);
      });
  }

  onchange(event) {
    console.log('onChange:', event);
  }

  onInput(event, input: IonInput) {
    const valor = input.value.toLocaleUpperCase();
    input.value = valor;
    // console.log('value:', valor);
  }


  editar( item: Ilista, input: IonInput ) {
    console.log('editar:', item);
    // console.log('input:', input);
    input.readonly = false;
    input.setFocus();
  }


  onblur( event: CustomEvent, input: IonInput, item: Ilista ) {
    const target = event.target;
    // console.log('composedPath:', event.composedPath());
    // console.log('event:', target);
    // Comprobación si el elemento es válido para su modificación
    if ( input.readonly || input.value.length < this.ItemlengthMin) {
      input.value = item.campo;
      input.readonly = true;
      return;
    }
    console.log('onblur-item:', item);
    console.log('onblur:', input.value );

    // comprobamos si ya existe el elemento en la lista
    const valorNuevo = input.value.trim(); // limpiamos espacios del campo

    this.actualiarRegistro( valorNuevo, item )
      .then( (resp: string) => {
        this.mostrarToast( resp );
      })
      .catch( err => {
        this.mostrarToast( err, 'danger' );
        input.value = item.campo;
      });
    // // creamos un array con los valores de cada campo
    // const elementos = this.lista.map( (el: Ilista) => el.campo );
    // if (elementos.find((elemento) => elemento === valorNuevo ) ) {
    //   this.mostrarToast(`${valorNuevo} ya se encuentra en la lista`, 'danger');
    //   input.value = item.campo;
    // } else {
    //   // ahora modificamos el elemento de la lista
    //   // preparamos los campos del update
    //   this.opciones.set = `${this.opciones.nombreCampo}='${valorNuevo}'`;
    //   this.opciones.where = `${this.opciones.nombreID}=${item.ID}`;
    //   this.dbs.updateTabla( this.nomtabla, this.opciones )
    //     .then( (resp: any) => {
    //       if ( resp.ok ) {
    //         console.log('update tabla:', resp);
    //         this.mostrarToast( `modificado ${valorNuevo}\nRegistros afectados: ${resp.data.changedRows}` );
    //         this.cargarTablaFija();
    //         }
    //       })
    //       .catch( e => {
    //         console.log('Update error:', e);
    //         this.mostrarToast(`error en la actualización\n${e.error.err.err.sqlMessage}`);
    //         this.cargarTablaFija();
    //     });
    // }

    input.readonly = true;
  }


  // actualiza el registro de base de datos
  actualiarRegistro( valorNuevo: string, item: Ilista ) {

    return new Promise( (resolve, reject) => {
      // creamos un array con los valores de cada campo
      const elementos = this.lista.map( (el: Ilista) => el.campo );
      if (elementos.find((elemento) => elemento === valorNuevo ) ) {
        // el elemento no puede actualizarse porque ya existe
        reject(`${valorNuevo} ya se encuentra en la lista`);
        // input.value = item.campo;
      } else {
        // ahora modificamos el elemento de la lista
        // preparamos los campos del update
        this.opciones.set = `${this.opciones.nombreCampo}='${valorNuevo}'`;
        this.opciones.where = `${this.opciones.nombreID}=${item.ID}`;
        this.dbs.updateTabla( this.nomtabla, this.opciones )
          .then( (resp: any) => {
            if ( resp.ok ) {
              console.log('update tabla:', resp);
              this.cargarTablaFija();
              resolve( `modificado ${valorNuevo}\nRegistros afectados: ${resp.data.changedRows}`);
              }
            })
            .catch( e => {
              console.log('Update error:', e);
              const errMensaje = e.error.err.err.sqlMessage;
              this.cargarTablaFija();
              reject(`error en la actualización\n${errMensaje}`);
          });
      }
    });

  }


  async mostrarToast( message: string, color: string = 'primary' ) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      position: 'top',
      color
    });
    toast.present();
  }


}

