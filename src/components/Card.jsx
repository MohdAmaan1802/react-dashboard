export default function Card({ title, value }) {
  return (
    <div className="bg-blue-600 text-white rounded-xl p-4 shadow-md hover:scale-[1.02] transition-all">
      <h2 className="text-lg font-semibold capitalize mb-1">{title}</h2>
      {typeof value === "object" ? (
        <pre className="text-sm whitespace-pre-wrap break-words">
          {JSON.stringify(value, null, 2)}
        </pre>
      ) : (
        <p className="text-xl font-medium">{value}</p>
      )}
    </div>
  );
}
