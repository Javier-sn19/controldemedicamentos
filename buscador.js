function buscarMedicamento() {
    // Obtener el valor del campo de búsqueda
    var searchText = document.getElementById("searchInput").value.toLowerCase();

    // Verificar si el campo de búsqueda está vacío
    if (searchText.trim() === "") {
        alert("Por favor, ingrese un término de búsqueda antes de buscar.");
        return; // No realizar la búsqueda si el campo está vacío
    }

    // Realizar una solicitud AJAX para cargar el archivo JSON
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Parsear el JSON y buscar los medicamentos
            var medicamentos = JSON.parse(xhr.responseText);
            var resultados = [];

            for (var i = 0; i < medicamentos.length; i++) {
                var medicamento = medicamentos[i];

                // Buscar por nombre o uso (puedes personalizar tus criterios de búsqueda)
                if (
                    medicamento.nombre.toLowerCase().includes(searchText) ||
                    medicamento.uso.toLowerCase().includes(searchText)
                ) {
                    resultados.push(medicamento);
                }
            }

            // Mostrar los resultados en la lista de medicamentos
            mostrarResultados(resultados);
        }
    };
    xhr.open("GET", "medicamentos.json", true);
    xhr.send();
}

// Llamar a la función buscarMedicamento() al hacer clic en el botón "Buscar"
document.querySelector("button.btn-primary").addEventListener("click", buscarMedicamento);


function mostrarResultados(resultados) {
    var medicationNameInput = document.getElementById("medication-name"); // Obtener el campo de entrada "medication-name"

    if (resultados.length === 0) {
        medicationNameInput.value = ""; // Limpiar el campo de entrada si no hay resultados
    } else {
        var primerResultado = resultados[0];
        // Llenar el campo de entrada "medication-name" con el nombre del medicamento seleccionado
        medicationNameInput.value = `${primerResultado.nombre} - Uso: ${primerResultado.uso}`;
    }
}
// Llamar a la función buscarMedicamento() al hacer clic en el botón "Buscar"
document.querySelector("button.btn-primary").addEventListener("click", buscarMedicamento);

function guardarMedicamento() {
    // Obtener los valores ingresados en el formulario
    var medicationName = document.getElementById("medication-name").value;
    var dose = document.getElementById("dose").value;
    var frequency = document.getElementById("frequency").value;
    var duration = document.getElementById("duration").value;

    // Crear un objeto con la información del medicamento
    var medicamento = {
        nombre: medicationName,
        dosis: dose,
        frecuencia: frequency,
        duracion: duration
    };

    // Agregar el medicamento a la lista de medicamentos cargados
    var loadedMedications = document.getElementById("loaded-medications");
    var listItem = document.createElement("li");
    listItem.className = "list-group-item";
    listItem.textContent = `Nombre: ${medicamento.nombre}, Dosis: ${medicamento.dosis}, Frecuencia: ${medicamento.frecuencia}, Duración: ${medicamento.duracion} días`;
    loadedMedications.appendChild(listItem);

    // Limpiar el formulario después de guardar
    document.getElementById("medication-form").reset();
}
