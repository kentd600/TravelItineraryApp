import type { WdStateVal } from "./context/WandererContext";

export type WdHistory = [] | WdStateVal[]

export interface WdHistoryDispatcherArgs {
  type: string,
  payload?: WdStateVal
}

export default function wdHistoryReducer(state: WdHistory, action: WdHistoryDispatcherArgs) {
  switch (action.type) {
    case "add":
      if (!action.payload) throwHistoryDispatchError("Missing state to add to history!");
      return [...state, action.payload!];
    default:
      return state;
  }
}

function throwHistoryDispatchError(message: string) {
  throw new Error(message);
}