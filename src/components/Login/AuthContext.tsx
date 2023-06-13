import {
    createContext,
    FC,
    ReactElement,
    useState,
    useContext,
    useCallback,
    useEffect,
} from "react";
import { backendHttp } from "../../utils/Utility";

interface Props {
    children: ReactElement | ReactElement[];
}

export const AuthContext = createContext({
    logedIn: false,
    logout: () => {},
    login: (token: string) => {},
    getToken: (): string => {
        return "";
    },
    updateLogedIn: (arg0: boolean) => {},
});

export const useAuthContext = () => {
    return useContext(AuthContext);
};

const TOKEN_KEY = "x-auth-token";

export const AuthContextProvider: FC<Props> = (props) => {
    const [logedIn, setLogedIn] = useState(false);

    const logout = useCallback(() => {
        localStorage.removeItem(TOKEN_KEY);
        setLogedIn(false);
        if (window.location.pathname !== "/") {
            window.location.href = window.location.origin;
        }
    }, []);

    const login = useCallback((token: string) => {
        localStorage.setItem(TOKEN_KEY, token);
        setLogedIn(true);
        if (window.location.pathname !== "/" && window.location.pathname !== "/contrate") {
            window.location.href = window.location.origin;
        }
    }, []);

    const getToken = useCallback(() => {
        return localStorage.getItem(TOKEN_KEY) || "";
    }, []);

    useEffect(() => {
        const token = getToken();
        if (token) {
            backendHttp
                .get("/auth/verifyToken")
                .then((res) => {
                    if (res.status === 200) {
                        login(token);
                    } else {
                        logout();
                    }
                })
                .catch((e) => {
                    logout();
                });
        } else if (window.location.pathname !== "/login" && window.location.pathname !== "/contrate" && window.location.pathname !== "/atendimento") {
            logout();
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                logedIn,
                login,
                logout,
                getToken,
                updateLogedIn: (logedIn) => setLogedIn(logedIn),
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
