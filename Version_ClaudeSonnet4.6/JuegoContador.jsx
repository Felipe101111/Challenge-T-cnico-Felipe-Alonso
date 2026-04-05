import { useState, useRef, useEffect, useCallback } from "react";

const COUNTDOWN_STEPS = ["Preparados", "Listos", "¡Ya!"];
const GAME_DURATION = 5;

const styles = {
  root: {
    minHeight: "100vh",
    background: "#0a0a0f",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Courier New', Courier, monospace",
    padding: "1rem",
  },
  card: {
    background: "#12121a",
    border: "1px solid #2a2a3a",
    borderRadius: "16px",
    padding: "2.5rem 2rem",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
    boxShadow: "0 0 60px rgba(0,255,160,0.04)",
  },
  title: {
    fontSize: "1.1rem",
    letterSpacing: "0.25em",
    color: "#00ffa0",
    textTransform: "uppercase",
    margin: "0 0 2rem",
    fontWeight: "bold",
  },
  statsRow: {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "2rem",
    gap: "1rem",
  },
  statBox: {
    flex: 1,
    background: "#0d0d14",
    border: "1px solid #1e1e2e",
    borderRadius: "10px",
    padding: "1rem 0.5rem",
  },
  statLabel: {
    fontSize: "0.65rem",
    letterSpacing: "0.15em",
    color: "#555570",
    textTransform: "uppercase",
    marginBottom: "0.4rem",
  },
  statValue: {
    fontSize: "2.2rem",
    fontWeight: "bold",
    lineHeight: 1,
  },
  countdownArea: {
    height: "72px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "1.5rem",
  },
  countdownText: {
    fontSize: "2rem",
    fontWeight: "bold",
    letterSpacing: "0.1em",
    color: "#ffe066",
    textTransform: "uppercase",
    animation: "pulse 0.4s ease-out",
  },
  timerBar: {
    height: "4px",
    background: "#1e1e2e",
    borderRadius: "2px",
    marginBottom: "1.5rem",
    overflow: "hidden",
  },
  timerFill: {
    height: "100%",
    background: "#00ffa0",
    borderRadius: "2px",
    transition: "width 1s linear, background 0.5s",
  },
  buttonsRow: {
    display: "flex",
    gap: "0.75rem",
  },
  btnStart: {
    flex: 1,
    padding: "0.85rem",
    borderRadius: "8px",
    border: "1px solid",
    fontSize: "0.75rem",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    fontFamily: "inherit",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  btnClick: {
    flex: 2,
    padding: "0.85rem",
    borderRadius: "8px",
    border: "1px solid",
    fontSize: "0.85rem",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    fontFamily: "inherit",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.15s",
  },
  finishedMsg: {
    fontSize: "0.75rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    marginTop: "1.25rem",
    height: "1.2rem",
  },
};

export default function JuegoContador() {
  const [phase, setPhase] = useState("idle");
  const [countdownMsg, setCountdownMsg] = useState("");
  const [count, setCount] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);

  const countRef = useRef(0);
  const timersRef = useRef([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((id) => {
      clearTimeout(id);
      clearInterval(id);
    });
    timersRef.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const startGame = useCallback(() => {
    clearTimers();
    countRef.current = 0;
    setCount(0);
    setTimeLeft(GAME_DURATION);
    setPhase("countdown");
    setCountdownMsg("");

    COUNTDOWN_STEPS.forEach((msg, i) => {
      const t = setTimeout(() => {
        setCountdownMsg(msg);

        if (i === COUNTDOWN_STEPS.length - 1) {
          const t2 = setTimeout(() => {
            setPhase("playing");
            setCountdownMsg("");
            let remaining = GAME_DURATION;

            const interval = setInterval(() => {
              remaining -= 1;
              setTimeLeft(remaining);

              if (remaining <= 0) {
                clearInterval(interval);
                const finalCount = countRef.current;
                setMaxScore((prev) => Math.max(prev, finalCount));
                setPhase("finished");
              }
            }, 1000);

            timersRef.current.push(interval);
          }, 700);

          timersRef.current.push(t2);
        }
      }, i * 1000);

      timersRef.current.push(t);
    });
  }, [clearTimers]);

  const handleClick = useCallback(() => {
    if (phase !== "playing") return;
    countRef.current += 1;
    setCount(countRef.current);
  }, [phase]);

  const isStartDisabled = phase === "countdown" || phase === "playing";
  const isClickDisabled = phase !== "playing";
  const timerPercent = (timeLeft / GAME_DURATION) * 100;
  const beatMaxScore = phase === "finished" && count > 0 && count >= maxScore && maxScore > 0;
  const newRecord = phase === "finished" && beatMaxScore;

  const timerColor =
    timeLeft > 3 ? "#00ffa0" : timeLeft > 1 ? "#ffe066" : "#ff5566";

  const countColor =
    phase === "playing" ? "#00ffa0" : phase === "finished" ? "#ffe066" : "#444460";

  return (
    <>
      <style>{`
        @keyframes pulse {
          0% { transform: scale(0.8); opacity: 0.4; }
          60% { transform: scale(1.08); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes pop {
          0% { transform: scale(1); }
          40% { transform: scale(0.93); }
          100% { transform: scale(1); }
        }
        .btn-click-active:active {
          animation: pop 0.12s ease-out;
        }
      `}</style>

      <div style={styles.root}>
        <div style={styles.card}>
          <p style={styles.title}>JuegoContador</p>

          <div style={styles.statsRow}>
            <div style={styles.statBox}>
              <p style={styles.statLabel}>Clicks</p>
              <p style={{ ...styles.statValue, color: countColor }}>{count}</p>
            </div>
            <div style={styles.statBox}>
              <p style={styles.statLabel}>Tiempo</p>
              <p
                style={{
                  ...styles.statValue,
                  color: phase === "playing" ? timerColor : "#444460",
                }}
              >
                {phase === "playing" ? timeLeft : phase === "finished" ? 0 : GAME_DURATION}
              </p>
            </div>
            <div style={styles.statBox}>
              <p style={styles.statLabel}>Máximo</p>
              <p style={{ ...styles.statValue, color: "#a78bfa" }}>{maxScore}</p>
            </div>
          </div>

          <div style={styles.timerBar}>
            <div
              style={{
                ...styles.timerFill,
                width: phase === "playing" ? `${timerPercent}%` : phase === "idle" || phase === "countdown" ? "100%" : "0%",
                background: timerColor,
              }}
            />
          </div>

          <div style={styles.countdownArea}>
            {countdownMsg && (
              <span key={countdownMsg} style={styles.countdownText}>
                {countdownMsg}
              </span>
            )}
          </div>

          <div style={styles.buttonsRow}>
            <button
              onClick={startGame}
              disabled={isStartDisabled}
              style={{
                ...styles.btnStart,
                background: isStartDisabled ? "transparent" : "#00ffa015",
                borderColor: isStartDisabled ? "#222230" : "#00ffa050",
                color: isStartDisabled ? "#333350" : "#00ffa0",
                cursor: isStartDisabled ? "not-allowed" : "pointer",
              }}
            >
              Iniciar
            </button>

            <button
              onClick={handleClick}
              disabled={isClickDisabled}
              className="btn-click-active"
              style={{
                ...styles.btnClick,
                background: isClickDisabled ? "transparent" : "#00ffa020",
                borderColor: isClickDisabled ? "#222230" : "#00ffa0",
                color: isClickDisabled ? "#222235" : "#00ffa0",
                cursor: isClickDisabled ? "not-allowed" : "pointer",
                fontSize: isClickDisabled ? "0.85rem" : "1.1rem",
              }}
            >
              {phase === "playing" ? "¡Click!" : "Click"}
            </button>
          </div>

          <p
            style={{
              ...styles.finishedMsg,
              color: newRecord ? "#ffe066" : "#333350",
            }}
          >
            {newRecord ? "✦ nuevo récord ✦" : phase === "finished" && !newRecord && count > 0 ? `intentá superar ${maxScore}` : ""}
          </p>
        </div>
      </div>
    </>
  );
}
