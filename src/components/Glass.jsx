/* ---------------------------------------------------------
   Glass card primitive
--------------------------------------------------------- */
export default function Glass({ children, className = "", style = {}, tone = "light" }) {
  const base =
    tone === "light"
      ? { background: "rgba(255,255,255,0.42)", border: "1px solid rgba(255,255,255,0.55)" }
      : { background: "rgba(43,23,16,0.32)", border: "1px solid rgba(255,255,255,0.18)" };
  return (
    <div className={`backdrop-blur-xl shadow-lg ${className}`} style={{ ...base, ...style }}>
      {children}
    </div>
  );
}
