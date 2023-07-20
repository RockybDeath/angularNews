import { Injectable, OnDestroy } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogMode } from '../models/dialog-mode';
import { NewsDialogInfoComponent } from '../components/news-dialog-info/news-dialog-info.component';
import { StorageNewsService } from './storage-news.service';
import { News } from '../models/news';
import { Subject, takeUntil } from 'rxjs';

@Injectable()
export class DialogNewsService implements OnDestroy {
  private ref: DynamicDialogRef | undefined;
  private destroySubject$ = new Subject();
  constructor(
    private dialogService: DialogService,
    private storageService: StorageNewsService,
  ) {}

  public show(mode: DialogMode, url: string): void {
    this.ref = this.dialogService.open(NewsDialogInfoComponent, {
      data: {
        mode: mode,
        url: url,
      },
      header: 'News info',
    });
    this.ref.onClose.pipe(takeUntil(this.destroySubject$)).subscribe((data) => {
      if (data) {
        this.storageService.addNews(data as News);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroySubject$.next(false);
    this.destroySubject$.complete();
  }
}
