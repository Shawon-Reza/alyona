import axiosApi from '@/api/axiosApi';
import { useQuery } from '@tanstack/react-query';

const useGetTotalUsers = ({ currentPage, sortConfig, searchTerm }) => {
    // console.log('Hook called with:', currentPage, sortConfig, searchTerm);

    const { isLoading, error, data } = useQuery({
        queryKey: ['userlist', currentPage, sortConfig, searchTerm],
        queryFn: () =>
            axiosApi
                .get(`/admin_panel/api/v1/user-list?page=${currentPage}&sort_by=${sortConfig?.key || ''}&sort_order=${sortConfig?.direction || ''}&search=${searchTerm || ''}`)
                .then((res) => res.data),
        keepPreviousData: true,
    });

    return { isLoading, error, data };
};

export default useGetTotalUsers;
