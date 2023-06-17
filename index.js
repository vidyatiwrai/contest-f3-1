let employees = [];
    
// Get form elements
const form = document.getElementById('employeeForm');
const nameInput = document.getElementById('name');
const professionInput = document.getElementById('profession');
const ageInput = document.getElementById('age');
const addedEmployeesDiv = document.getElementById('addedEmployees');

// Add event listener to the form submission
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  // Check if the required fields are filled
  if (nameInput.value.trim() === '' || professionInput.value.trim() === '' || ageInput.value.trim() === '') {
    showMessage('Please Make sure All the fields are filled before adding in an employee!', 'error');
    const employeeDiv = document.createElement('div');
    employeeDiv.textContent = 'You have 0 Employees';
    addedEmployeesDiv.appendChild(employeeDiv);
   
  } else {
    // Create a new employee object
    const employee = {
      id: employees.length + 1,
      name: nameInput.value.trim(),
      profession: professionInput.value.trim(),
      age: parseInt(ageInput.value.trim())
    };

    // Add the employee to the array
    employees.push(employee);

    // Display success message and update the employee list
    showMessage('Employee added successfully', 'success');
    updateEmployeeList();

    // Reset form inputs
    nameInput.value = '';
    professionInput.value = '';
    ageInput.value = '';
  }
});

// Function to display a message with a given class
function showMessage(message, className) {
  const messageDiv = document.createElement('div');
  messageDiv.textContent = message;
  messageDiv.classList.add(className);
  document.body.insertBefore(messageDiv, form.nextSibling);

  // Remove the message after 3 seconds
  setTimeout(function() {
    messageDiv.remove();
  }, 3000);
}

// Function to update the employee list
function updateEmployeeList() {
  addedEmployeesDiv.innerHTML = '';


  if (employees.length === 0) {
    const employeeDiv = document.createElement('div');
    employeeDiv.textContent = 'You have 0 Employees';
    addedEmployeesDiv.appendChild(employeeDiv);
  } else {

  employees.forEach(function(employee,index) {
    const employeeDiv = document.createElement('div');
    employeeDiv.className = "showEmployee";
    employeeDiv.innerHTML = `
      <span  class="employee-details">${index + 1}.${"Name: "+employee.name} ${"Profession: "+employee.profession} ${"Age :"+employee.age}</span>
      <button class="delete" data-id="${employee.id}">Delete User</button> 
    `;
    addedEmployeesDiv.appendChild(employeeDiv);
  });
}

  // Add event listeners to deete buttons
  const deleteButtons = document.getElementsByClassName('delete');
  Array.from(deleteButtons).forEach(function(button) {
    button.addEventListener('click', function() {
      const id = parseInt(button.getAttribute('data-id'));
      deleteEmployee(id);
    });
  });
}

// Function to delete an employee by ID
function deleteEmployee(id) {
  employees = employees.filter(function(employee) {
    return employee.id !== id;
  });

  updateEmployeeList();
}