import { Note } from "./note.model";

export class Label
{
    labelId:Number;
    userId:Number;
    labelValue:String;
    notes:Note[];
}