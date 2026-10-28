function EmployeeList({ employees, onEdit, onDelete }) {
return ( <div>
{employees.map((employee) => ( <div className="employee" key={employee.id}> <h3>{employee.name}</h3> <p>Department: {employee.department}</p> <p>Salary: ₹{employee.salary}</p>

      <button onClick={() => onEdit(employee)}>Edit</button>

      <button onClick={() => onDelete(employee.id)}>
        Delete
      </button>
    </div>
  ))}
</div>


);
}

export default EmployeeList;
