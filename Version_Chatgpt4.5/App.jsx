import { useState, useEffect } from "react";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [canClick, setCanClick] = useState(false);
  const [count, setCount] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [message, setMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(5);

  // Secuencia inicial: Preparados, Listos, Ya
  const startGame = () => {
    setGameStarted(true);
    setCount(0);
    setMessage("Preparados");
    setTimeout(() => setMessage("Listos"), 1000);
    setTimeout(() => setMessage("Ya"), 2000);
    setTimeout(() => {
      setCanClick(true);
      setTimeLeft(5);
    }, 3000);
  };

  // Temporizador del juego
  useEffect(() => {
    let timer;
    if (canClick && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    if (timeLeft === 0 && canClick) {
      setCanClick(false);
      setGameStarted(false);
      if (count > highScore) {
        setHighScore(count);
      }
    }
    return () => clearInterval(timer);
  }, [canClick, timeLeft]);

  const handleClick = () => {
    if (canClick) {
      setCount((prev) => prev + 1);
    }
  };

  return (
    <div className="container">
      <h1>Juego Contador</h1>
      <h2>Puntaje máximo: {highScore}</h2>
      {gameStarted && !canClick && <h3>{message}</h3>}
      {canClick && (
        <>
          <h3>Tiempo restante: {timeLeft}s</h3>
          <h3>Clicks: {count}</h3>
        </>
      )}
      <div className="buttons">
        <button onClick={startGame} disabled={gameStarted}>
          Iniciar
        </button>
        <button onClick={handleClick} disabled={!canClick}>
          Click!
        </button>
      </div>
    </div>
  );
}

export default App;
