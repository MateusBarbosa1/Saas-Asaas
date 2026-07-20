export default function Placeholder({ title, text }) {
  return (
    <div className="card" style={{ padding: 40, textAlign: 'center', color: 'var(--ash)' }}>
      <div className="eyebrow" style={{ justifyContent: 'center', marginBottom: 14 }}>Em breve</div>
      <h2 style={{ marginBottom: 10 }}>{title}</h2>
      <p style={{ fontSize: 14 }}>{text}</p>
    </div>
  );
}
