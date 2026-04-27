import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { StatsComponent } from '../stats/stats';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [StatsComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  // CRITICAL: Setting the strategy to OnPush
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class DashboardComponent {
  @Input() userStats: any;

  // The original broken method (mutating the object)
  updateLocally() {
    this.userStats.score = 100;
  }

  // The fixed method (creating a new memory reference)
  updateFixed() {
    this.userStats = { ...this.userStats, score: 100 };
  }
}