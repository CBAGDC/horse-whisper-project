// src/types/article.ts
export interface Article {
  id: number;
  articleCover: string;
  isTop: number;
  createTime: string;
  tagVOList: Array<{ id: number; tagName: string }>;
  articleTitle: string;
  category: { id: number; categoryName: string };
}