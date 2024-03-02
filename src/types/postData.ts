enum PostType {
  'viddam-bezkoshtovno',
  'proponuiu-posluhy',
  'zapyty-dopomohy',
  'zbir-donativ',
}

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

export type PostData = {
  postType: PostType,
  title: string,
  category: 'взуття',
  text: string,
  link: string | null,
  delivery: DeliveryType | null,
  services: ServiceType | null,
  phone: string | null,
  email: string | null,
  telegram: string | null,
  person: string,
  location: string | null,
};
