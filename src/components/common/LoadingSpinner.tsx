export default function LoadingSpinner() {
  return (
    <div className="flex min-h-[40vh] w-full items-center justify-center">
      <div className="flex items-center gap-3 rounded-full border border-fuchsia-300/30 bg-black/40 px-4 py-2 text-sm text-fuchsia-100 backdrop-blur">
        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-fuchsia-200/40 border-t-fuchsia-200" />
        로딩 중...
      </div>
    </div>
  );
}
