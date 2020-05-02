import React from "react";

type UserDataInterface = { loggedIn: boolean; user: any };
type MyContextInterface = {
  authInfo: UserDataInterface;
  logOut: () => Promise<boolean>;
  logIn: () => Promise<boolean>;
};

// create the context
export const AuthContext = React.createContext<MyContextInterface | undefined>(
  undefined
);

// create the context provider, we are using use state to ensure that
// we get reactive values from the context...
type Props = {
  children: React.ReactNode;
};
export const AuthProvider: React.FC = (props: any) => {
  // the reactive values
  const [authInfo, setAuthInfo] = React.useState<UserDataInterface>();

  const logOut = () => {
    return new Promise((resolve) => {
      window.localStorage.removeItem("AUTH");
      setAuthInfo({ loggedIn: false, user: null });
      setTimeout(() => {
        return resolve(true);
      }, 1000);
    });
  };

  const logIn = (email: string, password: string) => {
    return new Promise((resolve) => {
      setAuthInfo({
        loggedIn: true,
        user: { email, id: new Date().getTime + "" },
      });
      window.localStorage.setItem("AUTH", JSON.stringify(authInfo));
      setTimeout(() => {
        return resolve(true);
      }, 1000);
    });
  };

  let v = {
    authInfo,
    logOut: logOut,
    logIn: logIn,
  };
  return <AuthContext.Provider value={v} {...props} />;
};

export const useAuth = () => React.useContext(AuthContext);
