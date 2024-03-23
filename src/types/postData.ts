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
  New = 'На модерації',
  Active = 'Активне',
  Rejected = 'Відхилене',
}

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
  phone_number: string | null,
  email: string | null,
  telegram: string | null,
  person: string,
  location: string | null,
  status: string,
};
