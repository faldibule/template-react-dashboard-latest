import { useMutation } from '@tanstack/react-query'
import http from '@variable/Api'

const useShowFile = ({ onSuccess, onError }) => {
    return useMutation({
        mutationFn: async (value) => {
            const res = await http.get(`file/show`, {
                responseType: 'blob',
                params: {
                    path: value.file
                }
            })
            return { 
                data: res.data, 
                value, 
            }
        },
        onSuccess,
        onError
    })
}

export default useShowFile