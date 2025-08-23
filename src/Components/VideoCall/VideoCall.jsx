import React, { useRef, useEffect, useState } from 'react';
import { connect } from 'twilio-video';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { sendEmailInvitationToAdmin, sendVideoCallEmail } from '../../utils/emailService';
import VideoCallRecording from './VideoCallRecording';

const VideoCall = ({ roomName, userName, isAdmin = false, showAdminInvite = false, isTeamInternal = false }) => {
    const [room, setRoom] = useState(null);
    const [isConnecting, setIsConnecting] = useState(false);
    const [error, setError] = useState(null);
    const [participants, setParticipants] = useState([]);
    const [adminLink, setAdminLink] = useState('');
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const videoRef = useRef();
    const localVideoRef = useRef();

    useEffect(() => {
        return () => {
            if (room) {
                room.disconnect();
            }
        };
    }, [room]);

    useEffect(() => {
        if (isAdmin && !room) {
            const urlParams = new URLSearchParams(window.location.search);
            const roomParam = urlParams.get('room');
            if (roomParam) {
                connectToRoom(roomParam);
            }
        }
    }, []);

    const sendEmail = async (e) => {
        e.preventDefault();

        if (!adminLink) {
            alert('Please connect to the room first to generate the admin link');
            return;
        }

        const email = prompt('Enter admin email address to send the invitation:');
        if (!email) return;

        try {
            const result = await sendEmailInvitationToAdmin({
                emailId: email,
                teamLink: adminLink
            });

            if (result.success) {
                alert('Invitation sent successfully!');
            } else {
                alert('Failed to send invitation. Please try again.');
            }
        } catch (error) {
            console.error('Error sending email:', error);
            alert('An error occurred while sending the invitation.');
        }
    }

    const connectToRoom = async (customRoomName = null) => {
        const targetRoomName = customRoomName || roomName;
        setError(null);
        setIsConnecting(true);

        // Create unique identity for each user
        const uniqueIdentity = `${userName}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        // Send video call email only for non-admin users
        if (!isAdmin) {
            try {
                const adminLink = `${window.location.origin}${window.location.pathname}?room=${encodeURIComponent(targetRoomName)}&admin=true`;
                await sendVideoCallEmail({
                    subject: `Video Call Invitation for ${targetRoomName}`,
                    message: `${userName} is joining the room: ${targetRoomName}`,
                    meetingTime: new Date().toLocaleString(),
                    meetingLink: adminLink
                });
                setAdminLink(adminLink);
            } catch (e) {
                console.error('Failed to send video call email:', e);
            }
        }

        try {
            console.log('Sending token request with data:', {
                identity: uniqueIdentity,
                room: targetRoomName,
                region: 'us1'
            });

            const res = await axios.post('https://meso-api-h6aphgemd9hzfwha.centralus-01.azurewebsites.net/token', {
                identity: uniqueIdentity,
                room: targetRoomName,
                region: 'us1'
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                timeout: 10000
            });

            console.log('Token response received:', res.data);

            if (!res.data?.token) {
                throw new Error('Token is missing in the response');
            }

            const token = res.data.token;

            const room = await connect(token, {
                name: targetRoomName,
                audio: true,
                video: { width: 640 },
                maxParticipants: 5, // Allow up to 5 participants
            });

            setRoom(room);
            setIsConnecting(false);

            // Show toast notification that session is being recorded
            toast.info('🔴 This session is being recorded', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            if (!isAdmin) {
                const link = `${window.location.origin}${window.location.pathname}?room=${encodeURIComponent(targetRoomName)}&admin=true`;
                setAdminLink(link);
                console.log("link", link)
            }

            // Wait a bit for the refs to be available
            setTimeout(() => {
                const localParticipant = room.localParticipant;
                
                // Handle local participant tracks
                localParticipant.tracks.forEach(publication => {
                    if (publication.track && localVideoRef.current) {
                        const mediaElement = publication.track.attach();
                        localVideoRef.current.appendChild(mediaElement);
                    }
                });

                const handleParticipantConnected = (participant) => {
                    console.log('Participant connected:', participant.identity);
                    setParticipants(prevParticipants => [...prevParticipants, participant]);

                    // Create video container for remote participant
                    if (videoRef.current) {
                        const { container, videoElement } = createParticipantVideo(participant, false);
                        videoRef.current.appendChild(container);
                        
                        // Attach tracks to the new video element
                        participant.tracks.forEach(publication => {
                            if (publication.track) {
                                const mediaElement = publication.track.attach();
                                videoElement.appendChild(mediaElement);
                            }
                        });
                    }

                    participant.on('trackSubscribed', track => {
                        console.log('Track subscribed:', track.kind, 'for participant:', participant.identity);
                        if (videoRef.current) {
                            const participantContainer = videoRef.current.querySelector(`[data-participant-id="${participant.identity}"]`);
                            if (participantContainer) {
                                const videoElement = participantContainer.querySelector('div');
                                if (videoElement) {
                                    const mediaElement = track.attach();
                                    videoElement.appendChild(mediaElement);
                                }
                            }
                        }
                    });

                    participant.on('trackUnsubscribed', track => {
                        console.log('Track unsubscribed:', track.kind, 'for participant:', participant.identity);
                        track.detach().forEach(element => element.remove());
                    });
                };

                room.participants.forEach(handleParticipantConnected);
                room.on('participantConnected', handleParticipantConnected);

                room.on('participantDisconnected', participant => {
                    console.log('Participant disconnected:', participant.identity);
                    setParticipants(prev => prev.filter(p => p !== participant));
                    
                    // Remove participant's video container
                    if (videoRef.current) {
                        const participantContainer = videoRef.current.querySelector(`[data-participant-id="${participant.identity}"]`);
                        if (participantContainer) {
                            participantContainer.remove();
                        }
                    }
                    
                    participant.tracks.forEach(publication => {
                        if (publication.track) {
                            publication.track.detach().forEach(element => element.remove());
                        }
                    });
                });

                room.on('disconnected', () => {
                    console.log('Room disconnected');
                    setRoom(null);
                    setParticipants([]);
                    if (room) {
                        room.participants.forEach(participant => {
                            participant.tracks.forEach(publication => {
                                if (publication.track) {
                                    publication.track.detach().forEach(element => element.remove());
                                }
                            });
                        });
                        room.localParticipant.tracks.forEach(publication => {
                            if (publication.track) {
                                publication.track.detach().forEach(element => element.remove());
                            }
                        });
                    }
                    if (videoRef.current) {
                        while (videoRef.current.firstChild) {
                            videoRef.current.removeChild(videoRef.current.firstChild);
                        }
                    }
                    if (localVideoRef.current) {
                        while (localVideoRef.current.firstChild) {
                            localVideoRef.current.removeChild(localVideoRef.current.firstChild);
                        }
                    }
                });
            }, 100);

        } catch (err) {
            console.error('Error connecting to room:', err);
            console.error('Error details:', {
                message: err.message,
                status: err.response?.status,
                statusText: err.response?.statusText,
                data: err.response?.data,
                headers: err.response?.headers
            });
            
            setError(err.message || 'Failed to connect to room');
            setIsConnecting(false);

            if (err.name === 'TwilioError') {
                switch (err.code) {
                    case 20101:
                        setError('Invalid token. Please try again.');
                        break;
                    case 20104:
                        setError('Token expired. Please refresh and try again.');
                        break;
                    case 20105:
                        setError('Room is full. Maximum 5 participants allowed.');
                        break;
                    default:
                        setError(`Video error: ${err.message}`);
                }
            } else if (err.response?.status === 400) {
                setError(`Bad Request: ${err.response.data?.error || err.message}`);
            } else if (err.response?.status === 500) {
                setError(`Server Error: ${err.response.data?.error || err.message}`);
            }
        }
    };

    const leaveRoom = () => {
        if (room) {
            room.disconnect();
        }
    };

    const toggleMute = () => {
        if (room) {
            const audioTrack = room.localParticipant.audioTracks.values().next().value;
            if (audioTrack) {
                if (isMuted) {
                    audioTrack.track.enable();
                } else {
                    audioTrack.track.disable();
                }
                setIsMuted(!isMuted);
            }
        }
    };

    const toggleVideo = () => {
        if (room) {
            const videoTrack = room.localParticipant.videoTracks.values().next().value;
            if (videoTrack) {
                if (isVideoOff) {
                    videoTrack.track.enable();
                } else {
                    videoTrack.track.disable();
                }
                setIsVideoOff(!isVideoOff);
            }
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(adminLink);
        alert('Link copied to clipboard!');
    };

    const getGridLayout = () => {
        const totalParticipants = participants.length + 1; 
        console.log('Total participants:', totalParticipants, 'Remote participants:', participants.length);
        
        if (totalParticipants === 1) return "grid-cols-1";
        if (totalParticipants === 2) return "grid-cols-2";
        if (totalParticipants === 3) return "grid-cols-3";
        if (totalParticipants === 4) return "grid-cols-2";
        if (totalParticipants === 5) return "grid-cols-3";
        return "grid-cols-3";
    };

    const createParticipantVideo = (participant, isLocal = false) => {
        const videoContainer = document.createElement('div');
        videoContainer.className = 'relative bg-gray-800 rounded-xl overflow-hidden min-h-[200px]';
        videoContainer.setAttribute('data-participant-id', participant.identity);
        
        const videoElement = document.createElement('div');
        videoElement.className = 'w-full h-full flex items-center justify-center';
        
        const nameLabel = document.createElement('div');
        nameLabel.className = 'absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded';
        nameLabel.textContent = isLocal ? 'You' : participant.identity.split('-')[0]; // Extract name from identity
        
        videoContainer.appendChild(videoElement);
        videoContainer.appendChild(nameLabel);
        
        return { container: videoContainer, videoElement };
    };

    return (
        <div className="h-full h-screen w-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex flex-col">
            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {!room ? (
                    // Join Screen
                    <div className="flex-1 flex items-center justify-center">
                        <div className="text-center">
                            <div className="mb-8">
                                <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                    </svg>
                                </div>
                                <h2 className="text-3xl font-bold text-white mb-2">Join Video Call</h2>
                                <p className="text-white/70">Click below to join the meeting</p>
                            </div>
                            <button
                                onClick={() => connectToRoom()}
                                disabled={isConnecting}
                                className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-400/50 ${
                                    isConnecting 
                                        ? 'bg-gray-600 text-gray-300 cursor-not-allowed' 
                                        : 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                                }`}
                            >
                                {isConnecting ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Connecting...
                                    </div>
                                ) : (
                                    `Join ${roomName}`
                                )}
                            </button>
                        </div>
                    </div>
                ) : (
                    // Video Call Interface
                    <>
                        {/* Video Grid */}
                        <div className="flex-1 p-4">
                            <div className={`grid ${getGridLayout()} gap-4 h-full`}>
                                {/* Local Video */}
                                <div className="relative bg-gray-800 rounded-xl overflow-hidden">
                                    <div
                                        ref={localVideoRef}
                                        className="w-full h-full min-h-[200px] flex items-center justify-center"
                                    />
                                    {isVideoOff && (
                                        <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                                            <div className="text-center">
                                                <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-2">
                                                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <p className="text-white/70 text-sm">{userName}</p>
                                            </div>
                                        </div>
                                    )}
                                    <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                                        You {isMuted && <span className="text-red-400">(Muted)</span>}
                                    </div>
                                </div>

                                {/* Remote Participants */}
                                <div
                                    ref={videoRef}
                                    className="contents"
                                />
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="bg-black/20 backdrop-blur-sm border-t border-white/10 p-4">
                            <div className="flex items-center justify-center gap-4">
                                {/* Mute Button */}
                                <button
                                    onClick={toggleMute}
                                    className={`p-4 rounded-full transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-white/20 ${
                                        isMuted 
                                            ? 'bg-red-500 hover:bg-red-600 text-white' 
                                            : 'bg-white/20 hover:bg-white/30 text-white'
                                    }`}
                                >
                                    {isMuted ? (
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 640 640">
                                            <path d="M73 39.1C63.6 29.7 48.4 29.7 39.1 39.1C29.8 48.5 29.7 63.7 39 73.1L567 601.1C576.4 610.5 591.6 610.5 600.9 601.1C610.2 591.7 610.3 576.5 600.9 567.2L456.7 422.8C490.9 388.2 512 340.6 512 288L512 248C512 234.7 501.3 224 488 224C474.7 224 464 234.7 464 248L464 288C464 327.3 448.3 362.9 422.7 388.9L388.8 355C405.6 337.7 416 314 416 288L416 160C416 107 373 64 320 64C267 64 224 107 224 160L224 190.2L73 39.2zM371.3 473.1L329.9 431.7C326.6 431.9 323.4 432 320.1 432C240.6 432 176.1 367.5 176.1 288L176.1 277.8L132.5 234.2C129.7 238.1 128.1 242.9 128.1 248L128.1 288C128.1 385.9 201.4 466.7 296.1 478.5L296.1 528L248.1 528C234.8 528 224.1 538.7 224.1 552C224.1 565.3 234.8 576 248.1 576L392.1 576C405.4 576 416.1 565.3 416.1 552C416.1 538.7 405.4 528 392.1 528L344.1 528L344.1 478.5C353.4 477.3 362.5 475.5 371.4 473.1z"/>
                                        </svg>
                                    ) : (
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </button>

                                {/* Video Toggle Button */}
                                <button
                                    onClick={toggleVideo}
                                    className={`p-4 rounded-full transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-white/20 ${
                                        isVideoOff 
                                            ? 'bg-red-500 hover:bg-red-600 text-white' 
                                            : 'bg-white/20 hover:bg-white/30 text-white'
                                    }`}
                                >
                                    {isVideoOff ? (
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 640 640">
                                            <path d="M73 39.1C63.6 29.7 48.4 29.7 39.1 39.1C29.8 48.5 29.7 63.7 39 73.1L567 601.1C576.4 610.5 591.6 610.5 600.9 601.1C610.2 591.7 610.3 576.5 600.9 567.2L447.9 414.2L447.9 192C447.9 156.7 419.2 128 383.9 128L161.8 128L73 39.1zM64 192L64 448C64 483.3 92.7 512 128 512L384 512C391.8 512 399.3 510.6 406.2 508L68 169.8C65.4 176.7 64 184.2 64 192zM496 400L569.5 458.8C573.7 462.2 578.9 464 584.3 464C597.4 464 608 453.4 608 440.3L608 199.7C608 186.6 597.4 176 584.3 176C578.9 176 573.7 177.8 569.5 181.2L496 240L496 400z"/>
                                        </svg>
                                    ) : (
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2 6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2H2zm4.5 5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                                        </svg>
                                    )}
                                </button>

                                {/* Leave Call Button */}
                                <button
                                    onClick={leaveRoom}
                                    className="p-4 bg-red-500 hover:bg-red-600 text-white rounded-full transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-red-400/50"
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 640 640">
                                        <path d="M224.2 89C216.3 70.1 195.7 60.1 176.1 65.4L170.6 66.9C106 84.5 50.8 147.1 66.9 223.3C104 398.3 241.7 536 416.7 573.1C493 589.3 555.5 534 573.1 469.4L574.6 463.9C580 444.2 569.9 423.6 551.1 415.8L453.8 375.3C437.3 368.4 418.2 373.2 406.8 387.1L368.2 434.3C297.9 399.4 241.3 341 208.8 269.3L253 233.3C266.9 222 271.6 202.9 264.8 186.3L224.2 89z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Admin Invite Section */}
            {showAdminInvite && adminLink && !isAdmin && (
                <div className="bg-green-900/20 backdrop-blur-sm border-t border-green-500/20 p-4">
                    <div className="max-w-4xl mx-auto">
                        <h4 className="font-bold text-green-400 text-lg mb-3">Invite Admin</h4>
                        <div className="flex flex-col sm:flex-row gap-3 mb-2">
                            <input
                                type="text"
                                value={adminLink}
                                readOnly
                                className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                            <button
                                onClick={copyToClipboard}
                                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-all duration-200"
                            >
                                Copy
                            </button>
                            <button
                                onClick={sendEmail}
                                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all duration-200"
                            >
                                Email Invite
                            </button>
                        </div>
                        <p className="text-green-300 text-sm">Send this link to your administrator to join the call</p>
                    </div>
                </div>
            )}

            {/* Error Display */}
            {error && (
                <div className="bg-red-900/20 backdrop-blur-sm border-t border-red-500/20 p-4">
                    <div className="max-w-4xl mx-auto flex items-center justify-between">
                        <span className="text-red-300"><strong>Error:</strong> {error}</span>
                        <button
                            onClick={() => setError(null)}
                            className="text-red-400 underline hover:text-red-300 text-sm focus:outline-none"
                        >
                            Dismiss
                        </button>
                    </div>
                </div>
            )}

            {/* Video Call Recording Component */}
            {isTeamInternal && (
                <VideoCallRecording 
                    isTeamInternal={isTeamInternal}
                    roomName={roomName}
                    userName={userName}
                />
            )}

            {/* Toast Container */}
            <ToastContainer position="top-right" />
        </div>
    );
};

export default VideoCall;