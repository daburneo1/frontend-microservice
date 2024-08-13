import Header from "./Header.jsx";
import Content from "./Content.jsx";
import Footer from "./Footer.jsx";

function Template(props) {
  return (
    <>
      <Header />
      <Content>{props.children}</Content>
      <Footer />
    </>
  );
}

export default Template;
