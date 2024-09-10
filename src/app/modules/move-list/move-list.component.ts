import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MoveList } from '../../chess-logic/models';
import { ChessBoardComponent } from '../chess-board/chess-board.component';

@Component({
  selector: 'app-move-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, ChessBoardComponent],
  templateUrl: './move-list.component.html',
  styleUrl: './move-list.component.css'
})
export class MoveListComponent {
@Input({ required: true }) public moveList!: MoveList;
@Input({ required: true }) public gameHistoryPointer: number = 0;
@Input({ required: true}) public gameHistoryLength: number = 1;
}
