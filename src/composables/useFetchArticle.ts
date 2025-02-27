// src/composables/useFetchArticle.ts
import { ref } from 'vue';
import axios from 'axios';

interface Article {
  title: string;
  publishTime: string;
  publisherName: string;
  picurl?: string;
  content: string;
  comments: string;
  readcount: number; // 添加 readcount 字段
}

export function useFetchArticle() {
  const data = ref<{ article?: Article }>({ article: undefined });
  const loading = ref(true);
  const error = ref<string | null>(null);

  async function fetchArticle(id: string) {
    try {
      const response = await axios.get<{ data: Article }>(`http://cwebcrm.cn:8046/api/v1/notices/${id}/detail`);
      data.value.article = response.data.data;
      if (data.value.article.picurl) {
        // 替换反斜杠为正斜杠，并加上正确的域名
        data.value.article.picurl = `http://j.cwebcrm.cn/${data.value.article.picurl.replace(/\\/g, '/')}`;
      }
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message;
      } else {
        error.value = '请求失败，请稍后再试';
      }
    } finally {
      loading.value = false;
    }
  }

  return { data, loading, error, fetchArticle };
}