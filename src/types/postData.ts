type ServiceType = {
  remotely: boolean,
  meeting: boolean,
  office: boolean,
  home: boolean,
};

type DeliveryType = {
  free: boolean,
  paid: boolean,
  ukrPoshta: boolean,
  novaPoshta: boolean,
  pickup: boolean,
};

enum Status {
  new,
  active,
  rejected,
}

export type PostData = {
  user: string,
  url: string,
  postType: string,
  title: string,
  category: string,
  text: string,
  image: string,
  link: string | null,
  delivery: DeliveryType | null,
  services: ServiceType | null,
  phone: string | null,
  email: string | null,
  telegram: string | null,
  person: string,
  location: string | null,
  status: Status,
};
