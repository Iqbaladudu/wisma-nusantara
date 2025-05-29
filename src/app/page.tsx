import { redirect } from 'next/navigation';

export default function HomePage() {
  redirect('/dashboard');
  return null; // redirect() is a server-side utility, this component won't render.
}
