import useCustomSnackbar from '@hooks/useCustomSnackbar'
import { useMutation } from '@tanstack/react-query'
import http from '@variable/Api'

const useSaveResetPassword = ({ onSuccess }) => {
    const { success } = useCustomSnackbar()
    return useMutation({
        mutationFn: async ({ formData }) => {
            const res = await http.post(`user/reset-password/with-old-password`, formData)
            success('Success Change Password!')
        },
        onSuccess,
    })
}

export default useSaveResetPassword