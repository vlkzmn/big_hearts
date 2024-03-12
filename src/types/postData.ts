// export type ServiceType = {
//   remotely: boolean,
//   meeting: boolean,
//   office: boolean,
//   home: boolean,
// };

// export type DeliveryType = {
//   free: boolean,
//   paid: boolean,
//   ukrPoshta: boolean,
//   novaPoshta: boolean,
//   pickup: boolean,
// };

export enum Status {
  new = 'На модерації',
  active = 'Активне',
  rejected = 'Відхилене',
}

export type PostData = {
  id: number,
  url: string,
  postType: string,
  title: string,
  category: string,
  text: string,
  image: string,
  link: string | null,
  delivery: string[] | null,
  services: string[] | null,
  phone: string | null,
  email: string | null,
  telegram: string | null,
  person: string,
  location: string | null,
  status: string,
};
