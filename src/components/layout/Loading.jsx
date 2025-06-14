export default function LoadingOverlay({
  isLoading = false,
  text = "Loading...",
}) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        {/* Gambar loading */}
        <img
          src="/loading.png"
          alt="Loading..."
          className="w-16 h-16 animate-spin"
        />

        {/* Teks loading */}
        <p className="text-white text-lg font-semibold">{text}</p>
      </div>
    </div>
  );
}
