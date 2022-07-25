import {
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export const GAME_FEATURE_KEY = 'game';

/*
 * Update these interfaces according to your requirements.
 */
export interface GameEntity {
  id: number;
}

export interface Player {
  id: string;
  name: string;
  score: number;
  isAtRisk: boolean;
  isEliminated: boolean;
}

export interface Throw {
  playerId: string;
  points: number;
}

export interface GameState extends EntityState<GameEntity> {
  players: Player[];
  throws: Throw[];
  order: string[];
  turn: number;
  winner: string;
}

export const gameAdapter = createEntityAdapter<GameEntity>();

export const initialGameState: GameState = gameAdapter.getInitialState({
  players: [],
  throws: [],
  order: [],
  turn: 0,
  winner: '',
});

export const gameSlice = createSlice({
  name: GAME_FEATURE_KEY,
  initialState: initialGameState,
  reducers: {
    addPlayer: (state: any, action: PayloadAction<{ name: string }>) => {
      const { name } = action.payload;
      return {
        ...state,
        players: [
          ...state.players,
          {
            id: uuidv4(),
            name,
            score: 0,
            isEliminated: false,
          },
        ],
      };
    },
    removePlayer: (state: any, action: PayloadAction<{ id: string }>) => {
      return {
        ...state,
        players: state.players.filter(
          (p: Player) => p.id !== action.payload.id
        ),
      };
    },
    addThrow: (
      state: any,
      action: PayloadAction<{ playerId: string; points: number }>
    ) => {
      const { playerId, points } = action.payload;
      const currentPlayer = state.players.find(
        (p: Player) => p.id === playerId
      );
      const currentPlayerIdx = state.players.findIndex(
        (p: Player) => p.id === playerId
      );
      return {
        ...state,
        throws: [...state.throws, { playerId, points }],
        players: [
          ...state.players.slice(0, currentPlayerIdx),
          {
            ...currentPlayer,
            score: currentPlayer.score + points,
            isAtRisk: points > 0 ? false : currentPlayer.isAtRisk,
          },
          ...state.players.slice(currentPlayerIdx + 1),
        ],
        turn: state.turn + 1,
      };
    },
    undoThrow: (state: any) => {
      const lastThrow = state.throws.find(
        (_: Throw, i: number) => i !== state.throws.length - 1
      );
      const lastPlayer = state.players.find(
        (p: Player) => p.id === lastThrow.playerId
      );
      return {
        ...state,
        throws: state.throws.filter(
          (_: Throw, i: number) => i !== state.throws.length - 1
        ),
        players: [
          ...state.players,
          { ...lastPlayer, score: lastPlayer.score - lastThrow.points },
        ],
        turn: state.turn - 1,
      };
    },
    startGame: (state: any) => {
      return {
        ...state,
        throws: [],
        // players: [
        //   ...state.players.forEach((p: Player) => {
        //     p.score = 0;
        //   }),
        // ],
        turn: 0,
        order: state.players
          .map((p: Player) => p.id)
          .map((playerId: string) => ({ playerId, sort: Math.random() }))
          .sort(
            (
              a: { playerId: string; sort: number },
              b: { playerId: string; sort: number }
            ) => a.sort - b.sort
          )
          .map(({ playerId }: { playerId: string }) => playerId),
      };
    },
    setAtRisk: (state: any, action: PayloadAction<{ playerId: string }>) => {
      const player = state.players.find(
        (p: Player) => p.id === action.payload.playerId
      );
      const playerIdx = state.players.findIndex(
        (p: Player) => p.id === action.payload.playerId
      );
      return {
        ...state,
        players: [
          ...state.players.slice(0, playerIdx),
          { ...player, isAtRisk: true },
          ...state.players.slice(playerIdx + 1),
        ],
      };
    },
    eliminatePlayer: (
      state: any,
      action: PayloadAction<{ playerId: string }>
    ) => {
      const player = state.players.find(
        (p: Player) => p.id === action.payload.playerId
      );
      const playerIdx = state.players.findIndex(
        (p: Player) => p.id === action.payload.playerId
      );
      return {
        ...state,
        players: [
          ...state.players.slice(0, playerIdx),
          { ...player, isEliminated: true },
          ...state.players.slice(playerIdx + 1),
        ],
      };
    },
    setWinner: (state: any, action: PayloadAction<{ playerId: string }>) => {
      return {
        ...state,
        winner: action.payload.playerId,
      };
    },
  },
});

/*
 * Export reducer for store configuration.
 */
export const gameReducer = gameSlice.reducer;

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(gameActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const gameActions = gameSlice.actions;

const { selectAll, selectEntities } = gameAdapter.getSelectors();

export const getGameState = (rootState: any): GameState =>
  rootState[GAME_FEATURE_KEY];

export const selectAllGame = createSelector(getGameState, selectAll);

export const selectGameEntities = createSelector(getGameState, selectEntities);
export const selectPlayers = createSelector(
  getGameState,
  (state) => state.players
);
export const selectThrows = createSelector(
  getGameState,
  (state) => state.throws
);

export const selectCurrentPlayer = createSelector(getGameState, (state) =>
  state.players
    .filter((p: Player) => !p.isEliminated)
    .find((p: Player) => p.id === state.order[state.turn % state.order.length])
);

export const selectWinner = createSelector(
  getGameState,
  (state) => state.winner
);
