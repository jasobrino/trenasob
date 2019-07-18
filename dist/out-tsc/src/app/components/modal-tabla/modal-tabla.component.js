import * as tslib_1 from "tslib";
import { Component, Input, ViewChild } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { ListatablaComponent } from '../listatabla/listatabla.component';
var ModalTablaComponent = /** @class */ (function () {
    // la propiedad componentProps tambien puede ser accedida desde navParams
    function ModalTablaComponent(navParms, modalCtrl) {
        this.navParms = navParms;
        this.modalCtrl = modalCtrl;
        this.activaGuardar = true;
        console.log('navParms:', this.navParms.data);
    }
    ModalTablaComponent.prototype.ngOnInit = function () { };
    ModalTablaComponent.prototype.cerrar = function () {
        // pueden ser devuelto un objeto al componente padre
        this.modalCtrl.dismiss({
            datos: 'datos devueltos desde ventanaModal'
        });
    };
    ModalTablaComponent.prototype.guardar = function () {
        this.activaGuardar = false;
        console.log('guardando datos:', this.listatabla.lista);
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], ModalTablaComponent.prototype, "nomtabla", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], ModalTablaComponent.prototype, "opciones", void 0);
    tslib_1.__decorate([
        ViewChild('listatabla'),
        tslib_1.__metadata("design:type", ListatablaComponent)
    ], ModalTablaComponent.prototype, "listatabla", void 0);
    ModalTablaComponent = tslib_1.__decorate([
        Component({
            selector: 'app-modal-tabla',
            templateUrl: './modal-tabla.component.html',
            styleUrls: ['./modal-tabla.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavParams,
            ModalController])
    ], ModalTablaComponent);
    return ModalTablaComponent;
}());
export { ModalTablaComponent };
//# sourceMappingURL=modal-tabla.component.js.map