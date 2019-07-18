import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Ilista } from '../../interfaces/dbInterfaces';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  lista: Ilista[];

  constructor( private popoverCtrl: PopoverController ) { }

  ngOnInit() { }

  onClick( seleccion: any ) {
    // console.log('elemento seleccionado en popoverComponent:', seleccion);
    this.popoverCtrl.dismiss( seleccion );
  }


}
