import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChessBoard } from '../../chess-logic/chess-board';
import { Color, Coords, FENChar, pieceImagePaths } from '../../chess-logic/models';
import { SelectedSquare } from './models';

@Component({
  selector: 'app-chess-board',
  standalone: true,
  imports: [CommonModule,ChessBoardComponent],
  templateUrl: './chess-board.component.html',
  styleUrl: './chess-board.component.css' 
})
export class ChessBoardComponent {
  public pieceImagePaths = pieceImagePaths;

  private chessBoard = new ChessBoard();
  public chessBoardView: (FENChar | null)[][] = this.chessBoard.chessBoardView;
  private selectedSquare: SelectedSquare = { piece: null };
  private pieceSafeSquares: Coords[] = [];

  public get playerColor(): Color { return this.chessBoard.playerColor; } 

  public isSquareDark(x: number, y: number): boolean {
    return ChessBoard.isSquareDark(x, y);
  }
}