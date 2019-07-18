import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import * as FileSaver from 'file-saver';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { LoadingController, AlertController } from '@ionic/angular';
var ArchivosService = /** @class */ (function () {
    function ArchivosService(dbs, loadingCtrl, alertCtrl, file, fileOpener, platform) {
        this.dbs = dbs;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.file = file;
        this.fileOpener = fileOpener;
        this.platform = platform;
        this.dirAndroid = this.file.externalRootDirectory; // this.file.dataDirectory;
    }
    // recibe la ruta con el archivo a guardar
    ArchivosService.prototype.guardar = function (ruta) {
        var campos = ruta.split('/');
        var nombreFichero = campos.pop();
        console.log('guardando archivo ', nombreFichero);
        FileSaver.saveAs(ruta, nombreFichero);
        console.log('documento guardado.');
    };
    // Solicita el archivo al servidor REST y lo guarda en local
    // pasos: dbs.cargaArchivo devuelve una promesa con un BLOB
    //        FileSaver.saveAs guarda el blob en el disco local
    //        la promesa es pasada al loading y cuando acaba cierra el loading
    ArchivosService.prototype.guardarBLOB = function (archivo) {
        var _this = this;
        if (archivo === void 0) { archivo = ''; }
        this.mostrarLoading("cargando " + archivo)
            .then(function (resp) { return _this.dbs.cargaArchivo(archivo); })
            .then(function (data) { return FileSaver.saveAs(data, archivo); })
            .then(function () { return _this.loading.dismiss(); })
            .catch(function (err) {
            console.log('error en guardar blob:');
            console.log(JSON.stringify(err));
            _this.loading.dismiss();
            if (err.status === 404) { // no existe el fichero en el server
                _this.mostrarAlert("el archivo " + archivo + " no existe");
            }
            else {
                _this.mostrarAlert(JSON.stringify(err));
            }
        });
    };
    ArchivosService.prototype.guardarMovil = function (nomFich) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var extension, tipoMime;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                extension = nomFich.split('.').pop().toLocaleLowerCase();
                switch (extension) {
                    case 'jpeg':
                    case 'jpg':
                        tipoMime = 'image/jpeg';
                        break;
                    case 'png':
                        tipoMime = 'image/png';
                        break;
                    case 'pdf':
                        tipoMime = 'application/pdf';
                        break;
                    case 'mp4':
                        tipoMime = 'video/mp4';
                        break;
                }
                // y ahora podemos guardar el archivo    
                this.dbs.cargaArchivo(nomFich)
                    // una vez obtenido el blob del servidor, procedemos a guardar el archivo en el dispositivo
                    .then(function (data) { return _this.file.writeFile(_this.dirAndroid + "/Download", nomFich, data, { replace: true }); })
                    .then(function () { return _this.fileOpener.open(_this.dirAndroid + "/Download/" + nomFich, tipoMime); })
                    .then(function () { return console.log("archivo " + nomFich + " creado en /Download."); })
                    .catch(function (err) { return console.log(JSON.stringify(err)); });
                return [2 /*return*/];
            });
        });
    };
    ArchivosService.prototype.crearDirectorioMovil = function (dirName) {
        var _this = this;
        this.platform.ready()
            // comprobamos que el directorio exista
            .then(function () { return _this.file.checkDir(_this.dirAndroid, dirName); })
            .then(function (_) {
            console.log("directorio " + dirName + " localizado en " + _this.dirAndroid);
        })
            .catch(function (err) {
            _this.file.createDir(_this.dirAndroid, dirName, false)
                .then(function () { return console.log("creado directorio " + dirName + " en " + _this.dirAndroid); });
        });
    };
    ArchivosService.prototype.mostrarLoading = function (message) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadingCtrl.create({
                                message: message
                            })];
                    case 1:
                        _a.loading = _b.sent();
                        return [2 /*return*/, this.loading.present()];
                }
            });
        });
    };
    ArchivosService.prototype.mostrarAlert = function (message) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'ERROR',
                            message: message,
                            buttons: ['cerrar']
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ArchivosService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [DatabaseService,
            LoadingController,
            AlertController,
            File,
            FileOpener,
            Platform])
    ], ArchivosService);
    return ArchivosService;
}());
export { ArchivosService };
//# sourceMappingURL=archivos.service.js.map