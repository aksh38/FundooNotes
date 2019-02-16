import { Label } from "./label.model";

export class Note{
    
    noteId:number;
    userId:number;
    title:String;
	description:String;
	archieve:Boolean;
    trash:Boolean;
	pin:Boolean;
	imageUrl:String;
	color:String;
    reminder:Date;
    createDate:Date;
    updatedDate:Date;
    labels:Label[];

}