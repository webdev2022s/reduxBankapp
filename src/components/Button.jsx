export default function Button({
  label = "click",
  clickFunction,
  disabled = true,
}) {
  return (
    <button onClick={clickFunction} disabled={disabled}>
      {label}
    </button>
  );
}
