import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ImageCropperModule } from 'ngx-image-cropper';
import {DefaultImgOnErrorDirective} from '../../directives/default-img-onerror.directive';
import {LoadImageComponent} from './load-image.component';
import {CropperDialogComponent} from './cropper-dialog/cropper-dialog.component';
import {MaterialModule} from '../../material.module';
import {FlexModule} from '@angular/flex-layout';


@NgModule({
  declarations: [
    DefaultImgOnErrorDirective,
    LoadImageComponent,
    CropperDialogComponent,
  ],
  imports: [
    CommonModule,
    ImageCropperModule,
    MaterialModule,
    FlexModule
  ],
  exports: [
    DefaultImgOnErrorDirective,
    LoadImageComponent
  ],
  entryComponents: [CropperDialogComponent],
})
export class LoadImageModule { }
