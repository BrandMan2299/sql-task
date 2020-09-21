import React from 'react';
import { Link } from 'react-router-dom';

function InfoCard(props) {
    return (
        <Link to={props.link} className="info">
            <div className="infoCard">
                <img src={props.img} alt="img" />
                <div>{props.content}</div>
                {props.extraInfo.map((info, i) => (
                    <div key={i}>
                        {info}
                    </div>
                ))}
            </div>
        </Link>
    )
}

export default InfoCard;