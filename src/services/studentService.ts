import type { Student, StudentFormData } from "../types/student";

const API = "https://jsonplaceholder.typicode.com/users";

// GET students
export const getStudents = async (): Promise<Student[]> => {
  const response = await fetch(API);

  if (!response.ok) {
    throw new Error("Failed to fetch students");
  }

  const data = await response.json();

  return data.map((user: any) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    course: "React",
    status: "Active",
  }));
};

// POST student
export const addStudent = async (student: StudentFormData) => {
  const response = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  });

  if (!response.ok) {
    throw new Error("Failed to add student");
  }

  return response.json();
};

// PUT student
export const updateStudent = async (
  id: number,
  student: StudentFormData
) => {
  const response = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  });

  if (!response.ok) {
    throw new Error("Failed to update student");
  }

  return response.json();
};

// DELETE student
export const deleteStudent = async (id: number) => {
  const response = await fetch(`${API}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete student");
  }

  return true;
};