import React, { useState } from "react";
import Scanner from "react-webcam-qr-scanner";
import Box from "@material-ui/core/Box";

const MyScanner = ({ SetLine }) => {

  const handleDecode = (result) => {
    if (result.data.length > 1){
      SetLine(result.data);
    } 
  };

  const handleScannerLoad = (mode) => {
    //console.log(mode);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
      <Scanner
        className="some-classname"
        onDecode={handleDecode}
        onScannerLoad={handleScannerLoad}
        constraints={{
          audio: false,
          video: {
            facingMode: "environment",
          },
        }}
        captureSize={{ width: 1280, height: 720 }}
      />
    </Box>
  );
};

export default MyScanner;
