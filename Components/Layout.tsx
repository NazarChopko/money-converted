 import Link from 'next/link'
 import { FC, ReactNode } from 'react'


 interface ILayoutProps{
     children:ReactNode
 }
const Layout:FC<ILayoutProps> = ({children}) => {
    return (
        <>
            <nav className='header_container'>
                 <Link href='/converted'><a className='button'>Converted</a></Link>
                 <Link href='/currencies'><a className='button'>Currencies</a></Link>
            </nav>
            <div className='bg-image'></div>
            <div className='bg-color'>{children}</div>
        </>
    )
}

export default Layout
