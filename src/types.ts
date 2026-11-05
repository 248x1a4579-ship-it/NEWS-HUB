export type NewsCategory = 
  | 'General'
  | 'Technology'
  | 'Sports'
  | 'Business'
  | 'Entertainment'
  | 'Health'
  | 'Science';

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  source: {
    name: string;
    url?: string;
  };
  author: string;
  category: NewsCategory;
  isBreaking?: boolean;
}

export interface FlutterFile {
  path: string;
  name: string;
  folder: string;
  student: 'Student 1' | 'Student 2' | 'Student 3' | 'Team Shared';
  purpose: string;
  code: string;
}

export type ActiveTab = 'home' | 'categories' | 'search' | 'bookmarks';
