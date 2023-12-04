import Loading from '@components/Loading'
import Page from '@components/Page'
import useFetchDOCateringById from '@hooks/do-catering/useFetchDOCateringById'
import { Container } from '@mui/material'
import { useParams } from 'react-router-dom'
import Form from './Form'

const Edit = () => {
    const { id } = useParams()
    const { data, isLoading } = useFetchDOCateringById(id)

    if(!isLoading && !data){
      return 'Data DO Catering Tidak Ditemukan'
    }

    return (
      <Page title='Form Edit DO Catering'>
          <Container>
            {!isLoading ?
              <Form title='edit' data={data} id={id} />
            : <Loading />
            }
          </Container>
      </Page>
    )
}

export default Edit