import { Comment } from './comment';

export class Project {
    // tslint:disable-next-line:variable-name
    _id: string;
    name:string;
    fileName:string;
    fileType:string;
    author:string;
    description:string;
    uploaded:Date;
    comments: Comment[];
  }
  