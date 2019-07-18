import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
var CompaniasComponent = /** @class */ (function () {
    function CompaniasComponent() {
        // preparamos el entorno para la llamada al componente listatabla
        this.nomtabla = 'companias';
        this.opciones = { campos: 'idcompania as ID, compania as campo', where: 'idcompania <= 6' };
    }
    CompaniasComponent.prototype.ngOnInit = function () { };
    CompaniasComponent = tslib_1.__decorate([
        Component({
            selector: 'app-companias',
            templateUrl: './companias.component.html',
            styleUrls: ['./companias.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], CompaniasComponent);
    return CompaniasComponent;
}());
export { CompaniasComponent };
//# sourceMappingURL=companias.component.js.map