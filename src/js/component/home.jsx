import React, { useEffect, useState } from "react";
import Spotify from "./spotify.jsx";

//create your first component
const Home = () => {
	//Declare state of array
	const [list, setList] = useState([]);
	const [currentSong, setCurrentSong] = useState("");
	const [currentTitleSong, setCurrentTitleSong] = useState("");
	const [currentIndexSong, setCurrentIndexSong] = useState();

	let url = "https://assets.breatheco.de/apis/sound/songs";

	let save = [];
	useEffect(() => {
		fetch(url, { method: "GET" })
			.then(response => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response.json();
			})
			.then(songsJson => {
				setList(songsJson);
			})
			.catch(function(error) {
				console.log("Looks like there was a problem: \n", error);
			});
	}, []);

	for (let i = 0; i < list.length; i++) {
		save.push(
			<li className="songs">
				<Spotify
					name={list[i].name}
					key={i.toString()}
					url={list[i].url}
					play={() => {
						setCurrentSong(list[i].url);
						setCurrentTitleSong(list[i].name);
						setCurrentIndexSong(i);
					}}
				/>
			</li>
		);
	}
	const Player = () => {
		return (
			<figure>
				<figcaption>
					<h4>
						<p className="playingSong">
							Playing {currentTitleSong}
						</p>
					</h4>
				</figcaption>
				<audio
					controls
					autoPlay
					src={"https://assets.breatheco.de/apis/sound/".concat(
						currentSong
					)}>
					Your browser does not support the
					<code>audio</code> element.
				</audio>
			</figure>
		);
	};

	return (
		<div className="container text-center mt-3">
			<h1>Gamerfy</h1>
			<ul>{save}</ul>
			<div className="containerButton">
				<button
					className="btn btn-light"
					onClick={() => {
						if (currentIndexSong != 0) {
							setCurrentSong(list[currentIndexSong - 1].url);
							setCurrentIndexSong(currentIndexSong - 1);
							setCurrentTitleSong(
								list[currentIndexSong - 1].name
							);
						} else {
							setCurrentSong(list[list.length - 1].url);
							setCurrentIndexSong(list.length - 1);
							setCurrentTitleSong(list[list.length - 1].name);
						}
					}}>
					<i className="fas fa-backward"></i>
				</button>
				<Player />
				<button
					className="btn btn-light"
					onClick={() => {
						if (currentIndexSong != list.length - 1) {
							setCurrentSong(list[currentIndexSong + 1].url);
							setCurrentIndexSong(currentIndexSong + 1);
							setCurrentTitleSong(
								list[currentIndexSong + 1].name
							);
						} else {
							setCurrentSong(list[0].url);
							setCurrentIndexSong(0);
							setCurrentTitleSong(list[0].name);
						}
					}}>
					<i className="fas fa-forward"></i>
				</button>
			</div>
		</div>
	);
};

export default Home;
