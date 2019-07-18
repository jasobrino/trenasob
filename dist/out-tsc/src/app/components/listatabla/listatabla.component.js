import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { ToastController } from '@ionic/angular';
var ListatablaComponent = /** @class */ (function () {
    function ListatablaComponent(dbs, toastCtrl) {
        this.dbs = dbs;
        this.toastCtrl = toastCtrl;
        this.lista = [];
        this.ItemlenghtMin = 3;
    }
    ListatablaComponent.prototype.ngOnInit = function () {
        // cargamos la tabla fija en lista
        this.cargarTablaFija();
    };
    ListatablaComponent.prototype.cargarTablaFija = function () {
        var _this = this;
        console.log('nomtabla: ', this.nomtabla);
        console.log('opciones: ', this.opciones);
        this.dbs.getTabla(this.nomtabla, this.opciones)
            // .subscribe( (resp: DBresp) => {
            .then(function (resp) {
            console.log('resp:', resp);
            if (resp.ok) {
                _this.lista = resp.data;
                console.log('registros:', resp.count);
                // console.log('data:', this.lista);
            }
            else {
                console.log('REST server error:', resp.err);
            }
        })
            .catch(function (err) {
            console.log('getTabla: ', err);
        });
    };
    ListatablaComponent.prototype.onchange = function (event) {
        console.log('onChange:', event);
    };
    ListatablaComponent.prototype.onInput = function (event, input) {
        var valor = input.value.toLocaleUpperCase();
        input.value = valor;
        console.log('value:', valor);
    };
    ListatablaComponent.prototype.onblur = function (event, input, item) {
        var target = event.target;
        // console.log('composedPath:', event.composedPath());
        // console.log('event:', target);
        console.log('onblur-item:', item);
        console.log('onblur:', input.value);
        // al salir del campo, comprobamos si debe guardarse el valor actual
        if (!input.readonly && input.value.length >= this.ItemlenghtMin) {
            // comprobamos si ya existe el elemento en la lista
            var valorNuevo_1 = input.value.trim();
            var elementos_1 = [];
            this.lista.forEach(function (valor) { return elementos_1.push(valor.campo); });
            if (elementos_1.find(function (elemento) { return elemento === valorNuevo_1; })) {
                this.mostrarToast(input.value + " ya se encuentra en la lista");
                input.value = item.campo;
            }
            else {
                // ahora modificamos el elemento de la lista
                // preparamos los campos del update
                this.mostrarToast('elemento modificado');
            }
        }
        input.readonly = true;
    };
    ListatablaComponent.prototype.editar = function (item, input) {
        console.log('editar:', item);
        // console.log('input:', input);
        input.readonly = false;
        input.setFocus();
    };
    ListatablaComponent.prototype.mostrarToast = function (message) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var toast;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastCtrl.create({
                            message: message,
                            duration: 2000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], ListatablaComponent.prototype, "nomtabla", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], ListatablaComponent.prototype, "opciones", void 0);
    ListatablaComponent = tslib_1.__decorate([
        Component({
            selector: 'app-listatabla',
            templateUrl: './listatabla.component.html',
            styleUrls: ['./listatabla.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [DatabaseService,
            ToastController])
    ], ListatablaComponent);
    return ListatablaComponent;
}());
export { ListatablaComponent };
//# sourceMappingURL=listatabla.component.js.map