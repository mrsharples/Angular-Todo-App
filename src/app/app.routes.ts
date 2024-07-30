import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ArchiveComponent } from './modules/archive/archive/archive.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'archive',
        component: ArchiveComponent
    }
];
