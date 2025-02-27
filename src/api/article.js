// src/api/article.js
import api from './axios';

export function getArticleList(pageNum, pageSize, classid) {
  return api.get('/article-list', {
    params: {
      pageNum,
      pageSize,
      classid
    }
  });
}