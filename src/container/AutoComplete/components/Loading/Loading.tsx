import "./Loading.styles.css";

export default function Loading({ label = "Loading..." }) {
  return (
    <div className="d-flex loader-container">
      <div className="loading"></div>
      <div className="loading-label">{label}</div>
    </div>
  );
}
