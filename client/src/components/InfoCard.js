import React from 'react';
import { Link } from 'react-router-dom';

function InfoCard(props) {
    return (
        <Link to={props.link} className="info">
            <div className="infoCard">
                <img src={props.img} />
                <div>{props.content}</div>
                {props.extraInfo.map(info => (
                    <div>
                        {info}
                    </div>
                ))}
            </div>
        </Link>
    )
}

export default InfoCard;