import { useMutation } from '@tanstack/react-query'
import http from '@variable/Api'

const useShowFile = ({ onSuccess }) => {
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
    })
}

export default useShowFile