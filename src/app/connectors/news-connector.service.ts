import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiNews } from './api-models/api-news';
import { ApiNew } from './api-models/api-new';

@Injectable()
export class NewsConnectorService {
  constructor(private http: HttpClient) {}

  public getListNews(
    pageNumber: number,
    pageSize: number,
  ): Observable<ApiNews> {
    return this.http.get<ApiNews>(
      `https://webapi.autodoc.ru/api/news/${pageNumber}/${pageSize}`,
    );
  }

  public getNews(url: string): Observable<ApiNew> {
    return this.http.get<ApiNew>(
      'https://webapi.autodoc.ru/api/news/item/' + url,
    );
  }
}
