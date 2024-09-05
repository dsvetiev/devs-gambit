import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { ChessBoardComponent } from './app/modules/chess-board/chess-board.component';
import { ComputerModeComponent } from './app/modules/computer-mode/computer-mode.component';
import { provideHttpClient } from '@angular/common/http';

const routes: Routes = [
  { path: 'against-friend', component: ChessBoardComponent, title: 'Play against friend' },
  { path: 'against-computer', component: ComputerModeComponent, title: 'Play against computer' }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
});