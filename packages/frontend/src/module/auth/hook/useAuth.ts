import { authState, AuthState } from "module/auth/AuthState";
import { useRecoilState } from "recoil";
import { AuthTokenStorage } from "module/auth/AuthTokenStorage";

export interface UseAuthResult {
    state: AuthState;
    logout: () => void;
}

export function useAuth(): UseAuthResult {
    const [state, setState] = useRecoilState(authState);
    const logout = (): void => {
        AuthTokenStorage.clear();
        setState({ token: undefined, isLogged: false });
    };
    return { state, logout };
}
