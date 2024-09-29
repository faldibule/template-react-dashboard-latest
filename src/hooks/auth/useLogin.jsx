import http from '@variable/Api'
import { useMutation } from 'react-query'

const useLogin = ({ onSuccess, onError }) => {
    return useMutation({
        mutationFn: async ({ formData }) => {
            const res = await http.post('/auth/login', formData)
            return res.data
        },
        onSuccess,
        onError,
    })
}

export default useLogin