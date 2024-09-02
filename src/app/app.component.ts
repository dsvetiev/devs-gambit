import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChessBoardComponent } from './modules/chess-board/chess-board.component';
import { HttpClientModule } from "@angular/common/http";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ChessBoardComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'devs-gambit';
}
