"use client";

import * as React from 'react';
import {useRef} from "react";
import VideoJS from "@/app/components/VideoJS";
import videojs from "video.js";
import Player from "video.js/dist/types/player"

function Page() {

    const playerRef = useRef(null);
    const videoJsOptions = {
        autoplay: false,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [{
            src: '//vjs.zencdn.net/v/oceans.mp4',
            type: 'video/mp4'
        }]
    };

    const handlePlayerReady = (player: Player) => {

        // @ts-ignore
        playerRef.current = player;

        // You can handle player events here, for example:
        player.on('waiting', () => {
            videojs.log('player is waiting');
        });

        player.on('dispose', () => {
            videojs.log('player will dispose');
        });
    };


    return (
        <>
            <div>Rest of app here</div>
            <VideoJS options={videoJsOptions} onReady={handlePlayerReady}/>
            <div>Rest of app here</div>
        </>
    );
};

export default Page;