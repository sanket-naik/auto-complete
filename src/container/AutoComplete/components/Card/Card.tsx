import React, { memo } from "react";
import "./Card.styles.css";
import Highlighter from "../Highlighter/Highlighter";
import { CardPropType } from "../../AutoComplete.types";

function Card({ record, search = "", onclick }: CardPropType) {
  const { label, value, avatar, profileUrl } = record;

  const handleClick = () => {
    if (!onclick) {
      window.open(profileUrl, "_blank");
    } else {
      onclick(record);
    }
  };

  return (
    <div className="card-container" onClick={handleClick}>
      <div>
        <img alt="profile-img" src={avatar} className="avatar-wrapper" />
      </div>
      <div className="card-flex-item">
        <div className="card-title">
          <Highlighter search={search}>{label}</Highlighter>
        </div>
        <div className="card-subtitle">{value}</div>
      </div>
    </div>
  );
}

export default memo(Card);
