import { Injectable } from '@angular/core';
import { NewsConnectorService } from '../connectors/news-connector.service';
import { map, Observable } from 'rxjs';
import { HttpNews } from '../models/http-news';
import { News } from '../models/news';
import { ApiNew } from '../connectors/api-models/api-new';

@Injectable()
export class NewsService {
  constructor(private connector: NewsConnectorService) {}

  public getListNews(
    pageNumber: number,
    pageSize: number,
  ): Observable<HttpNews> {
    return this.connector.getListNews(pageNumber, pageSize).pipe(
      map((apiNews) => {
        const news: News[] = apiNews.news.map(
          (apiNew: ApiNew) =>
            ({
              ...apiNew,
              publishedDate: new Date(apiNew.publishedDate),
            }) as News,
        );
        return {
          totalCount: apiNews.totalCount,
          news: news,
        } as HttpNews;
      }),
    );
  }

  public getNews(url: string): Observable<News> {
    return this.connector.getNews(url).pipe(
      map(
        (apiNew: ApiNew) =>
          ({
            ...apiNew,
            publishedDate: new Date(apiNew.publishedDate),
          }) as News,
      ),
    );
  }
}
