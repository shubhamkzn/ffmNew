import React, { useState, useEffect } from 'react'
import VideoCall from './VideoCall'
 
function VideoOne() {
    const urlParams = new URLSearchParams(window.location.search);
    const isAdmin = urlParams.get('admin') === 'true';
    const roomParam = urlParams.get('room');
    const [roomName, setRoomName] = useState('');
    const [userName, setUserName] = useState('');
    const [showJoinForm, setShowJoinForm] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // If room is provided in URL, use it
        if (roomParam) {
            setRoomName(roomParam);
            setShowJoinForm(false);
        } else {
            // Generate a default room name
            const defaultRoomName = `meeting-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
            setRoomName(defaultRoomName);
        }

        // Set default user name based on admin status
        if (isAdmin) {
            setUserName('Internal Team');
        } else {
            setUserName(`User-${Math.random().toString(36).substr(2, 4)}`);
        }
    }, [roomParam, isAdmin]);

    const generateRoomName = () => {
        const adjectives = ['Innovative', 'Dynamic', 'Creative', 'Strategic', 'Agile', 'Future', 'Digital', 'Smart', 'Global', 'Elite'];
        const nouns = ['Meeting', 'Session', 'Conference', 'Workshop', 'Summit', 'Forum', 'Hub', 'Space', 'Zone', 'Center'];
        const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
        const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
        const timestamp = Date.now().toString().slice(-6);
        return `${randomAdjective}-${randomNoun}-${timestamp}`;
    };

    const createNewRoom = () => {
        setIsLoading(true);
        setTimeout(() => {
            const newRoomName = generateRoomName();
            setRoomName(newRoomName);
            setShowJoinForm(false);
            setIsLoading(false);
        }, 500);
    };

    const joinExistingRoom = () => {
        setShowJoinForm(true);
    };

    const handleJoinRoom = (e) => {
        e.preventDefault();
        if (roomName.trim() && userName.trim()) {
            setShowJoinForm(false);
        }
    };

    const copyRoomLink = () => {
        const roomLink = `${window.location.origin}${window.location.pathname}?room=${encodeURIComponent(roomName)}`;
        navigator.clipboard.writeText(roomLink);
        alert('Room link copied to clipboard!');
    };

    if (showJoinForm) {
        return (
            <div className="h-screen w-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
                <div className="max-w-md w-full">
                    <div className="text-center mb-8">
                        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">Join Video Call</h1>
                        <p className="text-white/70">Enter room details to join the meeting</p>
                    </div>

                    <form onSubmit={handleJoinRoom} className="space-y-6">
                        <div>
                            <label className="block text-white/80 text-sm font-medium mb-2">Room Name</label>
                            <input
                                type="text"
                                value={roomName}
                                onChange={(e) => setRoomName(e.target.value)}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                                placeholder="Enter room name"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-white/80 text-sm font-medium mb-2">Your Name</label>
                            <input
                                type="text"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                                placeholder="Enter your name"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            Join Room
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <button
                            onClick={createNewRoom}
                            disabled={isLoading}
                            className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors duration-200"
                        >
                            {isLoading ? 'Creating...' : 'Create New Room'}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full w-full">
            {/* Room Header */}
            <div className="bg-black/90 backdrop-blur-sm border-b border-white/10 p-4">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-white/70 text-sm">Room Active</span>
                        </div>
                        <div>
                            <h2 className="text-white font-semibold">{roomName}</h2>
                            <p className="text-white/60 text-sm">Share this link with others to join</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={copyRoomLink}
                            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                            </svg>
                            Copy Link
                        </button>
                        <button
                            onClick={joinExistingRoom}
                            className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg text-sm font-medium transition-all duration-200"
                        >
                            Join Different Room
                        </button>
                    </div>
                </div>
            </div>

            {/* Video Call Component */}
            <VideoCall 
                roomName={roomName} 
                userName={userName} 
                isAdmin={isAdmin} 
                isTeamInternal={isAdmin}
                showAdminInvite={!isAdmin}
            />
        </div>
    );
}

export default VideoOne
