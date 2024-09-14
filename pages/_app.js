import "@/styles/globals.css";
import Layout from "./Components/Layout";
import { useRouter } from "next/router";
import {NextUIProvider} from "@nextui-org/react";
import { useEffect } from "react";
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";


export default function App({ Component, pageProps }) {
  const showSidebar = Component.showSidebar !== false;
  const useLayout = Component.useLayout !== false;

  const router = useRouter();



  // useEffect(() => {
  //   if (!localStorage.getItem('user')) {
  //     router.push("/login"); // replace with the URL you want to redirect to
  //   }
  // }, []);


  return (
        <PrimeReactProvider>
<NextUIProvider>
    <Layout showSidebar={showSidebar} useLayout={useLayout}>
      <Component {...pageProps} />
    </Layout>
    </NextUIProvider>
    </PrimeReactProvider>
  );
}
