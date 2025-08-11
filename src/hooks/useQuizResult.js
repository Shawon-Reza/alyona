import axiosApi from '@/api/axiosApi';
import { useQuery } from '@tanstack/react-query';


export default function useQuizResult() {
    return useQuery({
        queryKey: ['quizResult'],
        queryFn: async () => {
            const res = await axiosApi.get('/accounts/api/v1/quiz-result');
            return res.data;
        },
        retry: 3, // Optional: retry failed requests 3 times
    });
}
