import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { DBquery } from '../../interfaces/dbInterfaces';
import { ListatablaComponent } from '../listatabla/listatabla.component';

@Component({
  selector: 'app-modal-tabla',
  templateUrl: './modal-tabla.component.html',
  styleUrls: ['./modal-tabla.component.scss'],
})
export class ModalTablaComponent implements OnInit {

  @Input() nomtabla: string;
  @Input() opciones: DBquery;
  // para poder leer atributos desde el componente hijo listatabla
  @ViewChild('listatabla') listatabla: ListatablaComponent;

  activaGuardar = true;

  // la propiedad componentProps tambien puede ser accedida desde navParams
  constructor( private navParms: NavParams,
               private modalCtrl: ModalController ) {

    console.log('navParms:', this.navParms.data);

   }


  ngOnInit() { }

  cerrar() {
    // pueden ser devuelto un objeto al componente padre
    this.modalCtrl.dismiss({
      datos: 'datos devueltos desde ventanaModal'
    });
  }

  guardar() {
    this.activaGuardar = false;
    console.log('guardando datos:', this.listatabla.lista);
  }
}
