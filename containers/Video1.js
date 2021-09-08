import React,{useEffect} from "react"
import Twilio from "react-twilio"

const Video1 = () =>{

    const getPasscode = () => {
        const passcodeInput = document.getElementById('passcode') || {};
        const passcode = passcodeInput.value;
        passcodeInput.value = '';
      
        return passcode;
      };
      
      const trackSubscribed = (div, track) => {
        div.appendChild(track.attach());
      };
      
      const trackUnsubscribed = (track) => {
        track.detach().forEach((element) => element.remove());
      };
      
      // connect participant
      const participantConnected = (participant) => {
        console.log(`Participant ${participant.identity} connected'`);
      
        const div = document.createElement('div'); // create div for new participant
        div.id = participant.sid;
      
        participant.on('trackSubscribed', (track) => trackSubscribed(div, track));
        participant.on('trackUnsubscribed', trackUnsubscribed);
      
        participant.tracks.forEach((publication) => {
          if (publication.isSubscribed) {
            trackSubscribed(div, publication.track);
          }
        });
        document.body.appendChild(div);
      };
      
      const participantDisconnected = (participant) => {
        console.log(`Participant ${participant.identity} disconnected.`);
        document.getElementById(participant.sid).remove();
      };
      
      useEffect(() => {
        const ROOM_NAME = 'demo';
        const { Video } = Twilio;
        let videoRoom;
        let localStream;
        const video = document.getElementById('video');
      
        // preview screen
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then((vid) => {
            video.srcObject = vid;
            localStream = vid;
          });
      
        // buttons
        const joinRoomButton = document.getElementById('button-join');
        const leaveRoomButton = document.getElementById('button-leave');
        joinRoomButton.onclick = () => {
          // get access token
          // https://staging-api.seniorconnex.com/twilio/getTwilioToken?id=60f9ba66668a58192f8348f1&roomName=Demo Room&shouldInitiateCall=1
          
          
          
          // fetch("https://staging-api.seniorconnex.com/twilio/getTwilioToken?id=61121a41f523692c4ad9dae1&roomName=Demo Room&shouldInitiateCall=1", {
          //                     method: "GET",
          //                     headers: {
          //                         'Content-Type': "application/json",
          //                         "Authorization-Token": localStorage.getItem("token")
          //                     },
          //                 }).then(response => {
          //                     if (response.status === 200) {
          //                         response.json().then(res => {
          //                             localStorage.setItem("twilio-token", JSON.stringify(res.result.token));
          //                             console.log(res)
          //                             // console.log(JSON.stringify(res.result.token));
                                      
          //                             return JSON.stringify(res.result.token);
          //                         }).then((token) => {
          //                           console.log(token);
          //                           // connect to room
          //                           return Video.connect(token, { name: "Demo Room" });
          //                         })
          //                         .then((room) => {
          //                           console.log(`Connected to Room ${room.name}`);
          //                           videoRoom = room;
                            
          //                           room.participants.forEach(participantConnected);
          //                           room.on('participantConnected', participantConnected);
                            
          //                           room.on('participantDisconnected', participantDisconnected);
          //                           room.once('disconnected', (error) =>
          //                             room.participants.forEach(participantDisconnected)
          //                           );
          //                           joinRoomButton.disabled = true;
          //                           leaveRoomButton.disabled = false;
          //                         });
                                  
          //                     }
          //                 }).catch(err => console.error(err));
          //                 }
      
      
      
          fetch(`video-token?passcode=${getPasscode()}`)
            .then((resp) => {
              if (resp.ok) {
                return resp.json();
              }
              console.error(resp);
              if (resp.status === 401) {
                throw new Error('Invalid passcode');
              } else {
                throw new Error('Unexpected error. Open dev tools for logs');
              }
            })
            .then((body) => {
              const { token } = body;
              console.log(token);
              // connect to room
              return Video.connect(token, { name: ROOM_NAME });
            })
            .then((room) => {
              console.log(`Connected to Room ${room.name}`);
              videoRoom = room;
      
              room.participants.forEach(participantConnected);
              room.on('participantConnected', participantConnected);
      
              room.on('participantDisconnected', participantDisconnected);
              room.once('disconnected', (error) =>
                room.participants.forEach(participantDisconnected)
              );
              joinRoomButton.disabled = true;
              leaveRoomButton.disabled = false;
            })
            .catch((err) => {
              // eslint-disable-next-line no-alert
              alert(err.message);
            }); 
        };
        // leave room
        leaveRoomButton.onclick = () => {
          videoRoom.disconnect();
          console.log(`Disconnected from Room ${videoRoom.name}`);
          joinRoomButton.disabled = false;
          leaveRoomButton.disabled = true;
        };
      },[]);
  return(
    <div id="room-controls">
    <video id="video" autoplay="autoplay" muted="true" width="320" height="240"></video>
    <div>
      <label for="passcode">Passcode</label>
      <input id="passcode" type="password" required="required" autocomplete="off"/>
      <button id="button-join">Join Room</button>
      <button id="button-leave" disabled="disabled">Leave Room</button>
    </div>
  </div>
  )    
}
export default Video1;




