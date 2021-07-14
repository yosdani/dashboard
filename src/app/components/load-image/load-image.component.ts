import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CropperDialogComponent } from './cropper-dialog/cropper-dialog.component';
import {DefaultImage} from '@enums';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-load-image',
  templateUrl: './load-image.component.html',
  styleUrls: ['./load-image.component.scss']
})
export class LoadImageComponent implements OnInit {

  @Input() currentImage!: string;
  @Input() refresh!: number;
  @Output() loadedFileImage: EventEmitter<File>;
  @Output() croppedImage: EventEmitter<any>;
  image: any;
  fileData!: File;
  imageChangedEvent: any;

  constructor(private dialog: MatDialog, private toastService: ToastrService) {
    this.loadedFileImage = new EventEmitter();
    this.croppedImage = new EventEmitter();
  }

  ngOnInit() {
    if (this.currentImage) {
      this.image = this.currentImage;
    } else {
      this.image = DefaultImage.user;
    }
  }

  getImagePrev() {
    return `url("${this.image}")`;
  }

  fileProgress(event: any) {
    this.fileData = event.target.files[0];
    this.imageChangedEvent = event;

    const mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      this.toastService.error('El archivo seleccionado no es una imagen');
      return;
    }
    if (!this.sizeIsLessThan(this.fileData)) {
      this.toastService.error('Se admiten imágenes menores de 1MB');
      return;
    }

    this.openCropperDialog();
  }

  sizeIsLessThan(file: File, sizeInMB: number = 1): boolean {
    return file.size < sizeInMB * 1024 * 1024;
  }

  private openCropperDialog(): void {
    const dialogRef = this.dialog.open(CropperDialogComponent, {
      maxWidth: '500px',
      disableClose: true,
      autoFocus: true,
      data: {
        image: this.imageChangedEvent
      }
    });
    dialogRef.afterClosed().subscribe( result => {
      this.loadedFileImage.emit(result.fileData);
      this.croppedImage.emit(result.image);

      // show image on view
      const reader = new FileReader();
      reader.readAsDataURL(result.fileData);
      reader.onload = (_event) => {
        this.image = reader.result;
      };
    });
  }
}
