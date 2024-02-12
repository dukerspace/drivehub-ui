import { Footer } from '../Footer/Footer'
import { Header } from '../Header/Header'
import './Layout.css'

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div className="main">{children}</div>
      <Footer />
    </>
  )
}
