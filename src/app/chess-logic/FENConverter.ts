import { Color, LastMove } from "./models";
import { Piece } from "./pieces/piece";

export class FENConverter {

    public convertBoardToFEN (
        board: (Piece | null)[][],
        platerColor: Color,
        lastMove: LastMove | undefined,
        fiftyMoveRuleCounter: number,
    ) : string {

        let FEN = '';
        
        for(let i = 7; i >= 0; i--) {
            let FENRow  : string = '';
            let consecutiveEmptySquaresCounter = 0;

            for(const piece of board[i]) {
                if(!piece) {
                    consecutiveEmptySquaresCounter++;
                    continue;
                }

                if(consecutiveEmptySquaresCounter !== 0) FENRow += String(consecutiveEmptySquaresCounter);

                consecutiveEmptySquaresCounter = 0;
                FENRow += piece.FENChar;
            }

            if(consecutiveEmptySquaresCounter !== 0) FENRow += String(consecutiveEmptySquaresCounter);

            FEN += (i === 0) ? FENRow : FENRow + '/';
            
        }
        
        return FEN;
    }

    
}