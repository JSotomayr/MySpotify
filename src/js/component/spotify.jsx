import React from "react";
import PropTypes from "prop-types";

const Spotify = props => {
	return (
		<div
			className="song"
			onClick={() => {
				props.play();
			}}>
			{props.name}
		</div>
	);
};

Spotify.propTypes = {
	name: PropTypes.string,
	play: PropTypes.func
};

export default Spotify;
