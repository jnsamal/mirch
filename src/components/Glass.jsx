/* ---------------------------------------------------------
   Glass card primitive
--------------------------------------------------------- */
export default function Glass({ children, className = "", style = {}, ...rest }) {
  return (
    <div
      className={`backdrop-blur-xl shadow-lg ${className}`}
      style={{
        background: "rgba(255,255,255,0.42)",
        border: "1px solid rgba(255,255,255,0.55)",
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
