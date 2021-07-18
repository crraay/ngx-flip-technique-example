import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirstExampleComponent } from './components/first-example/first-example.component';
import { FlipTechniqueDirective } from './directives/flip-technique.directive';

@NgModule({
    declarations: [
        AppComponent,
        FirstExampleComponent,
        FlipTechniqueDirective
    ],
    imports: [
        BrowserModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
