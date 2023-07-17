// Obtener los elementos del DOM
const studentUL = document.getElementById("student-ul");
const addBtn = document.getElementById("add-btn");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const nameInput = document.getElementById("name");
const surnameInput = document.getElementById("surname");
const courseInput = document.getElementById("course");
const addressInput = document.getElementById("address");
const descriptionInput = document.getElementById("description");
const saveBtn = document.getElementById("save-btn");
const cancelBtn = document.getElementById("cancel-btn");

// Función para guardar los datos en LocalStorage
function saveStudent(name, surname, course, address, description) {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    students.push({
      name: name,
      surname: surname,
      course: course,
      address: address,
      description: description,
    });
    localStorage.setItem("students", JSON.stringify(students));
  
    // Mostrar mensaje de éxito
    const successMessage = document.createElement("div");
    successMessage.textContent = "Agregado exitosamente";
    successMessage.classList.add("exito");
    document.body.appendChild(successMessage);
  
    // Desvanecer el mensaje después de 3 segundos
    setTimeout(() => {
      successMessage.remove();
    }, 3000);
  }

  // Función para cargar los datos de LocalStorage y mostrarlos en la página
function loadStudents() {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    studentUL.innerHTML = "";
    students.forEach((student, index) => {
      let li = document.createElement("li");
      li.innerHTML = `
      <div>
        <span>${student.name} ${student.surname}</span>
      </div>
      <div class="button-group">
        <button class="edit-btn" data-id="${index}">Editar</button>
        <button class="delete-btn" data-id="${index}">Eliminar</button>
        <button class="view-btn" data-id="${index}">Ver Datos</button>
      </div>
    </div>
  
        
  
      `;
      studentUL.appendChild(li);
    });
  }
  