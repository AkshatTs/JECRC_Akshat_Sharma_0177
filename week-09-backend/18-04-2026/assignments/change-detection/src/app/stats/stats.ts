import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stats',
  standalone: true,
  templateUrl: './stats.html',
  styleUrl: './stats.css'
})
export class StatsComponent {
  @Input() userStats: any;
}