import React, { useState, useEffect } from "react";
import "../../styles/javascriptCalculator.css";

const JavascriptCalculator = () => {
  const [currentInput, setCurrentInput] = useState(""); // Valeur affichée (en bas)
  const [result, setResult] = useState("0"); // Résultat calculé (en haut)
  const [formula, setFormula] = useState(""); // Formule complète (opérations en chaîne)

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;
      if (!isNaN(key)) handleNumber(key);
      else if (["+", "-", "*", "/"].includes(key)) handleOperator(key);
      else if (key === "Enter") calculateResult();
      else if (key === "Backspace") handleBackspace();
      else if (key === ".") handleDecimal();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentInput, formula]);

  const handleClear = () => {
    setCurrentInput("");
    setResult("0");
    setFormula("");
  };

  const handleBackspace = () => {
    setCurrentInput((prev) => prev.slice(0, -1));
    setFormula((prev) => prev.slice(0, -1));
  };

  const handleNumber = (num) => {
    setCurrentInput((prev) => (prev === "0" ? num : prev + num));
    setFormula((prev) => prev + num);
  };

  const handleOperator = (operator) => {
    setFormula((prev) => {
      const endsWithOperator = /[\+\-\*\/]$/;
      const endsWithNegative = /[\+\-\*\/]-$/;

      if (endsWithNegative.test(prev) && operator !== "-") {
        return prev.slice(0, -2) + operator;
      } else if (endsWithOperator.test(prev)) {
        return operator === "-" ? prev + operator : prev.slice(0, -1) + operator;
      } else {
        return prev + operator;
      }
    });

    setCurrentInput((prev) => {
      const endsWithOperator = /[\+\-\*\/]$/;
      const endsWithNegative = /[\+\-\*\/]-$/;

      if (endsWithNegative.test(prev) && operator !== "-") {
        return prev.slice(0, -2) + operator;
      } else if (endsWithOperator.test(prev)) {
        return operator === "-" ? prev + operator : prev.slice(0, -1) + operator;
      } else {
        return prev + operator;
      }
    });
  };

  const handleDecimal = () => {
    const inputs = currentInput.split(/[\+\-\*\/]/);
    const lastNumber = inputs[inputs.length - 1];
    if (!lastNumber.includes(".")) {
      setCurrentInput((prev) => prev + ".");
      setFormula((prev) => prev + ".");
    }
  };

  const calculateResult = () => {
    try {
      const evalResult = eval(formula.replace(/x/g, "*")); // Attention : utilisez `eval` avec précaution
      setResult(evalResult.toString());
      setCurrentInput(evalResult.toString());
      setFormula(evalResult.toString());
    } catch (err) {
      setResult("Error");
      setCurrentInput("Error");
    }
  };

  return (
    <div className="app-container">
      <div className="calculator">
        <div className="result-display">
          <div id="result">{formula || "0"}</div>
        </div>
        <div className="display">
          <div id="display">{currentInput || "0"}</div>
        </div>
        <div className="buttons">
          <button id="clear" className="btn btn-ac" onClick={handleClear}>
            AC
          </button>
          <button id="divide" className="btn operator" onClick={() => handleOperator("/")}>
            /
          </button>
          <button id="multiply" className="btn operator" onClick={() => handleOperator("*")}>
            x
          </button>
          <button id="seven" className="btn" onClick={() => handleNumber("7")}>
            7
          </button>
          <button id="eight" className="btn" onClick={() => handleNumber("8")}>
            8
          </button>
          <button id="nine" className="btn" onClick={() => handleNumber("9")}>
            9
          </button>
          <button id="subtract" className="btn operator" onClick={() => handleOperator("-")}>
            -
          </button>
          <button id="four" className="btn" onClick={() => handleNumber("4")}>
            4
          </button>
          <button id="five" className="btn" onClick={() => handleNumber("5")}>
            5
          </button>
          <button id="six" className="btn" onClick={() => handleNumber("6")}>
            6
          </button>
          <button id="add" className="btn operator" onClick={() => handleOperator("+")}>
            +
          </button>
          <button id="one" className="btn" onClick={() => handleNumber("1")}>
            1
          </button>
          <button id="two" className="btn" onClick={() => handleNumber("2")}>
            2
          </button>
          <button id="three" className="btn" onClick={() => handleNumber("3")}>
            3
          </button>
          <button id="equals" className="btn btn-equals" onClick={calculateResult}>
            =
          </button>
          <button id="zero" className="btn btn-zero" onClick={() => handleNumber("0")}>
            0
          </button>
          <button id="decimal" className="btn" onClick={handleDecimal}>
            .
          </button>
        </div>
      </div>
      <div className="author">
        <p>
          Designed and Coded by <br /> <a href="#">Loïc Kenmoe</a>
        </p>
      </div>
    </div>
  );
};

export default JavascriptCalculator;
