import React, { useState } from "react";
import "./styles.css";

const Attendance = () => {
    // Declare state variables
  const [students, setStudents] = useState([]);
  const [numStudents, setNumStudents] = useState('');

  // Function to add a student to the attendance list
  const addStudent = (rollNumber, name) => {
    setStudents(
      students.concat({
        rollNumber,
        name,
        checkInTime: new Date().toLocaleString(),
      })
    );
    // to update the number of students present after checkIn
    setNumStudents(numStudents+1);
};

// Function to check a student out
const checkOut = (rollNumber) => {
    setStudents(
        students.map((student) => {
            if (student.rollNumber === rollNumber) {
                return { ...student, checkOutTime: new Date().toLocaleString() };
            }
            return student;
        })
        );
        // to update the number of students present after checkOut
        setNumStudents(numStudents-1);

  };

  return (
    <div>
        {/* Form to input student roll number and name */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addStudent(e.target.rollNumber.value, e.target.name.value);
          e.target.rollNumber.value = "";
          e.target.name.value = "";
        }}
      >
        <div className="container">
          <h1>Student Attendance</h1>
          <label>
            Roll Number
            <input type="number" name="rollNumber" required/>
          </label>
          <br />
          <label>
            Name
            <input type="text" name="name" required/>
          </label>
          <br />
          <button type="submit">Check In</button>
        </div>
      </form>
      {/* Display number of students present */}
      <p>There are currently {numStudents ? numStudents : 'No'} students in the school.</p>
       {/* Table to display list of students and their check in/out times */}
      <br />
      <table className="fl-table">
        <thead>
          <tr>
            <th>Roll Number</th>
            <th>Name</th>
            <th>Check In Time</th>
            <th>Check Out Time</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.rollNumber}>
              <td>{student.rollNumber}</td>
              <td>{student.name}</td>
              <td>{student.checkInTime.toString()}</td>
              <td>
                {student.checkOutTime ? (student.checkOutTime.toString()) : (
                  <button
                    key={student.rollNumber} onClick={() => checkOut(student.rollNumber)}>
                    Check Out
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>

            
      </table>
    </div>
  );
};

export default Attendance;
