import React, {useContext} from "react";
import { Redirect, Route } from "react-router-dom";
 
import { UserContext } from '../lib/UserContext';

type Props = {
    component: (props: any) => JSX.Element,
    path: string,
    isPrivate: boolean
}
const AppRoute = ({ component: Component, path, isPrivate, ...rest }: Props) => {
    const {user} = useContext(UserContext);
    console.log(user)
    console.log(isPrivate)
    return (
        <Route
            path={path}
            render={props =>
                isPrivate && !user.email ? (
                    <Redirect
                        to={{ pathname: "/login" }}
                    />
                ) : (
                        <Component {...props} />
                    )
            }
            {...rest}
        />
    )
}
 
export default AppRoute