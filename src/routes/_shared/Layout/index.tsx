import { Outlet } from 'react-router-dom'
import styles from './layout.module.scss'

import GNB from '../GNB'
import Header from '../Header'
import { Suspense } from 'react'

const Layout = () => {
  return (
    <div className={styles.container}>
      <aside className={styles.aside}>
        <GNB />
      </aside>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <Header />
        </header>
        <Suspense fallback={<div>Loading...</div>}>
          <main className={styles.main}>
            <Outlet />
          </main>
        </Suspense>
      </div>
    </div>
  )
}

export default Layout
