import { useEffect, useState } from "react";

import type { Student, StudentFormData } from "./types/student";

import {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} from "./services/studentService";

import StudentTable from "./components/StudentTable";
import StudentForm from "./components/StudentForm";
import ConfirmDialog from "./components/ConfirmDialog";

function App() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [selectedStudent, setSelectedStudent] =
    useState<Student | null>(null);

  const [studentToDelete, setStudentToDelete] =
    useState<Student | null>(null);

  // GET students
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getStudents();
        setStudents(data);
      } catch {
        setError("Unable to load students");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ADD and UPDATE
  const handleSubmit = async (data: StudentFormData) => {
    setSaving(true);
    setError("");

    try {
      if (selectedStudent) {
        await updateStudent(selectedStudent.id, data);

        setStudents((prev) =>
          prev.map((student) =>
            student.id === selectedStudent.id
              ? { ...student, ...data }
              : student
          )
        );
      } else {
        await addStudent(data);

        const newStudent: Student = {
          id: Date.now(),
          ...data,
        };

        setStudents((prev) => [...prev, newStudent]);
      }

      setShowForm(false);
      setSelectedStudent(null);
    } catch {
      setError("Unable to save student details");
    } finally {
      setSaving(false);
    }
  };

  // DELETE
  const handleDelete = async () => {
    if (!studentToDelete) return;

    setSaving(true);
    setError("");

    try {
      await deleteStudent(studentToDelete.id);

      setStudents((prev) =>
        prev.filter(
          (student) => student.id !== studentToDelete.id
        )
      );

      setStudentToDelete(null);
    } catch {
      setError("Unable to delete student");
    } finally {
      setSaving(false);
    }
  };

  // EDIT
  const handleEdit = (student: Student) => {
    setSelectedStudent(student);
    setShowForm(true);
  };

  return (
    <div className="container">

      <h1>Student Management Dashboard</h1>

      <button
        onClick={() => {
          setSelectedStudent(null);
          setShowForm(true);
        }}
      >
        + Add Student
      </button>

      {error && <p className="error">{error}</p>}

      {loading ? (
        <h3>Loading students...</h3>
      ) : students.length === 0 ? (
        <p>No students found</p>
      ) : (
        <StudentTable
          students={students}
          onEdit={handleEdit}
          onDelete={setStudentToDelete}
        />
      )}

      {showForm && (
        <StudentForm
          key={selectedStudent?.id ?? "new"}
          selectedStudent={selectedStudent}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setSelectedStudent(null);
          }}
        />
      )}

      {studentToDelete && (
        <ConfirmDialog
          studentName={studentToDelete.name}
          onConfirm={handleDelete}
          onCancel={() => setStudentToDelete(null)}
        />
      )}

      {saving && <p>Saving...</p>}

    </div>
  );
}

export default App;