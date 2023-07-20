import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { News } from '../../models/news';
import { DialogNewsService } from '../../services/dialog-news.service';
import { DialogMode } from '../../models/dialog-mode';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsCardComponent {
  @Input()
  public news: News | undefined;

  constructor(private newsDialog: DialogNewsService) {}

  public showDetailedInfo(): void {
    if (this.news?.url) {
      this.newsDialog.show(DialogMode.VIEW, this.news.url);
    }
  }
}
