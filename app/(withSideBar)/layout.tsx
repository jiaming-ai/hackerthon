import { Sidebar } from '@/components/Sidebar/Sidebar';

export default async function RootLayout({ children }: { children: any }) {
  return (
    <>
      <div className='hidden sm:block'>
        <Sidebar />

      </div>
      <div className="mt-[60px] px-2 sm:ml-[140px] xl:ml-[160px] sm:mr-6">
        {children}
      </div>
    </>
  );
}
