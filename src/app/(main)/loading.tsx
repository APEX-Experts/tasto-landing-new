import { FullLogo } from "@/components/landing/layout/full-logo";

/**
 * Global loading component for the application.
 * Displays a spinner during route transitions.
 */
export default function Loading() {
  // You can replace this with a branded skeleton loader
  return (
    <div className="flex h-screen items-center justify-center">
      <FullLogo className="text-4xl animate-pulse" />
    </div>
  );
}
