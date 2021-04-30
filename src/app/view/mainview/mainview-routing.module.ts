import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainviewComponent } from './mainview.component';

const routes: Routes = [
    {
        path: '', component: MainviewComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainviewRoutingModule {
}
