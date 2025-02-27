// composables/useFetchVisitStats.ts
import { ref } from 'vue';

export function useFetchVisitStats() {
  const visitStats = ref<Record<string, any> | null>(null);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const fetchVisitStats = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch('http://cwebcrm.cn:8046/api/v1/logs/visit-stats');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      visitStats.value = data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        error.value = err.message;
      } else {
        error.value = String(err);
      }
    } finally {
      loading.value = false;
    }
  };

  return {
    visitStats,
    loading,
    error,
    fetchVisitStats,
  };
}