# Video Call Recording Feature

## Overview
The Video Call Recording feature allows team internal users to record their screen during video calls. This feature is only available to users with `isTeamInternal={true}` prop.

## Features
- **Screen Recording**: Records both screen content and audio
- **Automatic Download**: Downloads the recording file automatically when recording stops
- **Timer Display**: Shows recording duration in real-time
- **Browser Compatibility**: Supports multiple video formats (WebM, MP4) for better compatibility
- **Error Handling**: Comprehensive error handling for permission and browser support issues

## Usage

### For Team Internal Users
```jsx
<VideoCall 
    roomName="test-room" 
    userName="Internal Team" 
    isAdmin={true} 
    isTeamInternal={true} 
/>
```

### For Regular Users
```jsx
<VideoCall 
    roomName="test-room" 
    userName="User1" 
/>
```

## Recording Process
1. **Start Recording**: Click the "Start Recording" button
2. **Select Screen**: Choose which screen/window to record
3. **Recording**: The recording timer will show the duration
4. **Stop Recording**: Click "Stop Recording" to end
5. **Download**: The video file will be automatically downloaded

## File Format
- **Default**: WebM format with VP9 codec
- **Fallback**: WebM with VP8 codec
- **Alternative**: MP4 format (if supported)
- **Filename**: `video-call-{roomName}-{userName}-{timestamp}.{extension}`

## Browser Requirements
- Modern browser with MediaRecorder API support
- Permission to access screen content
- Permission to access microphone (for audio recording)

## Error Handling
- **Permission Denied**: User-friendly message for screen sharing permission
- **Browser Not Supported**: Clear message for unsupported browsers
- **Recording Errors**: Automatic cleanup and retry options

## Security
- Only visible to team internal users (`isTeamInternal={true}`)
- Requires explicit user permission for screen sharing
- No recordings are stored on servers - only local download

## Components
- `VideoCallRecording.jsx`: Main recording component
- `VideoCall.jsx`: Updated to include recording functionality
- `VideoOne.jsx`: Example usage with team internal access 