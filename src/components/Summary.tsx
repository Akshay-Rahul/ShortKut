import { useState } from "react";
import "./Summary.css"; // Import the CSS file

function Summary({ isTrans, transcript, videoUrl }: { isTrans: boolean; transcript: string; videoUrl: string }) {
  const [notfi, setNotfi] = useState<boolean>(false);

  const textToCopy = transcript;
  const copyToClipboard = () => {
    setNotfi(true);
    setTimeout(() => {
      setNotfi(false);
    }, 3000);
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        console.log('Text copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };

  // Function to clean the transcript by removing ** characters
  const cleanTranscript = (text: string) => {
    return text.replace(/\*\*/g, ''); // Remove ** characters
  };

  // Clean the transcript for display
  const cleanedTranscript = cleanTranscript(transcript);

  return (
    <>
      {notfi ? (
        <div
          id="toast-top-right"
          className="fixed flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow top-5 right-5 dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800"
          role="alert"
        >
          <div className="text-sm text-green-500 font-bold">Text copied</div>
        </div>
      ) : null}

      {isTrans ? (
        <div className="summary-container">
          <button className="copy-button" onClick={copyToClipboard}>
            Copy the Summary <i className="fa fa-copy"></i>
          </button>
          <h1 className="summary-header">Video Summary</h1>
          {/* YouTube Video Embed */}
          {videoUrl && (
            <div className="video-container">
              <iframe
                src={`https://www.youtube.com/embed/${videoUrl.split('v=')[1]}`}
                frameBorder="0"
                allowFullScreen
                title="YouTube Video"
              ></iframe>
            </div>
          )}
          {/* Assuming cleaned transcript is formatted with timestamps */}
          {cleanedTranscript.split("\n").map((line, index) => {
            const isTimestamp = /^\[\d{2}:\d{2}\]/.test(line); // Simple regex to check for timestamp format
            return (
              <div key={index}>
                {isTimestamp ? (
                  <span className="timestamp"><strong>{line}</strong></span> // Use <strong> for bold
                ) : (
                  <p className="paragraph">{line}</p>
                )}
              </div>
            );
          })}
        </div>
      ) : null}
    </>
  );
}

export default Summary;
