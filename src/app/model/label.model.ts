import { Note } from "./note.model";

export class Label
{
    labelId:LongRange;
    userId:LongRange;
    labelValue:String;
    notes:Note[];
}