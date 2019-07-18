import { Component, OnInit } from '@angular/core';
import { DBquery } from 'src/app/interfaces/dbInterfaces';

@Component({
  selector: 'app-companias',
  templateUrl: './companias.component.html',
  styleUrls: ['./companias.component.scss'],
})
export class CompaniasComponent implements OnInit {

  // preparamos el entorno para la llamada al componente listatabla
  nomtabla = 'companias';
  opciones: DBquery = { campos: 'idcompania as ID, compania as campo', where: 'idcompania <= 6' };

  constructor() { }

  ngOnInit() {}

}
