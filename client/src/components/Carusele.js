import React, { useMemo, useState } from "react";
import { BiRightArrow, BiLeftArrow } from "react-icons/bi";
import "./Carusele.css";

export default function Carousela(props) {
    const [curStep, setStep] = useState(0);
    const { Template, data, count, step } = props; //Template = how to show (a component that handles your data), data = what to show(array), count= How many to show(int), step = how many to slide
    const maxStep = useMemo(() => data.length - count, [data, count]);

    const slide = (steps) => {
        let newStep = Math.max(0, Math.min(curStep + steps, maxStep));
        setStep(newStep);
    };

    return (
        <div className="carousela-container" id={props.id}>
            <div className="carousela-button" onClick={() => slide(-step)}>
                {<BiLeftArrow />}
            </div>
            <div className="surface">
                {data
                    .slice(curStep, curStep + count)
                    .map(d => Template(d))}
            </div>
            <div className="carousela-button" onClick={() => slide(step)}>
                {<BiRightArrow />}
            </div>
        </div>
    );
}