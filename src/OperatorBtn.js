//digit button component
import { ACTIONS } from "./App";
import "./style.css";
export default function OperatorBtn({ dispatch, operator }) {
  return (
    <button
      onClick={() => {
        dispatch({ type: ACTIONS.CHOOSE_OP, payload: { operator } });
      }}
      className="op-btn"
    >
      {operator}
    </button>
  );
}
