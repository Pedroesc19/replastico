import React from "react";
import PropTypes from "prop-types";

const TeamCard = ({ name, role, image }) => {
  return (
    <div className="team-card">
      <img src={image} alt={name} className="team-image" />
      <h3 className="team-name">{name}</h3>
      <p className="team-role">{role}</p>
    </div>
  );
};

TeamCard.propTypes = {
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default TeamCard;
