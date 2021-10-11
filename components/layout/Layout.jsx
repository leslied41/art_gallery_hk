import MainNavigation from "./MainNavigation";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <>
      <MainNavigation />
      <main>{children}</main>
      <Footer />
    </>
  );
}
