import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ImageService } from 'src/app/service/image.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.css']
})
export class ImageDialogComponent implements OnInit {
  private imageChangedEvent: any ='';
  private croppedImage:File;
  
  constructor( 
    public dialogRef: MatDialogRef<ImageDialogComponent>,
    private imageService:ImageService) { }

  ngOnInit() {
  }

  onFileSelect(event): void {
    console.log(event)
    this.imageChangedEvent = event;
  }
  imageCropped(event) {
    this.croppedImage = event.base64;
  }
  upload()
  {
    this.dialogRef.close(this.croppedImage);
  }
}
