
export default async function RootLayout({ children }: { children: any }) {
  return (
    <>
      <div className="mt-[60px] px-6">
        {children}
      </div>
    </>
  );
}
