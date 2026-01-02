'use client';
import css from '@/components/EditProfile/EditProfile.module.css';
import Image from 'next/image';
import { getMe, updateMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { User } from '@/types/user';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { ApiError } from '@/app/api/api';

export default function EditProfile() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const setUser = useAuthStore(state => state.setUser);

  const { email, avatar, username } = useAuthStore(state => state.user) as User;

  const { mutate, isPending } = useMutation({
    mutationFn: updateMe,
    onSuccess: data => {
      setUser(data);
      router.push('/profile');
    },
    onError: error => {
      setError(
        (error as ApiError).response?.data?.error ?? (error as ApiError).message
      );
    },
  });

  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const newUsername = formData.get('username') as string;
    mutate({ username: newUsername });
  };

  const handleClose = () => {
    router.push('/profile');
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={avatar || '/Avatar_Image_noteHub.png'}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
          loading="eager"
          unoptimized
        />

        <form onSubmit={handleEdit} className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              name="username"
              defaultValue={username}
              type="text"
              className={css.input}
            />
          </div>

          <p>Email: {email}</p>

          <div className={css.actions}>
            <button
              type="submit"
              className={css.saveButton}
              disabled={isPending}
            >
              Save
            </button>
            <button
              onClick={handleClose}
              type="button"
              className={css.cancelButton}
            >
              Cancel
            </button>
          </div>
        </form>

        {error && (
          <p className={css.error}>
            {error}, username is not allowed to be empty.
          </p>
        )}
      </div>
    </main>
  );
}
