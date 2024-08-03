import { Component} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title="";
  constructor() { }

  setTitle(titleEvent:string){
    this.title=titleEvent;
  }
  
}
