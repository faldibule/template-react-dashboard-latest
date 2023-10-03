import useCustomSnackbar from '@hooks/useCustomSnackbar'
import http from '@variable/Api'
import { useMutation } from 'react-query'

const useDeleteCustomer = ({ onSuccess }) => {
    const { success } = useCustomSnackbar()
    return useMutation({
        mutationFn: async (id) => {
            const res = await http.delete(`customer/${id}`)
            success('Success Delete Customer!')
        },
        onSuccess,
    })
}

export default useDeleteCustomer