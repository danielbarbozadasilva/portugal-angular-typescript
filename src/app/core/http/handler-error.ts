import { AxiosError } from 'axios'

export const handleError = (error: any) => {
  if (error instanceof AxiosError) {
    console.error(
      'Erro na chamada HTTP:',
      error.message,
      'Status:',
      error.response?.status
    )
  } else {
    console.error('Erro desconhecido em OrderService:', error)
  }
}
