import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Importar FormsModule

import { AppComponent } from './app.component';
import { AhorcadoService } from './ahorcado.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AhorcadoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
