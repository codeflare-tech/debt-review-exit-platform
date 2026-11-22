import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-20">
      <div className="text-center max-w-md">
        <span className="text-6xl font-heading font-bold text-royal-50">404</span>
        <h1 className="mt-2 text-2xl">We couldn&apos;t find that page</h1>
        <p className="mt-3">The page you&apos;re looking for may have moved or no longer exists.</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="inline-flex items-center justify-center bg-royal text-white font-semibold px-6 py-3 rounded-lg">Back to home</Link>
          <Link href="/contact" className="inline-flex items-center justify-center border border-divider text-primary font-semibold px-6 py-3 rounded-lg">Contact us</Link>
        </div>
      </div>
    </div>
  );
}
