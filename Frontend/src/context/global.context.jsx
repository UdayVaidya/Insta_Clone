import { createContext, useState } from "react";

export const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
    const [theme, setTheme] = useState("dark");
    return (
        <GlobalContext.Provider value={{ theme, setTheme }}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;