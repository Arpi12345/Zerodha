import { useContext } from "react";
import GeneralContext from "./GeneralContext";

const useGeneralContext = () => {
  const context = useContext(GeneralContext);
  if (!context) {
    throw new Error("useGeneralContext must be used within a GeneralContextProvider");
  }
  return context;
};

export default useGeneralContext;
