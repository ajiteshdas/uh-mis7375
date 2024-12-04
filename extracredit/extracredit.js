document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const form = document.getElementById("registration-form");
    const progressBar = document.getElementById("progress-bar");
    const toggleSSNVisibility = document.querySelector(".toggle-visibility");
    const ssnInput = document.getElementById("ssn");
    const dobInput = document.getElementById("dob");
    const phoneInput = document.getElementById("phone");
    const zipcodeInput = document.getElementById("zipcode");
    const firstNameInput = document.getElementById("first-name");
    const middleInitialInput = document.getElementById("middle-initial");
    const lastNameInput = document.getElementById("last-name");
    const emailInput = document.getElementById("email");
    const address1Input = document.getElementById("address1");
    const address2Input = document.getElementById("address2");
    const symptomsInput = document.getElementById("symptoms");
    const otherDiseaseCheckbox = document.getElementById("other-disease-checkbox");
    const otherDiseaseInput = document.getElementById("other-disease");
    const vaccinationRadios = document.getElementsByName("vaccination");
    const vaccinationDetailsInput = document.getElementById("vaccination-details");
    const insuranceRadios = document.getElementsByName("insurance");
    const insuranceDetailsInput = document.getElementById("insurance-details");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-password");

    // Validation Messages
    const validationMessages = {
        required: "This field is required.",
        invalidName: "Only letters, apostrophes, and dashes allowed.",
        invalidDOB: "Date must be between 01/01/1920 and today.",
        invalidSSN: "Invalid SSN format. Use XXX-XX-XXXX.",
        invalidEmail: "Invalid email format.",
        invalidPhone: "Invalid phone format. Use XXX-XXX-XXXX.",
        invalidZip: "Invalid Zip code. Use XXXXX or XXXXX-XXXX.",
        passwordMismatch: "Passwords do not match.",
        symptomsLength: "Must be between 30 and 300 characters.",
        passwordCriteria:
            "Password must be 8-30 characters, include an uppercase, a lowercase, a number, and a special character, and not contain your username.",
    };


    //Setting today's date
    const today = new Date().toISOString().split("T")[0]; // Today's date in YYYY-MM-DD format

    const todaySpan = document.getElementById('today_date');
    todaySpan.innerHTML = 'Today is: ' + new Date().toDateString();

     // Set the maximum date to today
    dobInput.setAttribute("max", today);


    // Validate the date on input
dobInput.addEventListener("input", () => {
    const dobResult = isValidDOB(dobInput.value);

    if (!dobResult.valid) {
        showError(dobInput, dobResult.message);
        markFieldInvalid(dobInput);
    } else {
        clearError(dobInput);
        markFieldValid(dobInput);
    }
});
    // Helper Functions
    /*function showError(input, message) {
    const errorSpan = input.nextElementSibling; // Ensure the span exists
    if (errorSpan && errorSpan.classList.contains("error-message")) {
        errorSpan.textContent = message; // Set the error message text
        errorSpan.style.display = "block"; // Make the error message visible
        errorSpan.setAttribute("aria-live", "polite"); // Ensure accessibility
    } else {
        console.error("Error message span not found for:", input);
    }
    input.setAttribute("aria-invalid", "true"); // Mark input as invalid
}*/

function showError(input, message) {
    const formGroup = input.closest(".form-group");
    const errorSpan = formGroup.querySelector(".error-message"); // Locate the error span within the group
    if (errorSpan) {
        errorSpan.textContent = message; // Set the error message
        errorSpan.style.display = "block"; // Make the error message visible
        input.setAttribute("aria-invalid", "true"); // Mark the input as invalid for accessibility
    } else {
        console.error("Error message span not found for:", input);
    }
}


/*function clearError(input) {
    // Check if the next sibling exists and is an error span
    const errorSpan = input.nextElementSibling;
    if (errorSpan && errorSpan.classList.contains("error-message")) {
        errorSpan.textContent = "";
        errorSpan.classList.remove('show');
    }
}*/

function clearError(input) {
    const formGroup = input.closest(".form-group");
    const errorSpan = formGroup.querySelector(".error-message"); // Locate the error span within the group
    if (errorSpan) {
        errorSpan.textContent = ""; // Clear the error message
        errorSpan.style.display = "none"; // Hide the error message
        input.removeAttribute("aria-invalid"); // Remove the invalid attribute
    }
}


    function isValidName(value) {
        return /^[a-zA-Z'-]{2,30}$/.test(value);
    }

    //date validation
function isValidDOB(value) {
    if (!value) {
        return { valid: false, message: "This field is required." };
    }

    const minDate = new Date("1920-01-01");
    const today = new Date();
    const inputDate = new Date(value);

    if (isNaN(inputDate.getTime())) {
        // When the date is invalid or malformed
        return { valid: false, message: "Invalid date entered. Please use the correct date format." };
    }

    if (inputDate < minDate || inputDate > today) {
        // When the date is out of range
        return { valid: false, message: "Date must be between 1920-01-01 and today." };
    }

    // When the date is valid
    return { valid: true, message: "" };
}





    function isValidSSN(value) {
        return /^\d{3}-\d{2}-\d{4}$/.test(value);
    }

    function isValidEmail(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    function isValidPhone(value) {
        return /^\d{3}-\d{3}-\d{4}$/.test(value);
    }

    function isValidZip(value) {
        return /^\d{5}(-\d{4})?$/.test(value);
    }

    function validateField(input, validator, errorMessage) {
    if (!input) return false;

    console.log(`Validating input: ${input.id}, value: "${input.value}"`);

    if (!input.value.trim()) {
        console.log(`Input "${input.id}" is empty.`);
        showError(input, validationMessages.required);
         markFieldInvalid(input);
        return false;
    } else if (input.type === "date") {
        // For date validation, use isValidDOB and process its return value
        const dobValidation = isValidDOB(input.value);
        if (!dobValidation.valid) {
            showError(input, dobValidation.message);
            markFieldInvalid(input);
            return false;
        }
    }else if (!validator(input.value.trim())) {
        console.log(`Input "${input.id}" failed validation.`);
        showError(input, errorMessage);
         markFieldInvalid(input);
        return false;
    } else {
        console.log(`Input "${input.id}" passed validation.`);
        clearError(input);
        markFieldValid(input);
        return true;
    }
}

    // Validate Fields
    firstNameInput.addEventListener("input", () =>
        validateField(firstNameInput, isValidName, validationMessages.invalidName)
    );

    middleInitialInput.addEventListener("input", () =>
        validateField(middleInitialInput, (value) => /^[a-zA-Z]?$/.test(value), validationMessages.invalidName)
    );

    lastNameInput.addEventListener("input", () =>
        validateField(lastNameInput, isValidName, validationMessages.invalidName)
    );

    ssnInput.addEventListener("input", () =>
        validateField(ssnInput, isValidSSN, validationMessages.invalidSSN)
    );

    emailInput.addEventListener("input", () =>
        validateField(emailInput, isValidEmail, validationMessages.invalidEmail)
    );

    phoneInput.addEventListener("input", () =>
        validateField(phoneInput, isValidPhone, validationMessages.invalidPhone)
    );

    zipcodeInput.addEventListener("input", () =>
        validateField(zipcodeInput, isValidZip, validationMessages.invalidZip)
    );

    address1Input.addEventListener("input", () => {
    const trimmedValue = address1Input.value.trim();
    console.log("Trimmed Value:", trimmedValue);
    validateField(
        address1Input,
        (value) => /^[a-zA-Z0-9\s,.-]{2,30}$/.test(trimmedValue),
        "Address Line 1 must be 2-30 characters and can include letters, numbers, spaces, commas, periods, and hyphens."
    );
});


    address2Input.addEventListener("input", () =>
        validateField(address2Input, (value) => /^[a-zA-Z0-9\s,.-]{2,30}$/.test(value), validationMessages.required)
    );

    symptomsInput.addEventListener("input", () =>
        validateField(
            symptomsInput,
            (value) => value.length === 0 || (value.length >= 30 && value.length <= 300),
            validationMessages.symptomsLength
        )
    );

    // Checkbox and Radio Dependencies
    otherDiseaseCheckbox.addEventListener("change", () => {
        otherDiseaseInput.classList.toggle("hidden", !otherDiseaseCheckbox.checked);
    });

    vaccinationRadios.forEach((radio) =>
        radio.addEventListener("change", () => {
            vaccinationDetailsInput.classList.toggle(
                "hidden",
                Array.from(vaccinationRadios).some((r) => r.value === "Yes" && r.checked) === false
            );
        })
    );

    insuranceRadios.forEach((radio) =>
        radio.addEventListener("change", () => {
            insuranceDetailsInput.classList.toggle(
                "hidden",
                Array.from(insuranceRadios).some((r) => r.value === "Yes" && r.checked) === false
            );
        })
    );

    // Password Validation
    passwordInput.addEventListener("input", () => {
    const password = passwordInput.value;

    // Validation criteria
    const validLength = password.length >= 8 && password.length <= 30;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const notInUsername = !usernameInput.value || !password.includes(usernameInput.value);

    // Get criteria elements
    const lengthCriteria = document.getElementById("min-length");
    const uppercaseCriteria = document.getElementById("uppercase");
    const lowercaseCriteria = document.getElementById("lowercase");
    const numberCriteria = document.getElementById("number");
    const specialCharCriteria = document.getElementById("special-char");
    const noUsernameCriteria = document.getElementById("no-username");

    // Update classes dynamically
    lengthCriteria.classList.toggle("valid", validLength);
    uppercaseCriteria.classList.toggle("valid", hasUppercase);
    lowercaseCriteria.classList.toggle("valid", hasLowercase);
    numberCriteria.classList.toggle("valid", hasNumber);
    specialCharCriteria.classList.toggle("valid", hasSpecialChar);
    noUsernameCriteria.classList.toggle("valid", notInUsername);

    // Show error if password does not meet all criteria
    const isValidPassword =
        validLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar && notInUsername;

    if (!isValidPassword) {
        showError(passwordInput, validationMessages.passwordCriteria);
        markFieldInvalid(passwordInput);
    } else {
        clearError(passwordInput);
        markFieldValid(passwordInput);

    }
});


    //populate review modal
    const reviewBtn = document.getElementById("review-btn");
    const reviewModal = document.getElementById("review-modal");
    const reviewContent = document.getElementById("review-content");
    const editBtn = document.getElementById("edit-btn");
    const submitBtn = document.getElementById("submit-btn");

    // Fields to hide for privacy
    const hiddenFields = ["password", "confirm-password", "ssn"];

    // Function to gather form data
    function gatherFormData() {
    const inputs = form.querySelectorAll("input, select, textarea");
    const data = {};

    inputs.forEach((input) => {
        const fieldName = input.name || input.id;

        // Skip hidden fields explicitly
        if (hiddenFields.includes(fieldName)) {
            data[fieldName] = "Info hidden for privacy";
            return;
        }

        // Handle radio and checkbox inputs
        if (input.type === "radio" || input.type === "checkbox") {
            if (input.checked) {
                if (!data[fieldName]) data[fieldName] = [];
                data[fieldName].push(input.value);
            }
        } else {
            // Capture all other fields
            data[fieldName] = input.value.trim();
        }
    });

    return data;
}

    // Function to populate review modal
    function populateReviewModal(data) {
    reviewContent.innerHTML = ""; // Clear existing content

    Object.entries(data).forEach(([key, value]) => {
        const item = document.createElement("div");
        item.classList.add("review-item");

        // Format the label
        const label = document.createElement("strong");
        label.textContent = `${key.replace(/-/g, " ").toUpperCase()}: `;

        // Format the value
        const valueSpan = document.createElement("span");
        if (key === "disease-history") {
            // Handle disease history
            const diseases = Array.isArray(value) ? value.filter((v) => v !== "Others").join(", ") : value;
            const otherDisease = data["other-disease"];
            valueSpan.textContent = diseases;
            if (otherDisease) {
                valueSpan.textContent += `, Other Disease: ${otherDisease}`;
            }
        } else {
            valueSpan.textContent = Array.isArray(value) ? value.join(", ") : value;
        }

        // Add an edit button
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.classList.add("edit-button");
        editButton.addEventListener("click", () => {
            const field = document.getElementById(key);
            if (field) {
                field.focus();
                reviewModal.classList.remove("show");
                reviewModal.classList.add("hidden");
            }
        });

        // Append elements
        item.appendChild(label);
        item.appendChild(valueSpan);
        item.appendChild(editButton);
        reviewContent.appendChild(item);
    });

    reviewModal.classList.add("show");
}
//end of Populate modal function


    // Handle Review Button Click
reviewBtn.addEventListener("click", () => {
    const inputs = form.querySelectorAll("input, select, textarea");
    let valid = true; // Assume all fields are valid initially
    let firstInvalidField = null; // To focus on the first invalid field

    // Validate all inputs
    inputs.forEach((input) => {
        if (!input.classList.contains("hidden") && input.required) {
            const isFieldValid = validateField(
                input,
                () => true, // Use the existing validation rules
                "This field is required."
            );

            if (!isFieldValid) {
                valid = false; // Mark as invalid if any field fails validation
                if (!firstInvalidField) firstInvalidField = input; // Capture the first invalid field
            }
        }
    });

    if (!valid) {
        // If validation fails, focus on the first invalid field and prevent modal display
        if (firstInvalidField) firstInvalidField.focus();
        alert("Please correct the highlighted errors before reviewing.");
        return;
    }

    // Gather form data and populate the modal only if validation passes
    const data = gatherFormData();
    populateReviewModal(data);
    reviewModal.classList.remove('hidden');
});

    // Close the review modal and allow editing
    editBtn.addEventListener("click", () => {
    if (reviewModal.classList.contains("show")) {
        reviewModal.classList.remove("show");
        reviewModal.classList.add("hidden");
    }
});

    // Handle Submit Button Click
/*submitBtn.addEventListener("click", (e) => {
     e.preventDefault(); // Prevent the default form submission behavior

    // Additional validation can go here
    const inputs = form.querySelectorAll("input, select, textarea");
    let valid = true;
    let firstInvalidField = null;

    inputs.forEach((input) => {
         if (!input.classList.contains("hidden")) {
            // Skip optional fields
            if (
                input.id === "middle-initial" ||
                (input.id === "vaccination-details" && !document.querySelector("input[name='vaccination'][value='Yes']").checked) ||
                (input.id === "insurance-details" && !document.querySelector("input[name='insurance'][value='Yes']").checked)
            ) {
                clearError(input); // Clear errors for these fields
                return; // Skip validation for optional or conditionally hidden fields
            }
        }
        if (!validateField(input, () => true, "")) valid = false;
    });

    if (!valid) {
        alert("Please fill out all required fields before submitting.");
        if (reviewModal.classList.contains("show")) {
        reviewModal.classList.remove("show");
        reviewModal.classList.add("hidden");
    }
    if (firstInvalidField) firstInvalidField.focus();
        return;
    }

    // Redirect to the thank you page
    window.location.href = "thankyou_ec.html";
});*/


submitBtn.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const inputs = form.querySelectorAll("input, select, textarea");
    let valid = true;
    let firstInvalidField = null;

    // Loop through each input to validate
    inputs.forEach((input) => {
        if (!input.classList.contains("hidden")) {
            // Skip optional fields
            if (
                input.id === "middle-initial" ||
                input.id === "address2" ||
                input.id === "dob" ||
                (input.id === "vaccination-details" && !document.querySelector("input[name='vaccination'][value='Yes']").checked) ||
                (input.id === "insurance-details" && !document.querySelector("input[name='insurance'][value='Yes']").checked)
            ) {
                clearError(input); // Clear errors for these fields
                return; // Skip validation for optional or conditionally hidden fields
            }

            // Validate other fields
            const isFieldValid = validateField(
                input,
                () => true, // Replace with field-specific validation logic if needed
                validationMessages.required
            );

            if (!isFieldValid && valid) {
                valid = false;
                firstInvalidField = input; // Save the first invalid field
            }
        }
    });

    if (!valid) {
        // Focus on the first invalid field
        alert("Please fill out all required fields before submitting.");
        if (reviewModal.classList.contains("show")) {
        reviewModal.classList.remove("show");
        reviewModal.classList.add("hidden");
    }
    if (firstInvalidField) firstInvalidField.focus();
        return;
    }

    saveDataToLocalStorage();

    // If all fields are valid, redirect to the thank you page
    window.location.href = "thankyou_ec.html";
});

    // Form Submission
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const inputs = form.querySelectorAll("input, select, textarea");
        let valid = true;

        inputs.forEach((input) => {
            if (!input.classList.contains("hidden") && input.required) {
                const isValid = input.dispatchEvent(new Event("input", { bubbles: true }));
                if (!isValid) valid = false;
            }
        });

        if (valid) {
            alert("Form submitted successfully!");
            localStorage.clear(); // Clear localStorage after submission
        form.reset(); // Clear the form
        } else {
            alert("Please correct the errors before submitting.");
        }
        
    });

    //Toggle iframe

    const iframe = document.getElementById("cdc-iframe");
    const toggleIframeBtn = document.getElementById("toggle-iframe-btn");

    // Toggle the iframe's visibility on button click
    toggleIframeBtn.addEventListener("click", () => {
        if(iframe.classList.contains('visible')){
            iframe.classList.remove('visible')
            toggleIframeBtn.textContent = "Show CDC Info";
        }else{
            iframe.classList.add('visible')
            toggleIframeBtn.textContent = "Hide CDC Info";
        }
    });
    
    //welcome modal for cookie
    const welcomeModal = document.getElementById("welcome-modal");
    const continueBtn = document.getElementById("continue-btn");
    const notYouBtn = document.getElementById("not-you-btn");

        // Hide welcome modal and show form on "Continue"
        continueBtn.addEventListener("click", () => {
        //const recaptchaResponse = grecaptcha.getResponse();

        //if (!recaptchaResponse) {
        //    alert("Please verify that you are not a robot.");
        //    return;
        //}

        // Proceed if reCAPTCHA is verified
        //alert("reCAPTCHA verified. Welcome!");
        firstNameInput.value = 'John';
        welcomeModal.classList.add("hidden");
        form.classList.remove("hidden");
    });


        // Additional logic for "Not You?"
        notYouBtn.addEventListener("click", () => {
        grecaptcha.reset(); // Reset the reCAPTCHA
        welcomeModal.classList.add("hidden");
        form.classList.remove("hidden");
    });

        // Toggle the "required" attribute for insurance-details based on the selected radio button
insuranceRadios.forEach((radio) =>
    radio.addEventListener("change", () => {
        if (radio.value === "Yes" && radio.checked) {
            insuranceDetailsInput.classList.remove("hidden");
            insuranceDetailsInput.setAttribute("required", "true"); // Make it required
        } else {
            insuranceDetailsInput.classList.add("hidden");
            insuranceDetailsInput.removeAttribute("required"); // Remove the required attribute
            clearError(insuranceDetailsInput); // Clear any existing error
        }
    })
);
usernameInput.addEventListener("input", () => {
    const username = usernameInput.value;

    // Validation criteria
    const validLength = username.length >= 5;

    // Show error or clear it based on validation
    if (!validLength) {
        showError(usernameInput, "Username must be at least 5 characters long.");
        markFieldInvalid(usernameInput);
    } else {
        clearError(usernameInput);
        markFieldValid(usernameInput);
    }
});

//Mark fields as valid
function markFieldValid(input) {
    const formGroup = input.closest(".form-group");
    if (formGroup) {
        formGroup.classList.add("valid");
        formGroup.classList.remove("invalid");
    }
}

function markFieldInvalid(input) {
    const formGroup = input.closest(".form-group");
    if (formGroup) {
        formGroup.classList.add("invalid");
        formGroup.classList.remove("valid");
    }
}

confirmPasswordInput.addEventListener("input", () => {
    const confirmPassword = confirmPasswordInput.value;
    const password = passwordInput.value;

    if (confirmPassword !== password) {
        showError(confirmPasswordInput, "Passwords do not match.");
        markFieldInvalid(confirmPasswordInput);
    } else {
        clearError(confirmPasswordInput);
    }
});

toggleSSNVisibility.addEventListener("click", () => {
    if (ssnInput.type === "password") {
        ssnInput.type = "text";
        toggleSSNVisibility.classList.remove("fa-eye");
        toggleSSNVisibility.classList.add("fa-eye-slash"); // Change icon to "hide" state
    } else {
        ssnInput.type = "password";
        toggleSSNVisibility.classList.remove("fa-eye-slash");
        toggleSSNVisibility.classList.add("fa-eye"); // Change icon to "show" state
    }
});


    //Cookie integration

    const userOptions = document.getElementById("user-options");
    const startFreshBtn = document.getElementById("start-fresh-btn");
    const welcomeMessage = document.getElementById("welcome-message");

    // Utility Functions
    function setCookie(name, value, days) {
        const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
        document.cookie = `${name}=${value}; expires=${expires}; path=/`;
    }

    function getCookie(name) {
        const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
            const [key, value] = cookie.split("=");
            acc[key] = value;
            return acc;
        }, {});
        return cookies[name];
    }

    function clearLocalStorage() {
        localStorage.removeItem("formData");
    }

    // Check for Existing User
    const username = getCookie("username");
    const savedData = localStorage.getItem("formData");

    if (username && savedData) {
        // Returning user
        welcomeMessage.textContent = `Welcome back, ${username}!`;
        userOptions.classList.remove("hidden"); // Show continue/start over options
        notYouBtn.classList.remove("hidden");
    } else {
        // New user
        document.querySelector("#welcome-modal .modal-content").innerHTML += "Welcome to our registration portal! Please take a moment to fill out the form.\
         If you need to step away, don't worry — we'll save your progress so you can pick up right where you left off." + 
            `<button id="proceed-new-btn" class="new-user-btn"> Let's get started!</button>
        `;
        document
            .getElementById("proceed-new-btn")
            .addEventListener("click", () => {
                welcomeModal.classList.add("hidden");
                form.classList.remove("hidden");
            });
        userOptions.classList.add("hidden"); // Hide options for new users
        notYouBtn.classList.add("hidden"); // No "Not You?" option for new users
    }

    // Handle Continue for Returning User
    continueBtn.addEventListener("click", () => {
        const savedFormData = JSON.parse(localStorage.getItem("formData"));
        if (savedFormData) {
            // Prefill form with saved data
            Object.entries(savedFormData).forEach(([key, value]) => {
                const field = form.elements[key];
                if (field) {
                    field.value = value;
                }
            });
        }
        welcomeModal.classList.add("hidden"); // Hide modal
        form.classList.remove("hidden"); // Show form
    });

    // Handle Start Over
    startFreshBtn.addEventListener("click", () => {
        clearLocalStorage(); // Clear saved data
        form.reset(); // Reset form fields
        welcomeModal.classList.add("hidden"); // Hide modal
        form.classList.remove("hidden"); // Show form
    });

    // Handle New User Proceeding
    notYouBtn.addEventListener("click", () => {
        clearLocalStorage();
        document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        welcomeModal.classList.add("hidden");
        form.classList.remove("hidden");
    });

    function saveDataToLocalStorage(data) {
        localStorage.setItem("formData", JSON.stringify(data));
    }

    function getDataFromLocalStorage() {
        return JSON.parse(localStorage.getItem("formData")) || null;
    }

    function saveNameToCookie(name) {
        document.cookie = `userName=${encodeURIComponent(name)}; path=/; max-age=31536000`; // 1 year expiration
    }

    function getNameFromCookie() {
        const cookies = document.cookie.split("; ");
        for (const cookie of cookies) {
            const [key, value] = cookie.split("=");
            if (key === "userName") {
                return decodeURIComponent(value);
            }
        }
        return null;
    }    
});
