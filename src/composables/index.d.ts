// src/composables/index.d.ts
declare module '@/composables/*' {
  import { Ref } from 'vue';

  export interface FetchArticleResult {
    data: Ref<{ article: {
      views: any;
      picurl: any; title?: string; publishTime?: string; content?: string; comments?: number 
} } | null>;
    loading: Ref<boolean>;
    error: Ref<Error | null>;
    fetchArticle: (id: string) => Promise<void>;
  }

  export function useFetchArticle(): FetchArticleResult;
}