import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnimalsService } from './services/animals.service';
import { animalsReducer } from './store/reducers/animals.reducer';
import { AnimalsEffect } from './store/effects/animals.effect';
import { AnimalsTableComponent } from './components/animals-table/animals-table.component';
import { AddPanelComponent } from './components/actions-panel/add-panel.component';
import { AnimalService } from './services/animal.service';
import { AnimalEffect } from './store/effects/animal.effect';

@NgModule({
  declarations: [
    AppComponent,
    AnimalsTableComponent,
    AddPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      animals: animalsReducer
    }),
    EffectsModule.forRoot([
      AnimalEffect,
      AnimalsEffect
    ])
  ],
  providers: [
    AnimalService,
    AnimalsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
