import { NgModule } from "@angular/core";

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
    exports: [
            MatToolbarModule,
            MatIconModule,
            MatDialogModule,
            MatButtonModule,
            MatTooltipModule
]})

export class MaterialModule { }