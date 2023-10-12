

const medicationList = [];

function addMedication() {
    const medicationName = document.getElementById('medication-name').value;
    const dose = document.getElementById('dose').value;
    const frequency = document.getElementById('frequency').value;
    const duration = document.getElementById('duration').value;

    const medication = {
        name: medicationName,
        dose: dose,
        frequency: frequency,
        duration: duration
    };

    medicationList.push(medication);

    // Limpia el formulario
    document.getElementById('medication-form').reset();

    // Muestra la lista de medicamentos agregados
    displayMedications();
}

function displayMedications() {
    const listContainer = document.getElementById('medication-list');
    listContainer.innerHTML = '';

    medicationList.forEach((medication, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.innerHTML = `
            <strong>${medication.name}</strong><br>
            Dosis: ${medication.dose}<br>
            Frecuencia: Cada ${medication.frequency} horas<br>
            Duración del Tratamiento: ${medication.duration} días<br>
        `;
        listContainer.appendChild(listItem);
    });
}

fetch('medicamentos.json')
.then(response => response.json())
.then(data => {
    const medicamentos = data;

    // Función para mostrar los resultados de búsqueda
    function mostrarResultados() {
        const searchTerm = document.getElementById("searchInput").value.toLowerCase();
        const resultados = medicamentos.filter(med => 
            med.nombre.toLowerCase().includes(searchTerm) ||
            med.uso.toLowerCase().includes(searchTerm)
        );

        const medicamentosList = document.getElementById("medicamentosList");
        medicamentosList.innerHTML = "";

        if (resultados.length === 0) {
            medicamentosList.innerHTML = "<li>No se encontraron resultados.</li>";
        } else {
            resultados.forEach(med => {
                const li = document.createElement("li");
                li.textContent = `${med.nombre} - Uso: ${med.uso}`;
                medicamentosList.appendChild(li);
            });
        }
    }

    // Escuchar cambios en el input de búsqueda
    document.getElementById("searchInput").addEventListener("input", mostrarResultados);

    // Mostrar todos los medicamentos al cargar la página
    mostrarResultados();
})
.catch(error => console.error('Error al cargar el archivo JSON:', error));