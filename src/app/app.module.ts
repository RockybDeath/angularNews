import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewsAreaComponent } from './components/news-area/news-area.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StorageNewsService } from './services/storage-news.service';
import { NewsService } from './services/news.service';
import { NewsConnectorService } from './connectors/news-connector.service';
import { HttpClientModule } from '@angular/common/http';
import { NewsCardComponent } from './components/news-card/news-card.component';
import { CardModule } from 'primeng/card';
import { NgOptimizedImage } from '@angular/common';
import { NewsDialogInfoComponent } from './components/news-dialog-info/news-dialog-info.component';
import { DialogNewsService } from './services/dialog-news.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileUploadModule } from 'primeng/fileupload';

export function getWindow(): Window {
  return window;
}

@NgModule({
  declarations: [
    AppComponent,
    NewsAreaComponent,
    NewsCardComponent,
    NewsDialogInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CardModule,
    NgOptimizedImage,
    BrowserAnimationsModule,
    FileUploadModule,
  ],
  providers: [
    StorageNewsService,
    NewsService,
    NewsConnectorService,
    DialogNewsService,
    DialogService,
    DynamicDialogRef,
    { provide: 'Window', useFactory: getWindow },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
