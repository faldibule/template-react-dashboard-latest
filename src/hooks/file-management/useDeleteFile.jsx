import useCustomSnackbar from '@hooks/useCustomSnackbar'
import { useMutation } from '@tanstack/react-query'
import http from '@variable/Api'

const useDeleteFile = ({ onSuccess }) => {
    const { success } = useCustomSnackbar()
    return useMutation({
        mutationFn: async (id) => {
            const res = await http.delete(`file/${id}`)
            success('Success Delete File!')
        },
        onSuccess,
    })
}

export default useDeleteFile