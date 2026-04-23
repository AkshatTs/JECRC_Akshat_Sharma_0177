import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Weather {
  name: string;
  temperature: string;
  wind: string;
  humidity: string;
}

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './weather.html',
  styleUrl: './weather.css'
})
export class WeatherComponent implements OnInit {
  @Input() weatherData: Weather[] = [];
  
  searchCity: string = '';
  filteredWeather: Weather | null = null;

  ngOnInit() {}

  onSearch(target: any) {
    this.searchCity = target.value.trim();

    // If input is empty, clear the search to hide both output divs
    if (this.searchCity === '') {
      this.filteredWeather = null;
      return;
    }

    // Perform case-insensitive search
    const lowercaseSearch = this.searchCity.toLowerCase();
    const foundData = this.weatherData.find(
      city => city.name.toLowerCase() === lowercaseSearch
    );

    this.filteredWeather = foundData ? foundData : null;
  }
}