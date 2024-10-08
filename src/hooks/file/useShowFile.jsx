import http from '@variable/Api'
import { useMutation } from 'react-query'

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