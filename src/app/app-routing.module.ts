import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FirstExampleComponent } from './components/first-example/first-example.component';

const routes: Routes = [
    {
        path: '',
        component: FirstExampleComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
