import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { PopoverController, LoadingController, ModalController, Platform } from '@ionic/angular';
import { PopoverComponent } from '../../components/popover/popover.component';
import { ModalTablaComponent } from '../../components/modal-tabla/modal-tabla.component';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { ArchivosService } from '../../services/archivos.service';
var InicioPage = /** @class */ (function () {
    function InicioPage(dbs, popoverCtrl, modalCtrl, loadingCtrl, fileOpener, platform, archivos) {
        this.dbs = dbs;
        this.popoverCtrl = popoverCtrl;
        this.modalCtrl = modalCtrl;
        this.loadingCtrl = loadingCtrl;
        this.fileOpener = fileOpener;
        this.platform = platform;
        this.archivos = archivos;
        this.verCompanias = false;
        this.pagPreparada = false;
        // archivo a guardar/mostrar
        this.nomArchivo = 'Mapa.pdf';
        this.ramo = { campo: 'LOBEZNO' };
        this.compania = { ID: 0, campo: '' };
    }
    InicioPage.prototype.ngOnInit = function () {
        // this.imagenURL = '../../assets/icon/favicon.png';
        var _this = this;
        // tenemos que esperar que se cree el objeto loading antes de llamar a dismiss
        this.mostrarLoading('Cargando datos...')
            .then(function (resp) { return _this.dbs.cargaFijas(); })
            .then(function (resp) {
            console.log(resp);
            _this.pagPreparada = true;
            console.log('carga finalizada onInit');
            _this.loading.dismiss();
        })
            .catch(function (err) {
            console.log('cargaFijas error:', JSON.stringify(err));
        });
    };
    InicioPage.prototype.cargaImagen = function (nombre) {
        var _this = this;
        this.dbs.cargaArchivo(nombre)
            .then(function (data) {
            _this.data = data;
            var dataURL = URL.createObjectURL(_this.data);
            console.log('archivo:', data);
            console.log('url archivo:', dataURL);
            if (data.type.match('^image')) {
                _this.imagenURL = dataURL;
            }
            if (data.type.match('application/pdf')) {
                console.log('mostrando el pdf...');
                _this.fileOpener.open(dataURL, 'application/pdf')
                    .then(function () { return console.log('pdf abierto'); })
                    .catch(function (err) { return console.log(JSON.stringify(err)); });
            }
        })
            .catch(function (err) {
            console.log('No se pudo recuperar el archivo', err);
        });
    };
    InicioPage.prototype.procesaFich = function () {
        if (this.platform.is('android')) {
            this.archivos.guardarMovil(this.nomArchivo);
        }
        else {
            // navegador
            this.archivos.guardarBLOB(this.nomArchivo);
        }
    };
    InicioPage.prototype.selRamo = function (event) {
        var _this = this;
        if (this.dbs.ramos.length > 0) {
            this.mostrarPop(event, this.dbs.ramos)
                .then(function (resp) {
                console.log(resp);
                if (resp.data) {
                    _this.ramo = resp.data;
                }
            });
        }
    };
    InicioPage.prototype.selCompania = function (event) {
        var _this = this;
        if (this.dbs.companias.length > 0) {
            this.mostrarPop(event, this.dbs.companias)
                .then(function (resp) {
                console.log(resp);
                if (resp.data) {
                    _this.compania = resp.data;
                }
            });
        }
    };
    InicioPage.prototype.mostrarModal = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal, data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({
                            component: ModalTablaComponent,
                            componentProps: {
                                nomtabla: 'companias',
                                opciones: {
                                    campos: 'idcompania as ID, compania as campo',
                                    nombreID: 'idcompania'
                                }
                            }
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, modal.onDidDismiss()];
                    case 3:
                        data = (_a.sent()).data;
                        console.log('Retorno del modal', data);
                        return [2 /*return*/];
                }
            });
        });
    };
    InicioPage.prototype.mostrarLoading = function (message) {
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
    InicioPage.prototype.mostrarPop = function (event, valores) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var popover;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.popoverCtrl.create({
                            component: PopoverComponent,
                            componentProps: { lista: valores },
                            event: event,
                            mode: 'ios',
                            backdropDismiss: true // false: no se puede cerrar pulsando fuera del elemento
                        })];
                    case 1:
                        popover = _a.sent();
                        // presentamos el popover
                        popover.present();
                        return [4 /*yield*/, popover.onWillDismiss()];
                    case 2: 
                    // onWillDismiss no espera a que se cierre el componente,
                    // se lanza el evento mientras se cierra
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    InicioPage = tslib_1.__decorate([
        Component({
            selector: 'app-inicio',
            templateUrl: './inicio.page.html',
            styleUrls: ['./inicio.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [DatabaseService,
            PopoverController,
            ModalController,
            LoadingController,
            FileOpener,
            Platform,
            ArchivosService])
    ], InicioPage);
    return InicioPage;
}());
export { InicioPage };
//# sourceMappingURL=inicio.page.js.map