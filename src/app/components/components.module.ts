import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { ListatablaComponent } from './listatabla/listatabla.component';
import { CompaniasComponent } from './companias/companias.component';
import { PopoverComponent } from './popover/popover.component';
import { ModalTablaComponent } from './modal-tabla/modal-tabla.component';
import { FormsModule } from '@angular/forms';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
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
export class ComponentsModule { }
