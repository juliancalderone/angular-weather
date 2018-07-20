import { CurrentWeatherService } from './services/current-weather.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(private weatherService: CurrentWeatherService) { }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.weatherService.weather$.subscribe(console.log);
  }

}
