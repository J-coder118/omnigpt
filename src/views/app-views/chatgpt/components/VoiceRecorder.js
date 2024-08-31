import { useState, useEffect } from "react";
import micSrc from "assets/svg/microphone.svg";
import { Tooltip } from "antd";
import IntlMessage from "components/util-components/IntlMessage";
import useMediaRecorder from "@wmik/use-media-recorder";
import { amplitude } from "App";

const VoiceRecorder = ({ setMessage, setLoading }) => {
  const [recording, setRecording] = useState(false);
  const { clearMediaBlob, mediaBlob, stopRecording, startRecording } =
    useMediaRecorder({
      recordScreen: false,
      blobOptions: { type: "audio/wav" },
      mediaStreamConstraints: { audio: true, video: false }
    });

  useEffect(() => {
    const handleGetTranscription = async () => {
      const file = new File([mediaBlob], "audio.wav", {
        type: mediaBlob.type
      });

      const formData = new FormData();
      formData.append("model", "whisper-1");
      formData.append("file", file);
      amplitude.track("Voice Command");
      try {
        const transcript = await fetch(
          `${process.env.REACT_APP_SUPABASE_EDGE_FUNCTION_URL}/whisper-transcribe`,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_SUPABASE_ANON_KEY}`
            },
            method: "POST",
            body: formData
          }
        );

        const data = await transcript.json();
        setMessage((prev) => `${prev} ${data?.text}`);
        setLoading(false);
      } catch (error) {
        console.log("my error", error);
      }
    };
    if (mediaBlob) {
      handleGetTranscription();
      clearMediaBlob();
    }
  }, [mediaBlob, clearMediaBlob, setMessage, setLoading]);

  const handleStartRecording = () => {
    setRecording(true);
    startRecording();
  };
  const handleStopRecording = () => {
    setRecording(false);
    stopRecording();
    setLoading(true);
  };

  return (
    <Tooltip placement="topLeft" title={<IntlMessage id="audio.click.hold" />}>
      <button
        className="audio-recorder"
        onMouseDown={handleStartRecording}
        onMouseUp={handleStopRecording}
      >
        {recording && <div className="circle_ripple"></div>}
        <img src={micSrc} alt="record-voice" width="22px" height="22px" />
      </button>
    </Tooltip>
  );
};

export default VoiceRecorder;
