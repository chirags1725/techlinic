import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState(null);

  const router = useRouter();
  // push to login/user if user not present in localstorage

  useEffect(() => {
    if (!localStorage.getItem("user") || !localStorage.getItem('user-role')) {
      router.push("/login");
    } else {
      setUser(JSON.parse(localStorage.getItem("user")));
    }

    if (localStorage.getItem("user-role") === 'doctor'){
      router.push("/doctor");
    }
    if(localStorage.getItem("user-role")==='user'){
      router.push("/user");
    }
  }, []);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
      </Head>

      
    </>
  );
}
