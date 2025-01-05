import type { Mutable, NavigateAction, ReadonlyReducerState, ReducerState } from '../router-reducer-types';
export declare function handleExternalUrl(state: ReadonlyReducerState, mutable: Mutable, url: string, pendingPush: boolean): ReducerState;
export declare function navigateReducer(state: ReadonlyReducerState, action: NavigateAction): ReducerState;
