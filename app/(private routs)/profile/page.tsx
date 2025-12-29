import { Metadata } from 'next';
import css from './profile.module.css';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'NoteHub profile',
  description: 'NoteHub user profile page',
  openGraph: {
    title: 'NoteHub profile',
    description: 'NoteHub user profile page.',
    url: `https://08-zustand-seven-xi.vercel.app/`,
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
        width: 1200,
        height: 630,
        alt: `NoteHub`,
      },
    ],
  },
};

export default function Profile() {
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src="Avatar"
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: your_username</p>
          <p>Email: your_email@example.com</p>
        </div>
      </div>
    </main>
  );
}
