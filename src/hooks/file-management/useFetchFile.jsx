import { useQuery } from '@tanstack/react-query'
import http from '@variable/Api'
import React from 'react'

const useFetchFile = (params) => {
    return useQuery({
        queryKey: ['files', params],
        queryFn: async ({ signal }) => {
            try {
                const res = await http.get('file', {
                    signal,
                    params
                })
                return res.data.data
            } catch (err) {
            }
        },
        gcTime: 0,
        refetchOnWindowFocus: false,
        refetchOnMount: false
    })
}

export default useFetchFile