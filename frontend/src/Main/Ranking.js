import React from 'react';
import "./Ranking.css";

const Ranking = ({title,}) => {
    return (
        <div className = "Ranking-Main">
            <span className = "Ranking-Title">{title}</span>
            <div className="Ranking-Box"></div>
        </div>
    );
};

export default Ranking;