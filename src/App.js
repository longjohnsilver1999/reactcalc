import { useReducer } from "react";
import "./style.css";

const ACTIONS = {
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
      return {
        ...state, //spread new state and return
        currentOperand: `${currentOperand || ""}${payload.digit}`,
      };
  }
}
function App() {
  const [{ currentOperand, previousOperand, operator }, dispatch] = useReducer(
    reducer,
    {}
  );
  dispatch({ type: ACTIONS.ADD_NO, payload: { digit: 1 } });
  return (
    <div className="calculator-container">
      <div className="output-display">
        <div className="operand1">
          {previousOperand} {operator}
        </div>
        <div className="operand2">{currentOperand}</div>
      </div>

      <button className="C">C</button>
      <button className="del">DEL</button>
      {/* <button>1</button>
      <button>2</button>  replace button with custom components*/}

      <button className="op-btn">/</button>
      <button>3</button>
      <button>4</button>
      <button className="op-btn">*</button>
      <button>5</button>
      <button>6</button>
      <button className="op-btn">+</button>
      <button>7</button>
      <button>8</button>
      <button className="op-btn">-</button>
      <button>9</button>

      <button>0</button>
      <button>.</button>

      <button className="op">=</button>
    </div>
  );
}

export default App;
