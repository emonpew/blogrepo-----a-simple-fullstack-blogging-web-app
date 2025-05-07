export interface postCreateRequestBody {
  title: string;
  slug: string;
  content: string;
  published: boolean;
  tags?: string[];
}

export interface postUpdateRequestBody {
  title?: string;
  slug?: string;
  content?: string;
  published?: boolean;
  tags?: string[];
}
