import { useContext } from "react";
import { ThemeContext } from "../providers/ThemeProvider";

const HeaderName = ({ name }) => {
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <h3
      className={`text-3xl text-center font-bold mt-12 mb-5 underline underline-offset-4 ${
        isDarkMode && "text-white"
      }`}
    >
      {name}
    </h3>
  );
};

export default HeaderName;
