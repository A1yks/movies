import { RedirectType, redirect } from 'next/navigation';

export default function HomePage() {
    redirect('/movies', RedirectType.replace);
}
