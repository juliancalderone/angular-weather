import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { Coords } from './../structures/coords.structure';
import { environment } from './../../environments/environment';
import { Weather } from './../structures/weather.structure';



@Injectable({
  providedIn: 'root'
})
export class CurrentWeatherService {
  // declaro un nuevo subject de la clase Subject que puede enviar info de cualquier tipo
  public weatherSubject: Subject<any> = new Subject<any>();
  public weather$: Observable<any>;

  endpoint = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) {
    this.weather$ = this.weatherSubject.asObservable().pipe(
      map ((data: any) => {
        let mainWeather = data.weather[0];
        let weather: Weather = {
          name: data.name,
          cod: data.cod,
          temp: data.main.temp,
          ...mainWeather.icon
        };
        return weather;
       })
    ); // actua como un observable

    this.get({
      lat: 35,
      lon: 139
    });
  }

  get(coords: Coords) {
    let args = `?lat=${coords.lat}&lon=${coords.lon}&appid=${
      environment.key
    }&units=metric`; // metric convierte a C°

    let url = this.endpoint + args;

    if (isDevMode()) {
      url = 'assets/weather.json';
    }

    // weatherSubject se subscribe a los resultados que provienen de la petición http
    this.http.get(this.endpoint + args).subscribe(this.weatherSubject);
  }
}


// # Definiciones
  // Observable: objetos a los que nos vamos a subscribir y nos devuelven info
  // Observer: interface que se suscribe al observable y utiliza por lo gral next()
  // Subject: intermediario entre un observable y observer. Es como un proxy
