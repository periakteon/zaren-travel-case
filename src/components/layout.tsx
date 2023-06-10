import Footer from "./footer";
import Navigation from "./navbar";

interface ChildrenProp {
  children?: React.ReactNode;
}

export default function Layout({ children }: ChildrenProp) {
  return (
    <>
      <Navigation />
      <main>{children}</main>
      <Footer />
    </>
  );
}
