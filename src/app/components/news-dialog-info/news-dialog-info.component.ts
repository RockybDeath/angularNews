import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogMode } from '../../models/dialog-mode';
import { Observable, Subject, takeUntil } from 'rxjs';
import { News } from '../../models/news';
import { FormControl, FormGroup } from '@angular/forms';
import { NewsService } from '../../services/news.service';
import { FileUpload } from 'primeng/fileupload';

@Component({
  selector: 'app-news-dialog-info',
  templateUrl: './news-dialog-info.component.html',
  styleUrls: ['./news-dialog-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsDialogInfoComponent implements OnDestroy, OnInit {
  protected readonly DialogMode = DialogMode;
  public uploadImg!: string;
  public mode: DialogMode = DialogMode.VIEW;
  public news$!: Observable<News>;
  public form!: FormGroup;
  private destroySubject$ = new Subject();
  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private newsService: NewsService,
    private detectionRef: ChangeDetectorRef,
  ) {
    if (config.data) {
      this.mode = config.data.mode;
      switch (this.mode) {
        case DialogMode.CREATE:
          this.createForm();
          break;
        case DialogMode.VIEW:
          this.news$ = this.newsService
            .getNews(config.data.url as string)
            .pipe(takeUntil(this.destroySubject$));
          break;
      }
    } else {
      this.close();
    }
  }

  ngOnDestroy(): void {
    this.destroySubject$.next(false);
    this.destroySubject$.complete();
  }

  public createForm(): void {
    this.form = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
    });
  }

  public saveAndClose(): void {
    const result: News = this.form.value as News;
    result.publishedDate = new Date();
    this.ref.close(result);
  }

  public close(): void {
    this.ref.close();
  }

  public onSelect(event: any): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.uploadImg = e.target.result;
      this.detectionRef.detectChanges();
    };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    reader.readAsDataURL(event.files[0]);
  }

  public removeFile(uploader: FileUpload): void {
    uploader.clear();
    this.uploadImg = '';
  }

  ngOnInit(): void {
    this.destroySubject$ = new Subject();
  }
}
