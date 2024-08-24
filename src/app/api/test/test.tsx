import VideoPlayer from "@/app/components/VideoJS";

export default function Video_() {


    return (
        <>
            <VideoPlayer
                sources={"http://localhost:8183/files/ec9b77be-7ca0-4da3-b986-7cd0d3d13f44/pKFQETvm1nE2JeV7wtZ3v.m3u8"}
                // onReady={}
                type="application/x-mpegurl"
                options={{autoplay: true, controls: true}}/>
        </>)

}