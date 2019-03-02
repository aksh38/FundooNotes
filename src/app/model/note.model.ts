import { Label } from "./label.model";

export class Note{
    
    noteId:LongRange;
    userId:LongRange;
    title:String;
	description:String;
	archive:boolean;
    trash:boolean;
	pin:boolean;
	imageUrl:String;
	color:String;
    reminder:Date;
    createDate:Date;
    updatedDate:Date;
    labels:Label[];

}