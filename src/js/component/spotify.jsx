import React from "react";

const Spotify = () => {

    fetch("https://assets.breatheco.de/apis/sound/").then(music => {
        console.log(music)

        if(music.ok) {
            return music.json()
        }
    }).then(musicAsJSON => {
        console.log(musicAsJSON);
    })
    return (
        <audio controls>
            <source src="" type="audio/mp3"/>
        </audio>
    );
}

export default Spotify;

