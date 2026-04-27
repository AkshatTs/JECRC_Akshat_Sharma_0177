import { Component } from '@angular/core';
import { WeatherComponent } from './weather/weather';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [WeatherComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  // Mock data to pass down as a prop to the child component
  mockWeatherData = [
    { name: 'Mumbai', temperature: '32°C', wind: '15 km/h', humidity: '70%' },
    { name: 'Delhi', temperature: '28°C', wind: '10 km/h', humidity: '55%' },
    { name: 'Bangalore', temperature: '24°C', wind: '12 km/h', humidity: '65%' },
    { name: 'Chennai', temperature: '34°C', wind: '18 km/h', humidity: '80%' }
  ];
}