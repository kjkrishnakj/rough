import Navbar from "@/components/Navbar";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  const buyNow = (itemCode, qty, price, name) => {
     
    qty=qty-1;
    // router.push(`/`);
  };
  return (
    <>
  <Navbar/>
  <Component {...pageProps} />
  </>
)
  ;
}
