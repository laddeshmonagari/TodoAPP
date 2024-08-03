export class Task{
    constructor( 
        public id:number, 
        public title:string, 
        public description:string,
        public dueDate:Date,
        public createdOn:Date,
        public userId:string,
        public modifiedBy:string,
        public modifiedOn:Date,
        public isCompleted:boolean
    ){}
}