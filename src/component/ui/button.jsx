import "./ui.css"
import { Link, NavLink } from "react-router-dom";
export default function PButtonLink(props){
    return(
        <div>
            <NavLink to={props.link} className="pbuttonlink btn ps-3 pe-3">{props.title}</NavLink>
        </div>
    );
};
export function ButtonLink(props){
    return(
        <div>
            <a href={props.link} type="" className="buttonLink btn ps-3 pe-3">{props.title}</a>
        </div>
    );
};
export function PButton(props){
    return(
        <div>
            <button type="button" onClick={props.click} className="pbuttonlink btn fw-bold ps-2 pe-2">{props.title}</button>
        </div>
    );
};