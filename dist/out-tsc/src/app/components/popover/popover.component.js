import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
var PopoverComponent = /** @class */ (function () {
    function PopoverComponent(popoverCtrl) {
        this.popoverCtrl = popoverCtrl;
    }
    PopoverComponent.prototype.ngOnInit = function () { };
    PopoverComponent.prototype.onClick = function (seleccion) {
        // console.log('elemento seleccionado en popoverComponent:', seleccion);
        this.popoverCtrl.dismiss(seleccion);
    };
    PopoverComponent = tslib_1.__decorate([
        Component({
            selector: 'app-popover',
            templateUrl: './popover.component.html',
            styleUrls: ['./popover.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [PopoverController])
    ], PopoverComponent);
    return PopoverComponent;
}());
export { PopoverComponent };
//# sourceMappingURL=popover.component.js.map