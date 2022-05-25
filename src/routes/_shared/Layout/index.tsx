import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import styles from './layout.module.scss'

import GNB from '../GNB'
import Header from '../Header'
import Loader from '../Loader'

const Layout = () => {
  return (
    <Suspense fallback={<Loader />}>
      <div className={styles.container}>
        <aside className={styles.aside}>
          <GNB />
        </aside>
        <div className={styles.wrapper}>
          <header className={styles.header}>
            <Header />
          </header>
          <main className={styles.main}>
            <Outlet />
          </main>
        </div>
      </div>
    </Suspense>
  )
}

export default Layout
