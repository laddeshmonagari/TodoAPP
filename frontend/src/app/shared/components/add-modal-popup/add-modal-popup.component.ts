import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-add-modal-popup',
  templateUrl: './add-modal-popup.component.html',
  styleUrl: './add-modal-popup.component.css'
})
export class AddModalPopupComponent {
  @Input() component:any;
}
