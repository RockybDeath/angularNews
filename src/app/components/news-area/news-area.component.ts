import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Inject,
} from '@angular/core';
import { Observable } from 'rxjs';
import { StorageNewsService } from '../../services/storage-news.service';
import { HttpNews } from '../../models/http-news';
import { DialogNewsService } from '../../services/dialog-news.service';
import { DialogMode } from '../../models/dialog-mode';

@Component({
  selector: 'app-news-area',
  templateUrl: './news-area.component.html',
  styleUrls: ['./news-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsAreaComponent {
  public pageNumber = 1;
  public pageSize = 10;
  public news$: Observable<HttpNews | null>;
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (
      this.window.innerHeight + this.window.scrollY >=
      document.body.scrollHeight - 600
    ) {
      if (!this.storageNews.isBusy()) {
        this.pageNumber++;
        this.fetchNewsList();
      }
    }
  }
  constructor(
    private storageNews: StorageNewsService,
    private newsDialog: DialogNewsService,
    @Inject('Window') private window: Window,
  ) {
    this.news$ = this.storageNews.newsList$;
    this.fetchNewsList();
  }

  public fetchNewsList(): void {
    if (this.pageNumber && this.pageSize) {
      this.storageNews.fetchNewsList(this.pageNumber, this.pageSize);
    }
  }

  public searchNews(): void {
    if (this.pageNumber && this.pageSize) {
      this.storageNews.clearRemoteNews();
      this.storageNews.fetchNewsList(this.pageNumber, this.pageSize);
    }
  }

  public createNews(): void {
    this.newsDialog.show(DialogMode.CREATE, '');
  }
}
