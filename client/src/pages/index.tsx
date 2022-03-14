import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import api from "../services/laravel-api";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { redirect } from "next/dist/server/api-utils";

const Home: NextPage = () => {
  const router = useRouter();
  const enviarVoto = async (emparedadoId: number) => {
    const response = await api.post("/enviar-voto", {
      emparedadoId,
      numeroParedao: 8,
    });

    if (response.status !== 200) {
      toast.error("Houve um erro no seu voto :(", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }

    toast.success(response.data.successMessage, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    router.push("/obrigado");
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Big Brother Brasil - Votacao</title>
        <meta
          name="description"
          content="Vote agora em quem voce quer que saia da casa"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.avisoInicial}>
          Vote agora em quem voce quer que saia do Reality
          <Image
            className={styles.logobbb}
            width={200}
            height={100}
            src="/bbblogo.png"
          />
        </div>
        <div className={styles.emparedados}>
          <div className={styles.jade}>
            <Image
              className={styles.imagemRadius}
              objectFit="cover"
              width={300}
              height={300}
              src="/jade.jpeg"
            />
            <button onClick={() => enviarVoto(1)} className={styles.botaoVoto}>
              Votar em Jade Picon
            </button>
          </div>
          <div className={styles.pedro}>
            <Image
              className={styles.imagemRadius}
              objectFit="cover"
              width={300}
              height={300}
              src="/pedro.jpeg"
            />
            <button onClick={() => enviarVoto(2)} className={styles.botaoVoto}>
              Votar em Pedro Scooby
            </button>
          </div>
          <div className={styles.artur}>
            <Image
              className={styles.imagemRadius}
              objectFit="cover"
              width={300}
              height={300}
              src="/artur.jpeg"
            />
            <button onClick={() => enviarVoto(3)} className={styles.botaoVoto}>
              Votar em Artur Aguiar
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
