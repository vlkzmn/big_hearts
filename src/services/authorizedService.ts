import { AxiosResponse } from 'axios';
import { clientForAuthorized } from '../http/clientForAuthorized';
import { PostData } from '../types/postData';

function changeEmail(
  current_password: string,
  new_email: string,
): Promise<AxiosResponse> {
  return clientForAuthorized.post(
    '/api/users/set_email/',
    { current_password, new_email },
  );
}

function changePassword(
  new_password: string,
  current_password: string,
): Promise<AxiosResponse> {
  return clientForAuthorized.post(
    '/api/users/set_password/',
    { new_password, current_password },
  );
}

function deleteProfile(current_password: string): Promise<AxiosResponse> {
  const data = {
    current_password,
  };

  return clientForAuthorized.delete('/api/users/me/', { data });
}

type Email = {
  email: string,
};

function checkAuthorized(): Promise<Email> {
  return clientForAuthorized.get('/api/users/me/');
}

function addNewPost(formData: FormData): Promise<AxiosResponse> {
  return clientForAuthorized.post('/api/cabinet/posts/', formData);
}

function editPost(id:number, formData: FormData): Promise<AxiosResponse> {
  return clientForAuthorized.patch(`/api/cabinet/posts/${id}/`, formData);
}

function deletePost(id:number): Promise<AxiosResponse> {
  return clientForAuthorized.delete(`/api/cabinet/posts/${id}/`);
}

function getUserPosts(): Promise<PostData[]> {
  return clientForAuthorized.get('/api/cabinet/user-posts/');
}

type Post = {
  type: string,
  category: string,
  id: number,
  title: string,
  image: string,
  text: string,
  link: string,
  person: string,
  location: string,
};

function getNewAddedPosts(): Promise<Post[]> {
  return clientForAuthorized.get('/api/admin/');
}

// function addNewPost(formData: FormData): Promise<AxiosResponse> {
//   return clientForAuthorized.post('/api/cabinet/posts/', formData, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//   });
// }

// function putPost(id:number, formData: FormData): Promise<AxiosResponse> {
//   return clientForAuthorized.put(`/api/cabinet/posts/${id}`, formData, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//   });
// }

// function verifyToken(token: string): Promise<AxiosResponse> {
//   return clientForAuthorized.post('/api/users/jwt/verify/', { token });
// }

// function getEmail(): Promise<string> {
//   return clientForAuthorized.delete('/api/users/me/');
// }

export const authorizedService = {
  changeEmail,
  changePassword,
  deleteProfile,
  checkAuthorized,
  addNewPost,
  editPost,
  getNewAddedPosts,
  getUserPosts,
  deletePost,
  // getEmail,
};
