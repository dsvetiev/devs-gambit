import { Component, importProvidersFrom, OnDestroy, OnInit } from '@angular/core';
import { ChessBoardComponent } from '../chess-board/chess-board.component';
import { CommonModule } from '@angular/common';
import { StockfishService } from './stockfish.service';
import { ChessBoardService } from '../chess-board/chess-board.service';
import { firstValueFrom, Subscription } from 'rxjs';

@Component({
  selector: 'app-computer-mode',
  standalone: true,
  imports: [CommonModule],
  templateUrl: '../chess-board/chess-board.component.html',
  styleUrl: '../chess-board/chess-board.component.css'
})
export class ComputerModeComponent extends ChessBoardComponent implements OnInit, OnDestroy {
  private computerSubscriptions$ = new Subscription(); 
  constructor(private stockFishService: StockfishService,
    ChessBoardService: ChessBoardService
  ) {
    super(ChessBoardService);
  }
  ngOnInit(): void {
    const chessBoardStateSubscription: Subscription = this.chessBoardService.chessBoardState$.subscribe({
      next: async (FEN: string) => {
        const player: string = FEN.split(' ')[1];
        if(player === 'w') return;

        const { prevX, prevY, newX, newY, promotedPiece } = await firstValueFrom(this.stockFishService.getBestMove(FEN));
        this.updateBoard(prevX, prevY, newX, newY, promotedPiece);
      }
    });

    this.computerSubscriptions$.add(chessBoardStateSubscription);
  }

  public ngOnDestroy(): void {
    this.computerSubscriptions$.unsubscribe();
  }
}
