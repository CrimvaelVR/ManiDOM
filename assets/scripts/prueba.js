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

  // Función para agregar un estudiante
function addStudent() {
    modalTitle.innerHTML= "Agregar estudiante";
    nameInput.value = "";
    surnameInput.value = "";
    courseInput.value = "";
    addressInput.value = "";
    descriptionInput.value = "";
    saveBtn.removeAttribute("data-id");
    modal.style.display = "block";
    
  }
  
  const message = document.createElement("div");
  message.classList.add("message");
  message.textContent = "Agregado exitosamente";
  document.body.appendChild(message);
  
  // Ocultar el mensaje después de unos segundos
  setTimeout(() => {
    message.remove();
  }, 3000);

  // Función para editar un estudiante
function editStudent(index) {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    let student = students[index];
    modalTitle.innerHTML = "Editar estudiante";
    nameInput.value = student.name;
    surnameInput.value = student.surname;
    courseInput.value = student.course;
    addressInput.value = student.address;
    descriptionInput.value = student.description;
    saveBtn.setAttribute("data-id", index);
    modal.style.display = "block";
  }

  // Función para eliminar un estudiante
function deleteStudent(index) {
    let students = JSON.parse(localStorage.getItem("students")) || [];
  
    // Crear un elemento HTML para el cuadro de diálogo
    const dialog = document.createElement("div");
    dialog.classList.add("dialog");
    dialog.innerHTML = `
      <p>¿Está seguro de que desea eliminar al estudiante?</p>
      <button class="btn-ok">Aceptar</button>
      <button class="btn-cancel">Cancelar</button>
    `;
  
    // Agregar el cuadro de diálogo al DOM
    document.body.appendChild(dialog);
  
    // Agregar un oyente para el evento de clic en los botones "Aceptar" y "Cancelar"
    dialog.addEventListener("click", (event) => {
      if (event.target.classList.contains("btn-ok")) {
        // Obtener el elemento li del estudiante que se va a eliminar
        const li = studentUL.querySelector(`li:nth-child(${index + 1})`);
  
        // Agregar la clase slide-out para la animación de deslizamiento
        li.classList.add("slide-out");
  
        // Retrasar la eliminación hasta que se complete la animación
        setTimeout(() => {
          students.splice(index, 1);
          localStorage.setItem("students", JSON.stringify(students));
          loadStudents();
        }, 500); // 500 milisegundos es igual al tiempo de duración de la animación
  
        // Eliminar el elemento li del DOM después de que se complete la animación
        setTimeout(() => {
          li.remove();
        }, 1000); // 1000 milisegundos es igual al tiempo de duración de la animación más un pequeño retraso
  
        // Eliminar el cuadro de diálogo del DOM
        dialog.remove();
      } else if (event.target.classList.contains("btn-cancel")) {
        // Eliminar el cuadro de diálogo del DOM
        dialog.remove();
      }
    });
  }

  // Función para actualizar un estudiante
function updateStudent(index, name, surname, course, address, description) {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    students[index] = {
      name: name,
      surname: surname,
      course: course,
      address: address,
      description: description,
    };
    localStorage.setItem("students", JSON.stringify(students));
  
    // Mostrar mensaje de éxito
    const successMessage = document.createElement("div");
    successMessage.textContent = "Editado exitosamente";
    successMessage.classList.add("exito");
    document.body.appendChild(successMessage);
  
    // Desvanecer el mensaje después de 3 segundos
    setTimeout(() => {
      successMessage.remove();
    }, 3000);
  }

  // Evento para mostrar el modal al hacer clic en el botón agregar
addBtn.addEventListener("click", addStudent);

// Evento para cerrar el modal al hacer clic en el botón cancelar o fuera del modal
window.addEventListener("click", (event) => {
  if (event.target == cancelBtn) {
    modal.style.display = "none";
  }
});

let closeBtn = document.querySelector(".close");
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});
  

// Agregar un oyente para el evento 'submit' del formulario de estudiante
const studentForm = document.querySelector('#modal form');
studentForm.addEventListener('submit', (event) => {
  event.preventDefault();
  
  // Obtener los valores de entrada del formulario
  const name = nameInput.value.trim();
  const surname = surnameInput.value.trim();
  const course = courseInput.value.trim();
  const address = addressInput.value.trim();
  const description = descriptionInput.value.trim();
  
  // Validar que los campos de entrada no estén vacíos
  if (name === '' || surname === '' || course === '' || address === '') {
    alert('Por favor, complete todos los campos obligatorios.');
    return;
  }
  
  // Validar que el campo de descripción no tenga más de 500 caracteres
  if (description.length > 500) {
    alert('La descripción no debe contener más de 500 caracteres.');
    return;
  }
  
  // Obtener el índice del estudiante actualmente editado, si lo hay
  const index = saveBtn.getAttribute("data-id");
  
  // Guardar o actualizar el estudiante según corresponda
  if (index) {
    updateStudent(index, name, surname, course, address, description);
  } else {
    saveStudent(name, surname, course, address, description);
  }
  
  // Actualizar la lista de estudiantes y cerrar elmodal
  loadStudents();
  modal.style.display = "none";
});

// Agregar oyentes para los botones de editar y eliminar estudiantes
studentUL.addEventListener("click", (event) => {
  if (event.target.classList.contains("edit-btn")) {
    const index = event.target.getAttribute("data-id");
    editStudent(index);
  } else if (event.target.classList.contains("delete-btn")) {
    const index = event.target.getAttribute("data-id");
    deleteStudent(index);
  }
});


// Agregar oyente para el botón "Ver Datos"
studentUL.addEventListener("click", (event) => {
  if (event.target.classList.contains("view-btn")) {
    const index = event.target.getAttribute("data-id");
    const students = JSON.parse(localStorage.getItem("students")) || [];
    const student = students[index];
    
    // Crear un cuadro de diálogo para mostrar los detalles del estudiante
    const dialog = document.createElement("div");
    dialog.classList.add("vista");
    dialog.innerHTML = `
      <div class="dialog-inner">
        <p><strong>Nombre:</strong> ${student.name}</p>
        <p><strong>Apellido:</strong> ${student.surname}</p>
        <p><strong>Curso:</strong> ${student.course}</p>
        <p><strong>Dirección:</strong> ${student.address}</p>
        <p><strong>Descripción:</strong> ${student.description}</p>
        <button class="close-btn">Cerrar</button>
      </div>
    `;
    
    // Agregar el cuadro de diálogo al DOM
    document.body.appendChild(dialog);
    
    // Agregar un oyente para el botón "Cerrar" dentro del cuadro de diálogo
    const closeBtn = dialog.querySelector(".close-btn");
    closeBtn.addEventListener("click", () => {
      dialog.remove();
    });
  }
});

// Cargar los estudiantes al cargar la página
loadStudents();
