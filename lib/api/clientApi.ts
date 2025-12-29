import { api } from './api';
import type { Note } from '@/types/note';
import type { User } from '@/types/user';

export interface fetchNotesProps {
  search?: string;
  page: number;
  tag?: string;
}

export interface fetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface createNoteProps {
  id?: string;
  title: string;
  content: string;
  tag: string;
}

interface registerRequest {
  email: string;
  password: string;
}

type Tags = string[];

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
  };

  const response = await api
    .get<fetchNotesResponse>('/notes', options)
    .then(response => response.data);
  return response;
}

export async function fetchNoteById(id: Note['id']): Promise<Note> {
  const response = await api
    .get<Note>(`/notes/${id}`)
    .then(response => response.data);
  return response;
}

export async function createNote(data: createNoteProps): Promise<Note> {
  const response = await api.post<Note>('/notes', data, {});
  return response.data;
}

export async function deleteNote(id: Note['id']): Promise<Note> {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
}

export async function register(data: registerRequest) {
  const response = await api.post<User>('/auth/register', data);
  return response.data;
}

export async function login(data: registerRequest) {
  const response = await api.post<User>('/auth/login', data);
  return response.data;
}

export async function logout() {
  await api.post('/auth/logout');
}

export async function getMe() {
  const response = await api.get<User>('/users/me');
  return response.data;
}

// export async function updateMe() {
//   const response = await api.get<User>('/users/me');
//   return response.data;
// }

interface checkSessionRequest {
  success: boolean;
}

export async function chsckSession() {
  const response = await api.get<checkSessionRequest>('/auth/session');
  return response.data.success;
}
