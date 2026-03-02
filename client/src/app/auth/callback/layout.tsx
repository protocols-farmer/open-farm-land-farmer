// src/app/auth/callback/layout.tsx
export default function CallbackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-card/10">
      {children}
    </div>
  );
}
