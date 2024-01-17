export type CardPropType = {
  record: RecordType;
  onclick?: (record: RecordType) => void;
  search?: string;
};

export type RecordType = {
  label: string;
  value: string;
  profileUrl: string;
  avatar: string;
};

export type GithubUserItemType = {
  login: string;
  id: string;
  url: string;
  avatar_url: string;
};

export type AutoCompletePropType = {
  fetchWithQuery: (search: string) => Promise<RecordType[]>;
  value?: RecordType;
  debounceDelay: number;
  placeholder?: string;
  onSelect: (data: RecordType) => void;
};
