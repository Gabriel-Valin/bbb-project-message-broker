import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from '../../styles/Home.module.css'

const Obrigado: NextPage = () => {
    return (
        <div className={styles.container}>
        <Head>
            <title>Big Brother Brasil - Obrigado</title>
            <meta name="description" content="Obrigado por votar" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

      <main className={styles.main}>
        <div className={styles.containerAgradecimento}>
            <Image width={400} height={400} src='/ico.png'/>
                <h3>Vote quantas vezes quiser! </h3>
        </div>
      </main>
    </div>
    )
}

export default Obrigado