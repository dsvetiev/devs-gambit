import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChessBoardComponent } from './modules/chess-board/chess-board.component';
import { HttpClientModule } from "@angular/common/http";

import { NavMenuComponent } from './modules/nav-menu/nav-menu.component';
import { PlayAgainstComputerDialogComponent } from './modules/play-against-computer-dialog/play-against-computer-dialog.component';
import { MoveListComponent } from './modules/move-list/move-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ChessBoardComponent,
    HttpClientModule,
    NavMenuComponent,
    PlayAgainstComputerDialogComponent,
    MoveListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'devs-gambit';
}
