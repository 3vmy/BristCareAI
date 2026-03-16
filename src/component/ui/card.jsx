import "./ui.css"
export default function HomeCard(props)
{
    return(
        <div className="card text-center">
            <div className="card-body">
                
                <div className={props.color}>
                    <h4>{props.i}</h4>
                </div>
                
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text">{props.discreption}</p>
            </div>
        </div>
    );
};