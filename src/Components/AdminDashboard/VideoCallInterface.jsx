import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Video, VideoOff, Volume2, PhoneOff } from 'lucide-react';
import MentorChatPalenHeader from './MentorChatPalenHeader';

const VideoCallInterface = () => {
    const videoRef = useRef(null);
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOn, setIsVideoOn] = useState(true);
    const [isCallActive, setIsCallActive] = useState(true);
    const [stream, setStream] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Initialize camera when component mounts
    useEffect(() => {
        startCamera();
        return () => {
            // Cleanup: stop all tracks when component unmounts
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    const startCamera = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            });

            setStream(mediaStream);

            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
            }

            setIsLoading(false);
        } catch (err) {
            console.error('Error accessing camera:', err);
            setError('Unable to access camera. Please check permissions.');
            setIsLoading(false);
        }
    };

    const toggleMute = () => {
        if (stream) {
            const audioTracks = stream.getAudioTracks();
            audioTracks.forEach(track => {
                track.enabled = isMuted; // Toggle audio track
            });
            setIsMuted(!isMuted);
        }
    };

    const toggleVideo = () => {
        if (stream) {
            const videoTracks = stream.getVideoTracks();
            videoTracks.forEach(track => {
                track.enabled = !isVideoOn; // Toggle video track
            });
            setIsVideoOn(!isVideoOn);
        }
    };

    const endCall = () => {
        // Stop all media tracks
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
        setIsCallActive(false);
        console.log('Call ended');
    };

    const handleVolumeSettings = () => {
        console.log('Volume settings clicked');
        // You can implement volume control modal here
    };

    const restartCall = async () => {
        setIsCallActive(true);
        await startCamera();
    };

    if (!isCallActive) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-white mb-4">Call Ended</h2>
                    <button
                        className="btn btn-primary"
                        onClick={restartCall}
                    >
                        Start New Call
                    </button>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="loading loading-spinner loading-lg text-white mb-4"></div>
                    <p className="text-white">Starting camera...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="alert alert-error max-w-md">
                        <span>{error}</span>
                    </div>
                    <button
                        className="btn btn-primary mt-4"
                        onClick={startCamera}
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen relative">

            <div className='my-3 bg-white rounded-2xl shadow-md'>
                <MentorChatPalenHeader></MentorChatPalenHeader>
            </div>


            {/* Main Video Feed */}
            <div className="w-full h-[calc(100vh-300px)] relative overflow-hidden rounded-2xl">
                {/* Live Camera Feed */}
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted // Mute own video to prevent feedback
                    className="w-full h-full object-cover transform scale-x-[-1]" // Mirror effect
                    style={{ display: isVideoOn ? 'block' : 'none' }}
                />

                {/* Video Off Placeholder */}
                {!isVideoOn && (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                        <div className="text-center">
                            <div className="w-24 h-24 bg-gray-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                                <VideoOff size={40} className="text-gray-400" />
                            </div>
                            <p className="text-white text-lg">Camera is off</p>
                        </div>
                    </div>
                )}

                {/* Video Controls Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-6">
                    <div className="flex items-center justify-center gap-4">
                        {/* Microphone Control */}
                        <button
                            onClick={toggleMute}
                            className={`btn btn-circle btn-lg ${isMuted
                                ? 'bg-red-600 hover:bg-red-700 border-red-600'
                                : 'bg-gray-700 hover:bg-gray-600 border-gray-700'
                                }`}
                            title={isMuted ? 'Unmute' : 'Mute'}
                        >
                            {isMuted ? (
                                <MicOff size={24} className="text-white" />
                            ) : (
                                <Mic size={24} className="text-white" />
                            )}
                        </button>

                        {/* Video Control */}
                        <button
                            onClick={toggleVideo}
                            className={`btn btn-circle btn-lg ${!isVideoOn
                                ? 'bg-red-600 hover:bg-red-700 border-red-600'
                                : 'bg-gray-700 hover:bg-gray-600 border-gray-700'
                                }`}
                            title={isVideoOn ? 'Turn off camera' : 'Turn on camera'}
                        >
                            {isVideoOn ? (
                                <Video size={24} className="text-white" />
                            ) : (
                                <VideoOff size={24} className="text-white" />
                            )}
                        </button>

                        {/* Volume/Audio Settings */}
                        <button
                            onClick={handleVolumeSettings}
                            className="btn btn-circle btn-lg bg-gray-700 hover:bg-gray-600 border-gray-700"
                            title="Audio settings"
                        >
                            <Volume2 size={24} className="text-white" />
                        </button>

                        {/* End Call */}
                        <button
                            onClick={endCall}
                            className="btn btn-circle btn-lg bg-red-600 hover:bg-red-700 border-red-600 ml-4"
                            title="End call"
                        >
                            <PhoneOff size={24} className="text-white" />
                        </button>
                    </div>
                </div>

                {/* Call Status Indicator */}
                <div className="absolute top-4 left-4">
                    <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-white text-sm font-medium">
                            {isVideoOn ? 'Camera On' : 'Camera Off'} • {isMuted ? 'Muted' : 'Unmuted'}
                        </span>
                    </div>
                </div>

                {/* Call Duration */}
                <div className="absolute top-4 right-4">
                    <div className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-2">
                        <span className="text-white text-sm font-medium">
                            <CallTimer />
                        </span>
                    </div>
                </div>

                {/* Muted Indicator */}
                {isMuted && (
                    <div className="absolute bottom-24 left-4">
                        <div className="flex items-center gap-2 bg-red-600 rounded-full px-3 py-2">
                            <MicOff size={16} className="text-white" />
                            <span className="text-white text-sm font-medium">You're muted</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// Call Timer Component
const CallTimer = () => {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(prev => prev + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatTime = (totalSeconds) => {
        const minutes = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return formatTime(seconds);
};

export default VideoCallInterface;