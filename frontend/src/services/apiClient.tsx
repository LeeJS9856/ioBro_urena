import axios from 'axios';
import config from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage import

const baseURL =  config.baseURL;
// Axios 인스턴스 생성
const apiClient = axios.create({
    baseURL: baseURL,
    timeout: 50000, // 요청 타임아웃
});
// 요청 인터셉터
apiClient.interceptors.request.use(
    async (config) => {
        const accessToken = await AsyncStorage.getItem('accessToken'); // AsyncStorage로 토큰 가져오기
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        console.log('Request Config:', config);
        return config;
    },
    (error) => Promise.reject(error),
);

// 응답 인터셉터
apiClient.interceptors.response.use(
    (response) => {
        console.log('Response:', response);
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        // 재전송 방지용 플래그
        originalRequest._retry = originalRequest._retry || false;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refresh = await AsyncStorage.getItem('refreshToken'); // AsyncStorage에서 refreshToken 가져오기
            if (refresh) {
                try {
                    const response = await axios.post(`${baseURL}/api/token/refresh/`, {
                        refresh: refresh,
                    });
                    const accessToken = response.data.access;
                    const refreshToken = response.data.refresh;
                    await AsyncStorage.setItem('accessToken', accessToken); // AsyncStorage에 토큰 저장
                    await AsyncStorage.setItem('refreshToken', refreshToken);

                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                    return apiClient(originalRequest);
                } catch (refreshError) {
                    await AsyncStorage.removeItem('accessToken'); // 실패 시 토큰 삭제
                    await AsyncStorage.removeItem('refreshToken');
                    // 로그인 페이지로 리다이렉트
                    return Promise.reject(refreshError);
                }
            } else {
                // refreshToken 없으면 로그인 페이지로 리다이렉트
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    },
);

export default apiClient;
