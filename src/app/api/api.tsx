import { vello } from 'vello';

// GitHub API용 설정
const api = new vello({
  baseUrl: 'https://api.github.com',
  timeout: 15000,
  defaultHeaders: {
    Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
  },
});

// GET 요청 함수
export const fetchData = async (endpoint: string) => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// POST 요청 함수
export const postData = async (endpoint: string, body: Record<string, unknown>) => {
  try {
    const response = await api.post(endpoint, body);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

// PUT 요청 함수
export const putData = async (endpoint: string, body: Record<string, unknown>) => {
  try {
    const response = await api.put(endpoint, body);
    return response.data;
  } catch (error) {
    console.error('Error putting data:', error);
    throw error;
  }
};

// DELETE 요청 함수
export const deleteData = async (endpoint: string) => {
  try {
    const response = await api.delete(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
};

// API 인스턴스 export (필요한 경우 직접 사용 가능)
export { api };
