import { Link } from "react-router-dom";

export default function ErrorPage(){
    return(
        <h1>Page not found go back <Link to="/">home</Link></h1>
    )
}