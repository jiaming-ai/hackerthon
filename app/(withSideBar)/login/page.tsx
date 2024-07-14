
import  LoginForm from '@/components/Login/LoginForm';
import { getUser } from '@/utils/auth/authServer';
import { redirect } from 'next/navigation';

export default async function LoginPage({
  params,
  searchParams,
}: {
  params: { next: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  
  const user = await getUser();
  let next = '/';
  if (searchParams?.next) {
    next = searchParams.next as string;
  }

  if (user) {
    redirect('/');
  }

  return (
    <>
    <LoginForm props={{}} next={next} />
    </>
  )
}
