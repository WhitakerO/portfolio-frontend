import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MaterialModule } from 'material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselComponent } from './components/carousel/carousel.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { ProjectsComponent } from './components/projects/projects.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatMenuModule} from '@angular/material/menu';
import { ExperienceComponent } from './components/experience/experience.component';
import { EducationComponent } from './components/education/education.component';
import { SkillsComponent } from './components/skills/skills.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { FooterComponent } from './components/footer/footer.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { DatePipe } from '@angular/common';
import { httpInterceptorProviders } from './services/interceptor/interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CarouselComponent,
    AboutusComponent,
    ProjectsComponent,
    ExperienceComponent,
    EducationComponent,
    SkillsComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    MatIconModule,
    MatTooltipModule,
    MatGridListModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatSnackBarModule,
    FormsModule,
    MatProgressBarModule
  ],
  providers: [httpInterceptorProviders,
    DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
