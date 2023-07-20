import { Injectable, OnDestroy } from '@angular/core';
import { NewsService } from './news.service';
import { BehaviorSubject, Observable, Subject, takeUntil, tap } from 'rxjs';
import { HttpNews } from '../models/http-news';
import { News } from '../models/news';

@Injectable()
export class StorageNewsService implements OnDestroy {
  private httpNewsList$: BehaviorSubject<HttpNews | null> =
    new BehaviorSubject<HttpNews | null>(null);
  public get newsList$(): Observable<HttpNews | null> {
    return this.httpNewsList$.asObservable();
  }
  private loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false,
  );
  private destroySubject$ = new Subject();
  constructor(private newsService: NewsService) {}

  public addItemsFromLocalStorage(): void {
    const items = localStorage.getItem('items');
    if (items) {
      const news = JSON.parse(items) as News[];
      const httpNews: HttpNews = {
        news: news,
        totalCount: news.length,
      };
      this.httpNewsList$.next(httpNews);
    }
  }

  public fetchNewsList(pageNumber: number, pageSize: number): void {
    this.loading$.next(true);
    this.newsService
      .getListNews(pageNumber, pageSize)
      .pipe(
        tap(() => this.loading$.next(false)),
        takeUntil(this.destroySubject$),
      )
      .subscribe((httpNews) => {
        const newsList = this.httpNewsList$.value;
        if (newsList) {
          newsList.news = newsList.news.concat(httpNews.news);
          this.httpNewsList$.next(newsList);
        } else {
          this.httpNewsList$.next(httpNews);
        }
      });
  }

  public isBusy(): boolean {
    return this.loading$.value;
  }

  public addNews(news: News): void {
    this.addToLocalStorage(news);
    let value = this.httpNewsList$.value;
    if (value) {
      value.news.unshift(news);
      value.totalCount++;
    } else {
      value = {
        news: [news],
        totalCount: 1,
      } as HttpNews;
    }
    this.httpNewsList$.next(value);
  }

  private addToLocalStorage(news: News): void {
    const items = localStorage.getItem('items');
    if (items) {
      JSON.parse(items).push(news);
      localStorage.setItem('items', JSON.stringify(items));
    } else {
      localStorage.setItem('items', JSON.stringify([news]));
    }
  }

  public clearRemoteNews(): void {
    this.addItemsFromLocalStorage();
  }
  ngOnDestroy(): void {
    this.httpNewsList$.next(null);
    this.httpNewsList$.complete();
    this.destroySubject$.next(false);
    this.destroySubject$.complete();
  }
}
