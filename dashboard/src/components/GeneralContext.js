import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";
import BuyActionWindow from "./BuyActionWindow";
import SellActionWindow from "./SellActionWindow";

const GeneralContext = createContext({});

const getStoredAuthData = () => {
  const token = localStorage.getItem("token");
  return token
    ? {
        username: localStorage.getItem("username") || "",
        token,
        userId: localStorage.getItem("userId") || "",
        isAdmin: localStorage.getItem("isAdmin") === "true",
        isAuthenticated: true,
      }
    : {
        username: "",
        token: "",
        userId: "",
        isAdmin: false,
        isAuthenticated: false,
      };
};

export const GeneralContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authData, setAuthData] = useState(getStoredAuthData());
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [isSellWindowOpen, setIsSellWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState(null);

  const updateAuthData = (newAuth) => {
    setAuthData(newAuth);

    if (newAuth.isAuthenticated) {
      localStorage.setItem("token", newAuth.token);
      localStorage.setItem("username", newAuth.username);
      localStorage.setItem("userId", newAuth.userId);
      localStorage.setItem("isAdmin", newAuth.isAdmin);
    } else {
      localStorage.clear();
    }
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setAuthData(getStoredAuthData());
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // ✅ Login
  const login = useCallback(
    ({ token, username, userId, isAdmin }) => {
      const newAuth = { token, username, userId, isAdmin, isAuthenticated: true };
      updateAuthData(newAuth);
      navigate("/", { replace: true }); // go to dashboard home
    },
    [navigate]
  );

  // ✅ Logout
  const logout = useCallback(() => {
    updateAuthData({
      username: "",
      token: "",
      userId: "",
      isAdmin: false,
      isAuthenticated: false,
    });
    closeWindows(); // close all trade windows
    navigate("/login", { replace: true });
  }, [navigate]);

  // ✅ Trade windows
  const openBuyWindow = (uid) => {
    setSelectedStockUID(uid);
    setIsBuyWindowOpen(true);
    setIsSellWindowOpen(false);
  };

  const openSellWindow = (uid) => {
    setSelectedStockUID(uid);
    setIsSellWindowOpen(true);
    setIsBuyWindowOpen(false);
  };

  const closeBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID(null);
  };

  const closeSellWindow = () => {
    setIsSellWindowOpen(false);
    setSelectedStockUID(null);
  };

  const closeWindows = () => {
    setIsBuyWindowOpen(false);
    setIsSellWindowOpen(false);
    setSelectedStockUID(null);
  };

  // ✅ Context value
  const contextValue = useMemo(
    () => ({
      ...authData,
      login,
      logout,
      isBuyWindowOpen,
      isSellWindowOpen,
      selectedStockUID,
      openBuyWindow,
      openSellWindow,
      closeBuyWindow,
      closeSellWindow,
      closeWindows,
    }),
    [
      authData,
      login,
      logout,
      isBuyWindowOpen,
      isSellWindowOpen,
      selectedStockUID,
    ]
  );

  return (
    <GeneralContext.Provider value={contextValue}>
      {children}
      {isBuyWindowOpen && <BuyActionWindow uid={selectedStockUID} />}
      {isSellWindowOpen && <SellActionWindow uid={selectedStockUID} />}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
