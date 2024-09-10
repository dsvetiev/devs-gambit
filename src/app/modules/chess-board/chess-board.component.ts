import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChessBoard } from '../../chess-logic/chess-board';
import { CheckState, Color, Coords, FENChar, GameHistory, LastMove, MoveList, pieceImagePaths, SafeSquares } from '../../chess-logic/models';
import { SelectedSquare } from './models';
import { ChessBoardService } from './chess-board.service';
import { Subscription } from 'rxjs';
import { MoveListComponent } from "../move-list/move-list.component";

@Component({
  selector: 'app-chess-board',
  standalone: true,
  imports: [CommonModule, ChessBoardComponent, MoveListComponent, MoveListComponent],
  templateUrl: './chess-board.component.html',
  styleUrl: './chess-board.component.css' 
})
export class ChessBoardComponent {
  public pieceImagePaths = pieceImagePaths;

  protected chessBoard = new ChessBoard();
  public chessBoardView: (FENChar | null)[][] = this.chessBoard.chessBoardView;
  private selectedSquare: SelectedSquare = { piece: null };
  private pieceSafeSquares: Coords[] = [];
  private lastMove: LastMove | undefined = this.chessBoard.lastMove;
  private checkState: CheckState = this.chessBoard.checkState;

  public isPromotionActive: boolean = false;
  private promotionCoords: Coords | null = null;
  private promotedPiece: FENChar | null = null;
  public flipMode: boolean = false;
  public gameHistoryPointer: number = 0;

  public get playerColor(): Color { 
    return this.chessBoard.playerColor; 
  };

  public get gameOverMessage(): string | undefined {
    return this.chessBoard.gameOverMessage;
  }

  public get moveList(): MoveList {
    return this.chessBoard.moveList;
  }

  public get gameHistory(): GameHistory {
    return this.chessBoard.gameHistory;
  }

  public flipBoard(): void {
    this.flipMode = !this.flipMode;
  }

  private subscriptions$ = new Subscription();

  constructor(protected chessBoardService: ChessBoardService) { }
 
   public promotionPieces(): FENChar[] {
    return this.playerColor === Color.White ? 
    [FENChar.WhiteKnight, FENChar.WhiteBishop, FENChar.WhiteRook, FENChar.WhiteQueen] :
    [FENChar.BlackKnight, FENChar.BlackBishop, FENChar.BlackRook, FENChar.BlackQueen];
  }

  public isSquareDark(x: number, y: number): boolean {
    return ChessBoard.isSquareDark(x, y);
  };

  public unmarkingPreviouslySelectedAndSafeSquares(): void {
    this.selectedSquare = { piece: null };
    this.pieceSafeSquares = [];

    if(this.isPromotionActive) {
      this.isPromotionActive = false;
      this.promotedPiece = null;
      this.promotionCoords = null;
    }
  }

  public selectingPiece(x: number, y: number): void {
    if(this.gameOverMessage !== undefined) return;
    const piece: FENChar | null = this.chessBoardView[x][y];
    if(!piece) return;
    if(this.isWrongPieceSelected(piece)) return;

    const isSameSquareClicked: boolean = !!this.selectedSquare.piece && this.selectedSquare.x === x && this.selectedSquare.y === y;
    this.unmarkingPreviouslySelectedAndSafeSquares();
    if(isSameSquareClicked) return;
    this.selectedSquare = { piece, x, y };
    this.pieceSafeSquares = this.safeSquares.get(x + "," + y) || [];
  };

  public isSquareSelected(x: number, y: number): boolean {
    if(!this.selectedSquare.piece) return false;
    return this.selectedSquare.x === x && this.selectedSquare.y === y;
  };

  public isSquareSafeForSelectingPiece(x: number, y: number): boolean {
    return this.pieceSafeSquares.some(coords => coords.x === x && coords.y === y)
  };

  public isSquareLastMove(x: number, y: number): boolean {
    if(!this.lastMove) return false;
    const { prevX, prevY, currX, currY } = this.lastMove;
    return x === prevX && y === prevY || x === currX && y === currY;
  }

  public isSquareChecked(x: number, y: number): boolean {
    return this.checkState.isInCheck && this.checkState.x === x && this.checkState.y === y;
  }

  public isSquarePromotionSquare(x: number, y: number): boolean {
    if(!this.promotionCoords) return false;
    return this.promotionCoords.x === x && this.promotionCoords.y === y;
  }

  public get safeSquares(): SafeSquares {
    return this.chessBoard.safeSquares;
  };

  private isWrongPieceSelected(piece: FENChar): boolean {
    const isWhitePieceSelected: boolean = piece === piece.toUpperCase();
    return isWhitePieceSelected && this.playerColor === Color.Black ||
    !isWhitePieceSelected && this.playerColor === Color.White;
  }

  private placingPiece(newX: number, newY: number): void {
    if(!this.selectedSquare.piece) return;
    if(!this.isSquareSafeForSelectingPiece(newX, newY)) return;  

    const isPawnSelected: boolean = this.selectedSquare.piece === FENChar.WhitePawn || this.selectedSquare.piece === FENChar.BlackPawn;
    const isPawnOnLastRank: boolean = isPawnSelected && (newX === 7 || newX === 0);
    const shouldOpenPromotionDialog: boolean =  !this.isPromotionActive && isPawnOnLastRank;

    if(shouldOpenPromotionDialog) {
      this.pieceSafeSquares = [];
      this.isPromotionActive = true;
      this.promotionCoords = { x: newX, y: newY };
      return;
    }

    const { x: prevX, y: prevY } = this.selectedSquare;
    this.updateBoard(prevX, prevY, newX, newY, this.promotedPiece);
  }

  protected updateBoard(prevX: number, prevY: number, newX: number, newY: number, promotedPiece: FENChar | null): void {
    this.chessBoard.move(prevX, prevY, newX, newY, this.promotedPiece);
    this.chessBoardView = this.chessBoard.chessBoardView;
    this.checkState = this.chessBoard.checkState;
    this.lastMove = this.chessBoard.lastMove;
    this.unmarkingPreviouslySelectedAndSafeSquares();
    this.gameHistoryPointer++;
  }

  public promotePiece(piece: FENChar): void {
    if(!this.promotionCoords || !this.selectedSquare.piece) return;
    this.promotedPiece = piece;
    const { x: newX, y: newY } = this.promotionCoords;
    const { x: prevX, y: prevY } = this.selectedSquare;
    this.updateBoard(prevX, prevY, newX, newY, this.promotedPiece);
  }

  public move(x: number, y: number): void {
    this.selectingPiece(x, y);
    this.placingPiece(x, y);
  }

  public closePawnPromotionDialog(): void {
    this.unmarkingPreviouslySelectedAndSafeSquares();
  }

  public showPreviousPosition(moveIndex: number): void {
    const {board, checkState, lastMove} = this.gameHistory[moveIndex];
    this.chessBoardView = board;
    this.checkState = checkState;
    this.lastMove = lastMove;
    this.gameHistoryPointer = moveIndex;
  }
}