$(document).ready(function(){
    let current_fs, next_fs, previous_fs; //fieldsets
    let opacity;
    let current = 1;
    let steps = $("fieldset").length;
    
    setProgressBar(current);
    
    $(".next").click(function(){
        current_fs = $(this).parent();
        next_fs = $(this).parent().next();
        
        // Realizar validaciones antes de avanzar al siguiente paso
        if (current === 1 && !validateFieldsUsuario(current_fs)) {
            alert("Por favor, completa todos los campos obligatorios.");
            return; // Detiene el avance si hay campos vacíos en el primer paso
        } else if (current === 2 && !validateFieldsPersonal(current_fs)) {
            alert("Por favor, completa todos los campos obligatorios.");
            return; // Detiene el avance si hay campos vacíos en el segundo paso
        }
        
        // Add Class Active
        $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
        
        // Show the next fieldset
        next_fs.show(); 
        // Hide the current fieldset with style
        current_fs.animate({opacity: 0}, {
            step: function(now) {
                // For making fieldset appear animation
                opacity = 1 - now;
        
                current_fs.css({
                    'display': 'none',
                    'position': 'relative'
                });
                next_fs.css({'opacity': opacity});
            }, 
            duration: 500
        });
        setProgressBar(++current);
    });
    
    $(".previous").click(function(){
        current_fs = $(this).parent();
        previous_fs = $(this).parent().prev();
        
        // Remove class active
        $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
        
        // Show the previous fieldset
        previous_fs.show();
    
        // Hide the current fieldset with style
        current_fs.animate({opacity: 0}, {
            step: function(now) {
                // For making fieldset appear animation
                opacity = 1 - now;
        
                current_fs.css({
                    'display': 'none',
                    'position': 'relative'
                });
                previous_fs.css({'opacity': opacity});
            }, 
            duration: 500
        });
        setProgressBar(--current);
    });
    
    function setProgressBar(curStep){
        let percent = parseFloat(100 / steps) * curStep;
        percent = percent.toFixed();
        $(".progress-bar").css("width",percent+"%")   
    }
    
    $(".submit").click(function(){
        return false;
    });

    // Función para validar campos en el primer paso
    function validateFieldsUsuario(current_fs) {
        let isValid = true;

        // Obtener valores de los campos
        let uname = current_fs.find("input[name='uname']").val();
        let pwd = current_fs.find("input[name='pwd']").val();
        let cpwd = current_fs.find("input[name='cpwd']").val();

        // Verificar campos vacíos`
        if (uname === "" || pwd === "" || cpwd === "") {
            isValid = false;
        } else if (pwd !== cpwd) {
            isValid = false;
            alert("Las contraseñas no coinciden. Por favor, verifica.");
        }

        return isValid;
    }

    // Función para validar campos en el segundo paso
    function validateFieldsPersonal(current_fs) {
        let isValid = true;

        // Obtener valores de los campos
        let fname = current_fs.find("input[name='fname']").val();
        let lname = current_fs.find("input[name='lname']").val();
        let phno = current_fs.find("input[name='phno']").val();
        let phno_2 = current_fs.find("input[name='phno_2']").val();

        // Verificar campos vacíos
        if (fname === "" || lname === "" || phno === "" || phno_2 === "") {
            isValid = false;
        }

        return isValid;
    }
});

// Obtener el elemento de fecha de nacimiento y el elemento de edad
let birthdateInput = document.getElementById("birthdate");
let ageSpan = document.getElementById("age");

// Escuchar el evento de cambio en la fecha de nacimiento
birthdateInput.addEventListener("change", function() {
    let birthdate = new Date(this.value); // Convertir la fecha de nacimiento a objeto Date
    let today = new Date(); // Obtener la fecha actual
    let age = today.getFullYear() - birthdate.getFullYear(); // Calcular la diferencia de años

    // Verificar si aún no ha cumplido años en este año
    if (today.getMonth() < birthdate.getMonth() || (today.getMonth() === birthdate.getMonth() && today.getDate() < birthdate.getDate())) {
        age--; // Restar 1 año si aún no ha cumplido años
    }

    // Mostrar la edad calculada en el elemento span
    ageSpan.textContent

    // Llenar automáticamente el campo de edad con la edad calculada
    let ageInput = document.querySelector("input[name='phno_2']");
    ageInput.value = age;

    if (age < 18) {
        alert("¡Lo siento, debes ser mayor de 18 años para registrarte!");
            // Redirigir a index.html después de 5 segundos
    setTimeout(function() {
        window.location.href = "index.html";
    }, 1000);
} else {
    }
});

