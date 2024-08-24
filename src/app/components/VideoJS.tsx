import React, {useEffect, useRef} from 'react';
// @ts-ignore
// import videojs, {VideoJsPlayerOptions, VideoJsPlayer} from 'video.js';
import 'video.js/dist/video-js.css';

// import Player from 'video.js/dist/types/player';
//
// declare module 'video.js' {
//     export interface Player {
//         playlist(options: any): void; // Also tried playlist(playlist?: { options: any }): void;
//     }
// }

import videojs from "video.js";
import Player from "video.js/dist/types/player";
import type {VideoJsPlayerOptions} from 'video.js/index';

type Props = {
    options: VideoJsPlayerOptions;
    onReady: Function;
}

export const VideoJS = (props: Props) => {
    const videoRef = useRef<HTMLDivElement | null>(null);
    const playerRef = useRef<Player | null>(null);
    const {options, onReady} = props;

    useEffect(() => {

        if (!playerRef.current) {
            const videoElement = document.createElement("video-js");
            videoElement.classList.add('vjs-big-play-centered');

            if (!videoRef.current) {
                return
            }
            videoRef.current.appendChild(videoElement);

            const player = playerRef.current = videojs(videoElement, options, () => {
                videojs.log('player is ready');
                onReady && onReady(player);
            });
        } else {
            const player = playerRef.current;
            player.autoplay(options.autoplay);
            player.src(options.sources);
        }
    }, [options, videoRef]);

    useEffect(() => {
        const player = playerRef.current;
        return () => {
            if (player && !player.isDisposed()) {
                player.dispose();
                playerRef.current = null;
            }
        };
    }, [playerRef]);

    return (
        <div data-vjs-player>
            <div ref={videoRef}/>
        </div>
    );
}

export default VideoJS;