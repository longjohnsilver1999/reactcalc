//digit button component
import { ACTIONS } from "./App";
export default function DigitBtn({ dispatch, digit }) {
  return (
    <button
      onClick={() => {
        dispatch({ type: ACTIONS.ADD_NO, payload: { digit } });
      }}
    >
      {digit}
    </button>
  );
}
