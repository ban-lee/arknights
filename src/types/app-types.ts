export interface Link {
  label: string;
  url?: string;
  icon?: string;
}

export interface GroupLink extends Link {
  links?: Link[];
  initiallyOpened?: boolean;
}
