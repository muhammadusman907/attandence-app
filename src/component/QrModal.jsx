// import React, { useState } from 'react';
// import QrScanner from 'react-qr-scanner';

// const CustomQrScanner = () => {
//   const [result, setResult] = useState('');
//    const students = [] ;
//   const handleScan = (data) => {
//     if (data) {
//       setResult(() => (data?.text));
//       students.push(data)
//     }
//   };

//   const handleError = (err) => {
//     console.error(err);
//   };
//   console.log(students);
//   const previewStyle = {
//     height: 240,
//     width: 320,
//   };
// console.log(result)
//   return (
//     <div>
//       <h1>Custom QR Code Scanner</h1>
//       <QrScanner

//        delay={200}
//         style={previewStyle}
//         onError={handleError}
//         onScan={handleScan}
//         facingMode="environment"
//       />
//       <p>Scanned Result: {result}</p>
//     </div>
//   );
// };

// export default CustomQrScanner;

// import React from "react";
// import QrScanner from "qr-scanner";
// import { useEffect, useRef, useState } from "react";

// const QRScanner = (props) => {
//   const videoElementRef = useRef(null);
//   const [scanned, setScannedText] = useState("");
//   const [students, setStudents] = useState();
//   useEffect(() => {
//     const video = videoElementRef.current;
//     const qrScanner = new QrScanner(
//       video,
//       (result) => {
//         console.log("decoded qr code:", result);
//         setStudents([result.data]);
//         console.log({students});
      
//         if (students?.length ) {
//           const isExist = students?.find(value === result.data);
//           console.log(isExist);
//           if (!isExist) {
//             setStudents([...students, result.data]);
//           } else {
//             alert("already exist");
//           }
//         } else {
//           setStudents([result.data]);
//         }
//       },
//       {
//         returnDetailedScanResult: true,
//         highlightScanRegion: true,
//         highlightCodeOutline: true,
//       }
//     );
//     qrScanner.start();
//     console.log("start");

//     return () => {
//       console.log(qrScanner);
//       qrScanner.stop();
//       qrScanner.destroy();
//     };
//   }, [students?.length]);

//   // const qrScanner = new QrScanner(videoElement, (result) =>
//   //   console.log('decoded qr code:', result)
//   // );
//  console.log( "students----> " ,students)
//   return (
//     <div>
//       <div className="videoWrapper">
//         <video className="qrVideo" ref={videoElementRef} />
//       </div>
//       <p className="scannedText">SCANNED: {scanned}</p>
//     </div>
//   );
// };

// export default QRScanner;

import React, { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";

const QRScanner = () => {
  const videoElementRef = useRef(null);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const video = videoElementRef.current;
    const qrScanner = new QrScanner(
      video,
      (result) => {
        console.log("decoded qr code:", result);

        // Check if the student already exists in the list
        const isExist = students.some((student) => student === result.data);
        if (!isExist) {
          setStudents((prevStudents) => [...prevStudents, result.data]);
        } else {
          alert("Already exists");
        }
      },
      {
        returnDetailedScanResult: true,
        highlightScanRegion: true,
        highlightCodeOutline: true,
      }
    );

    qrScanner.start();

    return () => {
      qrScanner.stop();
      qrScanner.destroy();
    };
  }, [students]);

  return (
    <div>
      <h1>Custom QR Code Scanner</h1>
      <div className="videoWrapper">
        <video className="qrVideo" ref={videoElementRef} />
      </div>
      <ul>
        {students.map((student, index) => (
          <li key={index}>{student}</li>
        ))}
      </ul>
    </div>
  );
};

export default QRScanner;
