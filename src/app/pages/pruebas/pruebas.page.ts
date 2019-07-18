import { Component, OnInit } from '@angular/core';
import { SERVER_DB } from '../../global/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DBquery } from '../../interfaces/dbInterfaces';

@Component({
  selector: 'app-pruebas',
  templateUrl: './pruebas.page.html',
  styleUrls: ['./pruebas.page.scss'],
})
export class PruebasPage implements OnInit {

  nomtabla: string;
  opciones: DBquery;

  constructor( private http: HttpClient ) { }

  ngOnInit() {
    console.log('ngOnInit en Pruebas');
    this.nomtabla = 'companias';
    this.opciones =  {
      nombreID: 'idcompania',
      nombreCampo: 'compania'
     };
    // this.peticionREST();
  }

  peticionREST() {

    const headers =  new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const params = new HttpParams().set('db_nombre', 'maximilian')
                              .set('contenido', 'hola caracola')
                              .set('where', `campo like 'moztezuma%' and id > 6`);


    // la petición tipo GET no puede mandar un body, por lo tanto
    // se envían headers, que serán capturados
    this.http.get(`${SERVER_DB}/nombre/este_id`, {headers, params}  )
      .subscribe(  (resp: any) => {
        console.log('response:', resp);
      });
  }

}
