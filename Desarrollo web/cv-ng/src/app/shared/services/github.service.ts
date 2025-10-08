import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface GithubProfile {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  followers: number;
  following: number;
  public_repos: number;
  location: string | null;
  company: string | null;
}

@Injectable({ providedIn: 'root' })
export class GithubService {
  private readonly baseUrl = 'https://api.github.com/users';

  constructor(private readonly http: HttpClient) {}

  getProfile(username: string): Observable<GithubProfile> {
    const sanitizedUsername = encodeURIComponent(username.trim());
    return this.http.get<GithubProfile>(`${this.baseUrl}/${sanitizedUsername}`);
  }
}
