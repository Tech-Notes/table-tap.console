export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-background">
      <div className="w-full max-w-sm px-8 py-10 space-y-6 sm:w-full sm:max-w-md">
        {children}
      </div>
    </div>
  );
}
