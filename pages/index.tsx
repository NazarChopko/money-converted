import { FC,useEffect} from 'react'
import { useRouter } from 'next/router'

const Home:FC = () => {

  const {push}:any = useRouter()
  

  useEffect(() => push('/currencies'),[])

  return (
   <>
   </>
  )
}

export default Home
