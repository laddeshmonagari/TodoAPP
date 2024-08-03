import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-task-status',
  templateUrl: './task-status.component.html',
  styleUrls: ['./task-status.component.css']
})
export class TaskStatusComponent implements OnInit, OnChanges {
  @Input() activeCount = 0;
  @Input() completedCount = 0;
  activePercentage: number = 0;
  completedPercentage: number = 0;

  ngOnInit(): void {
    this.calculatePercentages();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activeCount'] || changes['completedCount']) {
      this.calculatePercentages();
    }
  }

  private calculatePercentages(): void {
    const total = this.activeCount + this.completedCount;
    if (total > 0) {
      this.activePercentage = Math.floor((this.activeCount / total) * 100);
      this.completedPercentage = Math.floor((this.completedCount / total) * 100);
    } 
  }
  
}
