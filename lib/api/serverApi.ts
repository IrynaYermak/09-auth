import { cookies } from 'next/headers';
import { api } from './api';
import type { Note } from '@/types/note';
import type { User } from '@/types/user';
import type { fetchNotesResponse, fetchNotesProps } from './clientApi';

export async function checkServerSession() {
  const cookieStore = await cookies();
  const res = await api.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
}

export async function fetchNotes({
  search,
  page,
  tag,
}: fetchNotesProps): Promise<fetchNotesResponse> {
  const options = {
    params: {
      page,
      perPage: 12,
      search,
      tag,
    },
    headers: {
      Cookie: cookies().toString(),
    },
  };

  const response = await api
    .get<fetchNotesResponse>('/notes', options)
    .then(response => response.data);
  return response;
}

export async function fetchNoteById(id: Note['id']): Promise<Note> {
  const response = await api
    .get<Note>(`/notes/${id}`, {
      headers: {
        Cookie: cookies().toString(),
      },
    })
    .then(response => response.data);
  return response;
}

export async function getMe() {
  const response = await api.get<User>('/users/me', {
    headers: {
      Cookie: cookies().toString(),
    },
  });
  return response.data;
}
