import Footer from "./footer";
import Navbar from "./navbar";

const IndexLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default IndexLayout;
