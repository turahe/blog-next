import Image from "next/image";

type BlogCoverImageProps = {
  src: string;
  alt: string;
};

export function BlogCoverImage({ src, alt }: BlogCoverImageProps) {
  const remote = src.startsWith("http://") || src.startsWith("https://");
  return (
    <figure className="not-prose my-10 overflow-hidden rounded-2xl shadow-lg shadow-slate-900/10 ring-1 ring-slate-200/80 dark:shadow-black/40 dark:ring-slate-700/60">
      <div className="relative aspect-[2/1] w-full max-h-[min(420px,50vh)] bg-slate-100 dark:bg-slate-800/50">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-[transform] duration-[400ms] ease-out hover:scale-[1.04] motion-reduce:transition-none motion-reduce:hover:scale-100"
          sizes="(max-width: 896px) 100vw, 896px"
          priority
          unoptimized={remote}
        />
      </div>
    </figure>
  );
}
