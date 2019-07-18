import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ListatablaComponent } from './listatabla/listatabla.component';
import { CompaniasComponent } from './companias/companias.component';
import { PopoverComponent } from './popover/popover.component';
import { ModalTablaComponent } from './modal-tabla/modal-tabla.component';
import { FormsModule } from '@angular/forms';
import { PipesModule } from '../pipes/pipes.module';
var ComponentsModule = /** @class */ (function () {
    function ComponentsModule() {
    }
    ComponentsModule = tslib_1.__decorate([
        NgModule({
            declarations: [
                ListatablaComponent,
                CompaniasComponent,
                PopoverComponent,
                ModalTablaComponent
            ],
            exports: [
                ListatablaComponent,
                CompaniasComponent,
                PopoverComponent,
                ModalTablaComponent
            ],
            imports: [
                CommonModule,
                IonicModule,
                FormsModule,
                PipesModule
            ]
        })
    ], ComponentsModule);
    return ComponentsModule;
}());
export { ComponentsModule };
//# sourceMappingURL=components.module.js.map