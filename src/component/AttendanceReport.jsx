import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import axios from "axios";
import CustomQrScanner from "./QrModal";

const AttendanceReport = ({ scannedStudents }) => {
  const [allData, setAllData] = useState([]);
  const [isOpenScanner, setIsOpenScanner] = useState(false);
  const [studentData, setStudentData] = useState([]);
  const [attendanceRecord, setAttendanceRecord] = useState({});
  const [currentDay, setCurrentDay] = useState(1);

  const gettingStudents = async () => {
    try {
      const response = await axios.get("http://localhost:3000/students");
      setStudentData(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    gettingStudents();
  }, []);

  useEffect(() => {
    if (scannedStudents.length > 0) {
      setAttendanceRecord((prevRecord) => {
        const newRecord = { ...prevRecord };
        scannedStudents.forEach((rollNo) => {
          if (!newRecord[rollNo]) {
            newRecord[rollNo] = {};
          }
          newRecord[rollNo][currentDay] = true;
        });
        return newRecord;
      });
    }
  }, [scannedStudents, currentDay]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Attendance Portal</h1>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search here..."
            className="px-2 py-1 rounded mr-2"
          />
          <div className="flex items-center">
            <img
              src="https://via.placeholder.com/30"
              alt="Admin"
              className="rounded-full"
            />
            <span className="ml-2">Admin</span>
          </div>
        </div>
      </header>
      <div className="flex flex-1 flex-col md:flex-row">
        <main className="flex-1 p-6">
          {isOpenScanner && <CustomQrScanner />}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Attendance</h2>
            <div className="flex flex-wrap mb-4">
              <button
                onClick={() => setIsOpenScanner(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Attendance start
              </button>
              <select className="border p-2 mr-2 mb-2 rounded">
                <option>Select Campus</option>
                {allData?.length > 0 &&
                  allData
                    ?.filter((filItem) => filItem == "campuses")
                    ?.map((item) => (
                      <option key={item?._id}>{item?.name}</option>
                    ))}
              </select>
              <select className="border p-2 mr-2 mb-2 rounded">
                <option>Select Course</option>
                {allData?.length > 0 &&
                  allData
                    ?.filter((filItem) => filItem == "course")
                    ?.map((item) => (
                      <option key={item?._id}>{item?.name}</option>
                    ))}
              </select>
              <select className="border p-2 mr-2 mb-2 rounded">
                <option>Select Batch</option>
                {allData?.length > 0 &&
                  allData
                    ?.filter((filItem) => filItem == "batches")
                    ?.map((item) => (
                      <option key={item?._id}>{item?.name}</option>
                    ))}
              </select>
              <select className="border p-2 mr-2 mb-2 rounded">
                <option>Instructor Name</option>
                {allData?.length > 0 &&
                  allData
                    ?.filter((filItem) => filItem == "teachers")
                    ?.map((item) => (
                      <option key={item?._id}>{item?.name}</option>
                    ))}
              </select>
              <button className="bg-blue-600 text-white px-4 py-2 rounded">
                Search
              </button>
              <div>
                <label htmlFor="currentDay" className="mr-2">
                  Day:
                </label>
                <select
                  id="currentDay"
                  value={currentDay}
                  onChange={(e) => setCurrentDay(Number(e.target.value))}
                  className="border p-2 mr-2 mb-2 rounded"
                >
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="overflow-auto h-[55vh]">
              <table className="table-auto w-full">
                <thead className="sticky top-0 bg-white">
                  <tr>
                    <th className="border px-4 py-2">Students</th>
                    {Array.from({ length: 12 }, (_, i) => (
                      <th key={i} className="border px-4 py-2">
                        {i + 1}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {studentData?.map((student, idx) => (
                    <tr key={idx}>
                      <td className="border bg-white px-4 py-2 flex items-center">
                        <p className="w-max">{`${student.name} ${student.roll_no}`}</p>
                      </td>
                      {Array.from({ length: 12 }, (_, dayIdx) => (
                        <td
                          key={dayIdx}
                          className="border px-4 py-2 text-center"
                        >
                          {attendanceRecord[student.roll_no] &&
                          attendanceRecord[student.roll_no][dayIdx + 1] ? (
                            <FaCheckCircle className="text-green-500" />
                          ) : null}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AttendanceReport;
