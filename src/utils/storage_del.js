/*
import storage from '@/utils/storage';
// 存储数据
storage.set('user', data);
// 获取数据
const user = storage.get('user');

*/
const STORAGE_PREFIX = 'APPNAME'; // 固定开头

const storage = {
  // 存储数据到 localStorage
  set(key, value) {
    try {
      localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
    } catch (error) {
      console.error('Error storing data to localStorage:', error);
    }
  },

  // 从 localStorage 获取数据
  get(key) {
    try {
      const value = localStorage.getItem(STORAGE_PREFIX + key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Error getting data from localStorage:', error);
      return null;
    }
  },

  // 从 localStorage 删除数据
  remove(key) {
    try {
      localStorage.removeItem(STORAGE_PREFIX + key);
    } catch (error) {
      console.error('Error removing data from localStorage:', error);
    }
  },

  // 清空 localStorage
  clear() {
    try {
      for (const key in localStorage) {
        if (key.startsWith(STORAGE_PREFIX)) {
          localStorage.removeItem(key);
        }
      }
    } catch (error) {
      console.error('Error clearing data from localStorage:', error);
    }
  },
};

export default storage;
