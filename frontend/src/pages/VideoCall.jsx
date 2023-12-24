import { useState, useEffect, useCallback, useRef } from "react";

import { getAPIUrl } from "../conf/conf";
import { VideoComponent } from "../components/Chat/Index";

function VideoCall() {
  const usernameInput = useRef(null);
  const [myStream, setMyStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [websocket, setWebsocket] = useState(null);
  const [mapPeer, setMapPeer] = useState({});

  const sendSignal = useCallback(
    (action, message) => {
      const jsonStr = JSON.stringify({
        "peer": usernameInput.current.value,
        "action": action,
        "message": message,
      });
      // console.log("inside sendSignal", jsonStr);
      websocket.send(jsonStr);
    },
    [websocket]
  );

  const createOfferer = useCallback(
    async (peerUsername, receiver_channel_name) => {
      console.log("createOfferer", myStream);
      let peer = new RTCPeerConnection(null);

      /* add each track from the `myStream` object to the `peer` connection.*/
      myStream.getTracks().forEach((track) => peer.addTrack(track, myStream));

      peer.ontrack = async (event) => {
        if (event.streams && event.streams[0]) {
          setRemoteStream(event.streams[0]);
        }
      };

      let dataChannel = peer.createDataChannel("channel");
      dataChannel.onopen = (event) => {
        console.log("dataChannel.onopen", event);
      };
      dataChannel.onmessage = (event) => {
        console.log("dataChannel.onmessage", event);
      };
      dataChannel.onclose = (event) => {
        console.log("dataChannel.onclose", event);
      };
      dataChannel.onerror = (event) => {
        console.log("dataChannel.onerror", event);
      };

      setMapPeer((prev) => {
        let newMapPeer = { ...prev };
        newMapPeer[peerUsername] = [peer, dataChannel];
        return newMapPeer;
      });

      peer.oniceconnectionstatechange = async () => {
        console.log("oniceconnectionstatechange in createOfferer");
        let iceConnectionState = peer.iceConnectionState;
        if (
          iceConnectionState == "failed" ||
          iceConnectionState == "disconnected" ||
          iceConnectionState == "closed"
        ) {
          // delete mapPeer[peerUsername];
          setMapPeer((prev) => {
            let newMapPeer = { ...prev };
            delete newMapPeer[peerUsername];
            return newMapPeer;
          });

          if (iceConnectionState != "closed") {
            peer.close();
          }
          setRemoteStream(null);
        }
      };

      peer.onicecandidate = async () => {
        if (peer.iceGatheringState === "complete") {
          console.log("send ice candidate");
          sendSignal("new-offer", {
            "sdp": peer.localDescription,
            "receiver_channel_name": receiver_channel_name,
          });
        }
      };
      peer
        .createOffer()
        .then((o) => peer.setLocalDescription(o))
        .then(() => {
          console.log("Local Description Set Successfully");
        });
    },
    [myStream, sendSignal, setRemoteStream]
  );

  const createAnswers = useCallback(
    async (offer, peerUsername, receiver_channel_name) => {
      console.log("createAnswers", offer);
      let peer = new RTCPeerConnection(null);
      myStream.getTracks().forEach((track) => peer.addTrack(track, myStream));

      peer.ontrack = async (event) => {
        if (event.streams && event.streams[0]) {
          setRemoteStream(event.streams[0]);
        }
      };

      let dataChannel = peer.createDataChannel("channel");
      dataChannel.onopen = (event) => {
        console.log("dataChannel.onopen in createAnswers", event);
      };
      dataChannel.onmessage = (event) => {
        console.log("dataChannel.onmessage in createAnswers", event);
      };
      dataChannel.onclose = (event) => {
        console.log("dataChannel.onclose in createAnswers", event);
      };
      dataChannel.onerror = (event) => {
        console.log("dataChannel.onerror in createAnswers", event);
      };

      setMapPeer((prev) => {
        let newMapPeer = { ...prev };
        newMapPeer[peerUsername] = [peer, dataChannel];
        return newMapPeer;
      });

      peer.oniceconnectionstatechange = async () => {
        console.log("oniceconnectionstatechange in createAnswers");
        let iceConnectionState = peer.iceConnectionState;
        if (
          iceConnectionState == "failed" ||
          iceConnectionState == "disconnected" ||
          iceConnectionState == "closed"
        ) {
          // delete mapPeer[peerUsername];
          setMapPeer((prev) => {
            let newMapPeer = { ...prev };
            delete newMapPeer[peerUsername];
            return newMapPeer;
          });

          if (iceConnectionState != "closed") {
            peer.close();
          }
          setRemoteStream(null);
        }
      };

      peer.onicecandidate = async () => {
        if (peer.iceGatheringState === "complete") {
          console.log("send ice candidate");
          sendSignal("new-answer", {
            "sdp": peer.localDescription,
            "receiver_channel_name": receiver_channel_name,
          });
        }
      };

      peer
        .setRemoteDescription(offer)
        .then(() => {
          console.log("Remote Description Set Sucessfully");
          return peer.createAnswer();
        })
        .then((a) => {
          console.log("Answer Created");
          peer.setLocalDescription(a);
        });
    },
    [myStream, sendSignal, setRemoteStream]
  );

  const websocketOnMessage = useCallback(
    (event) => {
      console.log("webSocketOnMessage");

      let data = JSON.parse(event.data);
      let peerUsername = data["peer"];
      let action = data["action"];
      console.log(usernameInput.current.value, peerUsername);
      if (usernameInput.current.value === peerUsername) return;
      let receiver_channel_name = data["message"]["receiver_channel_name"];

      switch (action) {
        case "new-peer": {
          console.log("Create " + action);
          createOfferer(peerUsername, receiver_channel_name);
          break;
        }
        case "new-offer": {
          let offer = data["message"]["sdp"];
          createAnswers(offer, peerUsername, receiver_channel_name);
          break;
        }
        case "new-answer": {
          console.log("Switch " + action);
          let answer = data["message"]["sdp"];
          let peer = mapPeer[peerUsername][0];
          peer.setRemoteDescription(answer);
          console.log("Switch " + action + " Done");
          break;
        }
        //   //   case "ice_candidate":
        //   //     handleNewICECandidateMsg(data);
        //   //     break;
        //   //   case "user_left":
        //   //     handleUserLeft(data);
        //   //     break;
        default: {
          console.log("Unknown message", data);
          break;
        }
      }
    },
    [createOfferer, mapPeer, createAnswers]
  );

  const handleJoin = useCallback(async () => {
    if (usernameInput.current.value === "") return;
    await navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        setMyStream(() => stream);
      })
      .catch(console.error);
    usernameInput.current.disabled = true;
    usernameInput.current.style.visibility = "hidden";

    let loc = window.location;
    let wsStart = loc.protocol === "https:" ? "wss://" : "ws://";
    let endpoint = getAPIUrl("callsSocket").replace(loc.protocol, wsStart);
    let socket = new WebSocket(endpoint);
    setWebsocket(socket);
  }, []);

  useEffect(() => {
    if (websocket) {
      websocket.onopen = () => {
        console.log("connected");
        sendSignal("new-peer", {});
      };
      websocket.onmessage = websocketOnMessage;
      websocket.onerror = (e) => {
        console.log("error", e);
      };
      websocket.onclose = (e) => {
        console.log("disconnected", e.code, e.reason);
      };
    }

    return () => {
      if (websocket) {
        // websocket.close();
        setWebsocket(null);
      }
    };
  }, [websocket, sendSignal, websocketOnMessage]);

  return (
    <div>
      <h3 id="label-username" className="text-white">
        Username
      </h3>
      <div className="flex items-center justify-center my-2">
        <input
          id="username"
          type="text"
          className="mr-2 p-1 border-2 border-black rounded-md"
          ref={usernameInput}
        />
        <button
          id="btn-join"
          className="p-1 bg-blue-500 text-white rounded-md"
          onClick={handleJoin}>
          Join Call
        </button>
      </div>

      {myStream && (
        <>
          <h1>My Stream</h1>
          <VideoComponent
            // playing={true}
            // muted={true}
            className=""
            height="100px"
            width="200px"
            stream={myStream}
          />
        </>
      )}
      {remoteStream && (
        <>
          <h1>Remote Stream</h1>
          <VideoComponent
            // playing={true}
            // muted={true}
            className=""
            height="100px"
            width="200px"
            stream={remoteStream}
          />
        </>
      )}
    </div>
  );
}

export default VideoCall;
