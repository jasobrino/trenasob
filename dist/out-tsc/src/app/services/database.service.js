import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SERVER_DB } from '../global/environment';
import { delay } from 'rxjs/internal/operators';
var DatabaseService = /** @class */ (function () {
    function DatabaseService(http) {
        this.http = http;
        // simulamos una espera con delay
        this.delayValue = 500;
        // con la llamada a cargarFijas() se preparan los arrays para contener las tablas fijas
        this.companias = [];
        this.ramos = [];
        this.headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
    }
    DatabaseService.prototype.getTabla = function (tabla, opt) {
        if (opt === void 0) { opt = {}; }
        opt.headers = this.headers;
        this.observable = this.http.post(SERVER_DB + "/consulta/" + tabla, opt)
            .pipe(delay(this.delayValue));
        // devolvemos el objeto post convertido en una promesa
        return this.observable.toPromise();
    };
    DatabaseService.prototype.updateTabla = function (tabla, opt) {
        opt.headers = this.headers;
        return this.http.put(SERVER_DB + "/modificar/" + tabla, opt).toPromise();
    };
    // carga las tablas fijas en sus correspondientes arrays
    DatabaseService.prototype.cargaFijas = function () {
        var _this = this;
        // cargamos las tablas
        var query = { campos: 'idramo as ID, ramo as campo', where: "idramo>0" };
        var prRamos = this.getTabla('ramos', query)
            .then(function (resp) {
            console.log('getTabla ramos:', resp);
            _this.ramos = resp.data;
            return 'tabla ramos preparada';
        });
        query = { campos: 'idcompania as ID, compania as campo' };
        var prCompanias = this.getTabla('companias', query)
            .then(function (resp) {
            console.log('getTabla companias:', resp);
            _this.companias = resp.data;
            return 'tabla compañias preparada';
        });
        return Promise.all([prCompanias, prRamos]);
    };
    // devuelve una promesa con la imagen a cargar
    DatabaseService.prototype.cargaArchivo = function (nombre) {
        return this.http.get(SERVER_DB + "/documento/" + nombre, { responseType: 'blob' }).toPromise();
    };
    DatabaseService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], DatabaseService);
    return DatabaseService;
}());
export { DatabaseService };
//# sourceMappingURL=database.service.js.map