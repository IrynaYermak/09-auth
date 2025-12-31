import { Metadata } from 'next';
import css from '@/components/Profile/Profile.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { getMe } from '@/lib/api/serverApi';
import { User } from '@/types/user';

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

export default async function Profile() {
  const { email, avatar, username } = (await getMe()) as User;

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={avatar || '/Avatar_Image_noteHub.png'}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
            loading="eager"
            unoptimized
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {username} </p>
          <p>Email: {email}</p>
        </div>
      </div>
    </main>
  );
}
