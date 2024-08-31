import { Color, LastMove } from "./models";
import { Piece } from "./pieces/piece";

export class FENConverter {

    public convertBoardToFEN (
        board: (Piece | null)[][],
        platerColor: Color,
        lastMove: LastMove | undefined,
        fiftyMoveRuleCounter: number,
    ) : string

    
}