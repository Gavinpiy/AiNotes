import Image from "next/image";
import logo from "../assets/logo.jpg";
const NotFound = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-5">
      <Image src={logo} width={250} height={250} alt="logo"></Image>
      <h2>Oops, an Error Occured</h2>
      <p>Sorry, the page you are looking for does not exist!</p>
    </div>
  );
};

export default NotFound;
