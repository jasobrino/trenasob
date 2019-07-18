import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SERVER_DB } from '../global/environment';
import { delay } from 'rxjs/internal/operators';
import { DBquery, Ilista } from '../interfaces/dbInterfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  // simulamos una espera con delay
  delayValue = 500;

  // con la llamada a cargarFijas() se preparan los arrays para contener las tablas fijas
  companias: Ilista[] = [];
  ramos: Ilista[] = [];

  headers =  new HttpHeaders({
    'Content-Type': 'application/json'
  });

  // objeto observable para capturar la respuesta http
  observable: Observable<object>;

  constructor( private http: HttpClient ) { }


  getTabla( tabla: string, opt: DBquery = {} ) {

    opt.headers = this.headers;

    // this.observable = this.http.get(`${SERVER_DB}/consulta/${tabla}`, {headers: this.headers}  )
    //         .pipe(delay(this.delayValue));

    this.observable = this.http.post(`${SERVER_DB}/consulta/${tabla}`, opt  )
                     .pipe(delay(this.delayValue));

    // devolvemos el objeto post convertido en una promesa
    return this.observable.toPromise();

  }

  updateTabla( tabla: string, opt: DBquery) {

    opt.headers = this.headers;

    return this.http.put(`${SERVER_DB}/modificar/${tabla}`, opt).toPromise();
  }


  // carga las tablas fijas en sus correspondientes arrays
  cargaFijas() {
    // cargamos las tablas
    let query: DBquery = { campos: 'idramo as ID, ramo as campo', where: `idramo>0` };
    const prRamos: Promise<any> = this.getTabla( 'ramos', query )
      .then( (resp: any) => {
        console.log('getTabla ramos:', resp);
        this.ramos = resp.data;
        return 'tabla ramos preparada';
      });
    query = { campos: 'idcompania as ID, compania as campo' };
    const prCompanias: Promise<any> = this.getTabla( 'companias', query )
      .then( (resp: any) => {
        console.log('getTabla companias:', resp);
        this.companias = resp.data;
        return 'tabla compañias preparada';
      });

    return Promise.all( [prCompanias, prRamos] );

  }

  // devuelve una promesa con la imagen a cargar
  cargaArchivo( nombre: string ) {

   return this.http.get(`${SERVER_DB}/documento/${nombre}`, { responseType: 'blob' }).toPromise();
   }

}
