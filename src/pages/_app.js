import "@/styles/globals.css";
import { ThemeProvider } from "../../lib/themeContext";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const [storage, setStorage] = useState(null);

  useEffect(() => {
    setStorage(localStorage);
  }, []);

  //wait till localStorage is ready
  if (!storage) return;

  return (
    <ThemeProvider storage={storage}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
