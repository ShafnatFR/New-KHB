// ============================================================
// src/components/ui/LoadingSkeleton.tsx
// Komponen skeleton loading yang premium & reusable
// ============================================================

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-slate-200 rounded-xl ${className}`}
    />
  );
}

/** Skeleton untuk kartu event/gallery/repository */
export function CardSkeleton() {
  return (
    <div className="bg-slate-50 rounded-[2.5rem] overflow-hidden border border-slate-100">
      <Skeleton className="aspect-video w-full rounded-none" />
      <div className="p-8 space-y-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-12 w-full mt-4" />
      </div>
    </div>
  );
}

/** Skeleton untuk grid gallery/repository */
export function ImageCardSkeleton() {
  return (
    <div className="aspect-[4/3] rounded-[2rem] overflow-hidden">
      <Skeleton className="w-full h-full rounded-none" />
    </div>
  );
}

interface GridSkeletonProps {
  count?: number;
  CardComponent?: () => JSX.Element;
}

/** Grid skeleton untuk daftar kartu */
export function GridSkeleton({
  count = 6,
  CardComponent = CardSkeleton,
}: GridSkeletonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <CardComponent key={i} />
      ))}
    </div>
  );
}

/** State error ringan dengan tombol retry */
interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  message = 'Gagal memuat data.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="text-center py-20">
      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 text-red-400 text-2xl">
        ⚠
      </div>
      <p className="text-slate-500 text-lg mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-primary font-bold hover:underline"
        >
          Coba Lagi
        </button>
      )}
    </div>
  );
}
