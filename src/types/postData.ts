export enum Status {
  New = 'На модерації',
  Active = 'Активне',
  Rejected = 'Відхилене',
}

export type ModerationPostData = {
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

export type CategoryPostData = {
  title: string,
  image: string,
  location: string,
  url: string,
};

export type PostData = {
  id: number,
  user: number,
  url: string,
  type: string,
  title: string,
  category: string,
  text: string,
  image: string,
  link: string | null,
  delivery: string | null,
  services: string | null,
  phone: string | null,
  email: string | null,
  telegram: string | null,
  person: string,
  location: string | null,
  status: string,
};
