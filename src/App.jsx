import { useState } from "react";
import "./App.css";
import AttendanceReport from "./component/AttendanceReport.jsx";
import QRScanner from "./component/QrModal.jsx";

function App() {
  const [students, setStudents] = useState([]);

  const handleScannedStudents = (scannedStudents) => {
    setStudents(scannedStudents);
  };

  return (
    <>
      <div className="bg-red-50">
        <QRScanner onScannedStudentsChange={handleScannedStudents} />
        <AttendanceReport scannedStudents={students} />
      </div>
    </>
  );
}

export default App;
