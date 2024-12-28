import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { appConfig } from './app.config';


@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    BookFormComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [appConfig.providers],
  bootstrap: [AppComponent],
})
export class AppModule {}
