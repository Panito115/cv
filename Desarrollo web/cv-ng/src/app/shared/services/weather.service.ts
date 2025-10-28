import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, throwError } from 'rxjs';

export interface WeatherSummary {
  city: string;
  description: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  iconUrl: string;
}

interface OpenWeatherMain {
  temp: number;
  feels_like: number;
  humidity: number;
}

interface OpenWeatherWeather {
  description: string;
  icon: string;
}

interface OpenWeatherResponse {
  name: string;
  main: OpenWeatherMain;
  weather: OpenWeatherWeather[];
}

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private readonly baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private readonly http: HttpClient) {}

  getCurrentWeather(city: string, apiKey: string): Observable<WeatherSummary> {
    if (!apiKey) {
      return throwError(() => new Error('OpenWeather API key is missing'));
    }

    const sanitizedCity = city.trim();
    const params = new HttpParams()
      .set('q', sanitizedCity)
      .set('appid', apiKey)
      .set('units', 'metric')
      .set('lang', 'es');

    return this.http
      .get<OpenWeatherResponse>(this.baseUrl, { params })
      .pipe(map((response) => this.mapResponse(response)));
  }

  private mapResponse(response: OpenWeatherResponse): WeatherSummary {
    const [details] = response.weather ?? [];
    return {
      city: response.name,
      description: details?.description ?? 'Sin información',
      temperature: response.main?.temp ?? 0,
      feelsLike: response.main?.feels_like ?? 0,
      humidity: response.main?.humidity ?? 0,
      iconUrl: details?.icon
        ? `https://openweathermap.org/img/wn/${details.icon}@2x.png`
        : '',
    };
  }
}
