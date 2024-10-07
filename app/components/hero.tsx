export default function Hero() {
  return (
    <div className="text-white flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          <span className="relative inline-block">
            Recall
            <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 rounded-full blur-sm"></span>
            <span className="absolute bottom-0 left-0 w-full h-px bg-blue-400"></span>
          </span>
        </h1>
      </div>
    </div>
  );
}
