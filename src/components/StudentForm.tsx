import { useState } from "react";
import type { Student, StudentFormData } from "../types/student";

type Props = {
  selectedStudent: Student | null;
  onSubmit: (data: StudentFormData) => void;
  onCancel: () => void;
};

function StudentForm({ selectedStudent, onSubmit, onCancel }: Props) {

  const [formData, setFormData] = useState<StudentFormData>({
    name: selectedStudent?.name || "",
    email: selectedStudent?.email || "",
    course: selectedStudent?.course || "",
    status: selectedStudent?.status || "Active",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() ||
        !formData.email.trim() ||
        !formData.course.trim()) {
      alert("Please fill all fields");
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{selectedStudent ? "Edit Student" : "Add Student"}</h2>

      <input
        name="name"
        placeholder="Student Name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <input
        name="course"
        placeholder="Course"
        value={formData.course}
        onChange={handleChange}
        required
      />

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
      >
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>

      <button type="submit">
        {selectedStudent ? "Update" : "Add Student"}
      </button>

      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
}

export default StudentForm;