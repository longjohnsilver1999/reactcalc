import "./style.css";
function App() {
  return (
    <div className="calculator-container">
      <div className="output-display">
        <div className="operand1">12345</div>
        <div className="operand2">12345</div>
      </div>

      <button className="C">C</button>
      <button className="del">DEL</button>
      <button>1</button>
      <button>2</button>

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
