export class TaskRecord{
    constructor(
        public id:number,
        public title:string,
        public description:string,
        public dueDate:Date,
        public isCompleted:boolean
    ){}
}