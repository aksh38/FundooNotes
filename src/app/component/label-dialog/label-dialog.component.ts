import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { Label } from 'src/app/model/label.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { LabelService } from 'src/app/service/label.service';
import { LabelDto } from 'src/app/model/labelDto.model';

@Component({
  selector: 'app-label-dialog',
  templateUrl: './label-dialog.component.html',
  styleUrls: ['./label-dialog.component.css']
})
export class LabelDialogComponent implements OnInit {

  private labelValue:String;
  private labelDto=new LabelDto();

  constructor(public dialogRef: MatDialogRef<LabelDialogComponent>,
    @Inject(MAT_DIALOG_DATA)private  labels:Label[], 
    private labelService: LabelService, 
    private snackBar:MatSnackBar)
    {}

  ngOnInit() {
  }

updateLabel(label:Label)
{
  label.labelValue=this.labelValue;
  this.labelService.updateLabel(label).subscribe(
    (response:any)=> {
    this.snackBar.open(response.body.statusMessage,"", {duration:2000, verticalPosition:"top"} );
    }
  );
}

createLabel()
{
  this.labelDto.labelValue=this.labelValue;
  this.labelService.createLabel(this.labelDto).subscribe(
    (response:any)=>  {
      this.getLabels();
    this.snackBar.open(response.body.statusMessage,"", {duration:2000, verticalPosition:"top"} );
  }  )
}

getLabels()
{
  this.labelService.getLabels().subscribe
  {
    (data)=> this.labels=data;
  }
}

onClick(): void {

  this.dialogRef.close();
}

deleteLabel(labelId:LongRange)
{
  this.labels=this.labels.filter(label=> label.labelId!== labelId);
  this.labelService.deleteLabel(labelId).subscribe(
    (response:any)=>{
      this.getLabels();
       this.snackBar.open(response.statusMessage,"", {duration:2000, verticalPosition:"top"})
    }
  )
}
focusInput(myInput) {

    myInput.focus();
}
}
