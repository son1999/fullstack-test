import { Button } from 'antd'
import styles from './page.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <main className={styles.main}>
      <Link href="/product">
        <Button size='large' type="primary">Go to products page</Button>
      </Link>
    </main>
  )
}
