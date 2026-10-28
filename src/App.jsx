import { useEffect, useState } from "react";
import EmployeeList from "./components/EmployeeList";
import "./App.css";

function App() {
const [employees, setEmployees] = useState([]);
const [name, setName] = useState("");
const [department, setDepartment] = useState("");
const [salary, setSalary] = useState("");
const [editId, setEditId] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
fetch("https://jsonplaceholder.typicode.com/users")
.then((response) => {
if (!response.ok) throw new Error("Failed to fetch employees");
return response.json();
})
.then((data) => {
setEmployees(
data.slice(0, 5).map((employee) => ({
id: employee.id,
name: employee.name,
department: employee.company.name,
salary: 30000,
}))
);
})
.catch((error) => console.log(error))
.finally(() => setLoading(false));
}, []);

function handleSubmit(e) {
e.preventDefault();


if (editId !== null) {
  setEmployees(
    employees.map((employee) =>
      employee.id === editId
        ? { ...employee, name, department, salary }
        : employee
    )
  );
  setEditId(null);
} else {
  const newEmployee = {
    id: Date.now(),
    name,
    department,
    salary,
  };

  setEmployees([...employees, newEmployee]);
}

setName("");
setDepartment("");
setSalary("");


}

function editEmployee(employee) {
setEditId(employee.id);
setName(employee.name);
setDepartment(employee.department);
setSalary(employee.salary);
}

function deleteEmployee(id) {
setEmployees(employees.filter((employee) => employee.id !== id));
}

return ( <div className="container"> <h1>Employee Management System</h1>

  <form onSubmit={handleSubmit}>
    <input
      type="text"
      placeholder="Employee Name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      required
    />

    <input
      type="text"
      placeholder="Department"
      value={department}
      onChange={(e) => setDepartment(e.target.value)}
      required
    />

    <input
      type="number"
      placeholder="Salary"
      value={salary}
      onChange={(e) => setSalary(e.target.value)}
      min="0"
      required
    />

    <button type="submit">
      {editId !== null ? "Update Employee" : "Add Employee"}
    </button>
  </form>

  <h2>Employee List</h2>

  {loading ? (
    <p>Loading employees...</p>
  ) : employees.length === 0 ? (
    <p>No employees available.</p>
  ) : (
    <EmployeeList
      employees={employees}
      onEdit={editEmployee}
      onDelete={deleteEmployee}
    />
  )}
</div>


);
}

export default App;
