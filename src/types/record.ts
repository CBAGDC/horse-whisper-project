// src/types/record.ts
export interface Record {
  id: string;
  nickname: string;
  avatar: string;
  content: string;
  createTime: string;
  ipAddress?: string;
  ipSource?: string;
  userId?: number;
}