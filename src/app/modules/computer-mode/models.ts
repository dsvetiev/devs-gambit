import { FENChar } from "../../chess-logic/models";

export type StockfishQueryParams = {
    fen: string;
    depth: number;
    mode: string;
}

export type ChessMove = {
    prevX: number;
    prevY: number;
    newX: number;
    newY: number;
    promotedPiece: FENChar | null;
}

export type StockFishResponse = {
    success: boolean;
    data: string;
}