import { useReducer } from "react";
import "./style.css";
import DigitBtn from "./DigitBtn";
import OperatorBtn from "./OperatorBtn";
import { type } from "@testing-library/user-event/dist/type";
export const ACTIONS = {
  ADD_NO: "add-digit",
  CLEAR: "clear",
  CHOOSE_OP: "choose-operation",
  DELETE_NO: "delete-digit",
  EVALUATE: "evaluate",
};
//reducer will manage all of our state and static variables below in const n break action in type and payload because we have different types of actions with different parameters
function reducer(state, { type, payload }) {
  //add this switch for different actions and new state returned by reducer after every action
  switch (type) {
    case ACTIONS.ADD_NO:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        };
      }
      //edge cases have to be handled
      if (payload.digit === "0" && state.currentOperand === "0") {
        //if 1st digit 0 then 0 cannot be repeated multiple times
        return state;
      }
      if (payload.digit === "." && state.currentOperand.includes(".")) {
        //if 1 . has been written then cannot be repeated
        return state;
      }

      return {
        ...state, //spread new state and return
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };

    case ACTIONS.CLEAR:
      return {}; //empty state returned when we press clear

    case ACTIONS.CHOOSE_OP:
      if (state.currentOperand == null && state.previousOperand == null) {
        // if output display empty then return state
        return state;
      }

      if (state.currentOperand == null) {
        return {
          ...state,
          operator: payload.operator,
        };
      }
      if (state.previousOperand == null) {
        // to display the previous operand and operator above by reassigning
        return {
          ...state,
          operator: payload.operator,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }
      //we need to autoperform evaluation whenever both the operands entered with operator and user enters another operand
      return {
        ...state,
        previousOperand: evaluate(state),
        operator: payload.operator,
        currentOperand: null,
      };

    case ACTIONS.EVALUATE:
      if (
        state.operator == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      ) {
        return state;
      }
      //if we have all the required things then we do thwe evaluation else we return the state as it is
      return {
        ...state,
        overwrite: true, //in order to prevent adding digits to an output we make new field
        previousOperand: null,
        operator: null,
        currentOperand: evaluate(state),
      };

    case ACTIONS.DELETE_NO:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        };
      }
      if (state.currentOperand == null) {
        //if no current operand we cannot delete everything from it
        return state;
      }
      if (state.currentOperand.length === 1) {
        return { ...state, currentOperand: null };
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };
  }
}

function evaluate({ currentOperand, previousOperand, operator }) {
  const prev = parseFloat(previousOperand);
  const curr = parseFloat(currentOperand);

  if (isNaN(prev) || isNaN(curr)) {
    return ""; //empty string returned no calculation to do
  }
  let comp = "";
  switch (operator) {
    case "+":
      comp = prev + curr;
      break;

    case "-":
      comp = prev - curr;
      break;
    case "*":
      comp = prev * curr;
      break;
    case "/":
      comp = prev / curr;
      break;
  }
  return comp.toString();
}
function App() {
  const [{ currentOperand, previousOperand, operator }, dispatch] = useReducer(
    reducer,
    {}
  );
  // dispatch({ type: ACTIONS.ADD_NO, payload: { digit: 1 } });
  return (
    <div className="calculator-container">
      <div className="output-display">
        <div className="operand1">
          {previousOperand} {operator}
        </div>
        <div className="operand2">{currentOperand}</div>
      </div>

      <button
        className="C"
        onClick={() => {
          dispatch({ type: ACTIONS.CLEAR });
        }}
      >
        AC
      </button>
      <button
        className="del"
        onClick={() => {
          dispatch({ type: ACTIONS.DELETE_NO });
        }}
      >
        DEL
      </button>
      {/* <button>1</button>
      <button>2</button>  replace button with custom components*/}
      <DigitBtn digit="1" dispatch={dispatch} />
      <DigitBtn digit="2" dispatch={dispatch} />
      <OperatorBtn operator="/" dispatch={dispatch} />
      <DigitBtn digit="3" dispatch={dispatch} />
      <DigitBtn digit="4" dispatch={dispatch} />
      <OperatorBtn operator="*" dispatch={dispatch} />
      <DigitBtn digit="5" dispatch={dispatch} />
      <DigitBtn digit="6" dispatch={dispatch} />
      <OperatorBtn operator="+" dispatch={dispatch} />
      <DigitBtn digit="7" dispatch={dispatch} />
      <DigitBtn digit="8" dispatch={dispatch} />
      <OperatorBtn operator="-" dispatch={dispatch} />
      <DigitBtn digit="9" dispatch={dispatch} />

      <DigitBtn digit="0" dispatch={dispatch} />
      <DigitBtn digit="." dispatch={dispatch} />

      <button
        className="op"
        onClick={() => {
          dispatch({ type: ACTIONS.EVALUATE });
        }}
      >
        =
      </button>
    </div>
  );
}

export default App;
