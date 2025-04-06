import { createContext, useContext, useState } from "react";

const DemoModeContext = createContext({
    demoMode: false,
    setDemoMode: (_: boolean) => { },
});

export const DemoModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [demoMode, setDemoMode] = useState(false);

    return (
        <DemoModeContext.Provider value={{ demoMode, setDemoMode }}>
            {children}
        </DemoModeContext.Provider>
    );
}

export const useDemoMode = () => {
    const context = useContext(DemoModeContext);
    if (!context) throw new Error("useDemoMode must be used within a DemoModeProvider");
    return context;
};