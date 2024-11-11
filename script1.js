document.addEventListener('DOMContentLoaded', function() {

    // Attach dynamic validation and max length enforcement to each input field
    const fieldConfigs = [
        { id: 'firstname', regex: /^[A-Za-z'-]{1,30}$/, errorMessages: {
                required: `{field} is required.`,
                minLength: `{field} must be at least 1 character long.`,
                maxLength: `{field} cannot exceed 30 characters.`,
                invalidFormat: `Only letters, apostrophes(\'), and dashes(\-) are allowed in {field}.`
            }, minLength: 1, maxLength: 30 },
        { id: 'lastname', regex: /^[A-Za-z'-]{1,30}$/, errorMessages: {
                required: `{field} is required.`,
                minLength: `{field} must be at least 1 character long.`,
                maxLength: `{field} cannot exceed 30 characters.`,
                invalidFormat: `Only letters, apostrophes(\'), and dashes(\-) are allowed in {field}.`
            }, minLength: 1, maxLength: 30 },
        { id: 'middleinit', regex: /^[A-Za-z]$/, errorMessages: {
                required: `{field} is required.`,
                minLength: `{field} can be 1 character.`,
                maxLength: `{field} cannot exceed 1 character.`,
                invalidFormat: `Only letters allowed in {field}.`
            }, minLength: 1, maxLength: 1 },
        { id: 'dob', regex: null, errorMessages: {
                required: `{field} is required.`,
                invalidFormat: 'Please a valid date of birth.',
                minLength: `{field} must be valid.`,
                maxLength: `{field} must be valid.`
            }},
        { id: 'ssn', regex: /^\d{3}-\d{2}-\d{4}$/, errorMessages: {
                required: `{field} is required.`,
                invalidFormat: `{field} must be in the format XXX-XX-XXXX.`,
                minLength: `{field} must be exactly 9 digits long and formatted as XXX-XX-XXXX.`,
                maxLength: `{field} must be exactly 9 digits long and formatted as XXX-XX-XXXX.`
            }, minLength: 11, maxLength: 11 },
        { id: 'addr1', regex: /^.{2,30}$/, errorMessages: {
                required: `{field} is required.`,
                minLength: `{field} must be at least 2 characters long.`,
                maxLength: `{field} cannot exceed 30 characters.`,
                invalidFormat: `Only letters, apostrophes, and dashes are allowed in {field}.`
            }, minLength: 2, maxLength: 30 },
        { id: 'addr2', regex: null, errorMessages: {
            required: null,
            minLength: null,
            maxLength: null,
            invalidFormat: null
        }, minLength: 2, maxLength: 30 },
        { id: 'city', regex: /^[a-zA-Z\s'-]{2,30}$/, errorMessages: {
                required: `{field} is required.`,
                minLength: `{field} must be at least 2 characters long.`,
                maxLength: `{field} cannot exceed 30 characters.`,
                invalidFormat: `Only letters, apostrophes, and dashes are allowed in {field}.`
            }, minLength: 2, maxLength: 30 },
        { id: 'state', regex: null, errorMessages: {
            required: `{field} is required`,
            minLength: ``,
            maxLength: ``,
            invalidFormat: ``
        }, minLength: 2, maxLength: 30 },    
        { id: 'zip', regex: /^\d{5}$/, errorMessages: {
                required: `{field} is required.`,
                minLength: `{field} must be in the format XXXXX.`,
                maxLength: `{field} must be in the format XXXXX.`,
                invalidFormat: `{field} must be in the format XXXXX.`,
            }, minLength: 5, maxLength: 5 },
        { id: 'email', regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, errorMessages: {
                required: `{field} is required.`,
                invalidFormat: `Please enter a valid email. For example, john@example.com.`
            }, maxLength: 30 },
        { id: 'phone1', regex: /^(\+1\s?)?(\([0-9]{3}\)|[0-9]{3})[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$/, errorMessages: {
                required: `{field} is required.`,
                invalidFormat: `{field} must be in the format (XXX) XXX-XXXX.`
            }, maxLength: 12 },
        { id: 'userid', regex: /^[a-zA-Z][a-zA-Z0-9_-]{4,19}$/, errorMessages: {
                required: `{field} is required.`,
                minLength: `{field} must be at least 5 characters long.`,
                maxLength: `{field} cannot exceed 30 characters.`,
                invalidFormat: `UserID cannot start with a number or contain special characters other than - and _.`
            }, minLength: 5, maxLength: 20 },
        { id: 'password', regex: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;"'<>,.?~\\/-]).{8,30}$/, errorMessages: {
                required: `{field} is required.`,
                match:`{field} does not match`,
                invalidFormat: `Password must contain at least one uppercase letter, one number, and one special character.`
            }, minLength: 8, maxLength: 30 },
    ];

    // Validation functions and event listeners
    fieldConfigs.forEach(config => {
        const fieldElement = document.getElementById(config.id);
        console.log(fieldElement);
        if (fieldElement) {
            console.log(fieldElement);
            const errorTd = fieldElement.closest('td').nextElementSibling;
            if (errorTd && errorTd.classList.contains('error-message')) {
                errorTd.id = `error-message-${config.id}`;
            }

            if (fieldElement.type === 'text' && config.id != 'userid') {
                fieldElement.addEventListener('blur', () => {
                    fieldElement.value = fieldElement.value.toUpperCase();
                });
            }

            if (fieldElement && config.errorMessages) { // Check if errorMessages exists
                const labelElement = document.querySelector(`label[for="${config.id}"]`);
                let fieldName = labelElement ? labelElement.textContent.trim() : config.id;
                
                // Remove ":*" or any other unwanted characters from the label text
                fieldName = fieldName.replace(/[:*]/g, '').trim();
    
                // Only replace placeholders if each error message exists
                if (config.errorMessages.required) {
                    config.errorMessages.required = config.errorMessages.required.replace('{field}', fieldName);
                }
                if (config.errorMessages.minLength) {
                    config.errorMessages.minLength = config.errorMessages.minLength.replace('{field}', fieldName);
                }
                if (config.errorMessages.maxLength) {
                    config.errorMessages.maxLength = config.errorMessages.maxLength.replace('{field}', fieldName);
                }
                if (config.errorMessages.invalidFormat) {
                    config.errorMessages.invalidFormat = config.errorMessages.invalidFormat.replace('{field}', fieldName);
                }
            }
        }
    });

    // Attach event listeners
    function attachValidationHandlers() {
        fieldConfigs.forEach(({ id, regex, errorMessages, minLength, maxLength }) => {
            const field = document.getElementById(id);
            if (field) {
                field.setAttribute('maxlength', maxLength);

                field.addEventListener('input', function() {
                    if (field.value.length > maxLength) field.value = field.value.slice(0, maxLength);
                    dynamicValidation(id, regex, errorMessages, minLength, maxLength);
                });
            }
        });
        // Additional validations for specific fields
        document.getElementsByName('symptoms')[0].addEventListener('input', validateSymptoms);
        document.getElementsByName('diseases').forEach(cb => cb.addEventListener('change', validateDiseases));
        document.getElementsByName('gender').forEach(rb => rb.addEventListener('change', validateGender));
        document.getElementsByName('vaccination').forEach(rb => rb.addEventListener('change', validateVaccination));
        document.getElementsByName('insurance').forEach(rb => rb.addEventListener('change', validateInsurance));
    }

    attachValidationHandlers();

    // Dynamic validation function
    function dynamicValidation(fieldId, regex, errorMessages, minLength = 0, maxLength = Infinity) {
        const field = document.getElementById(fieldId);
        if (!field) return true;

        const fieldValue = field.value;
        hideAllErrors(fieldId);

        if (field.hasAttribute('required') && !fieldValue) {
            showError(fieldId, errorMessages.required);
            return false;
        }

        if (fieldValue.length < minLength) {
            showError(fieldId, errorMessages.minLength);
            return false;
        }

        if (fieldValue.length > maxLength) {
            showError(fieldId, errorMessages.maxLength);
            return false;
        }

        if (regex && !regex.test(fieldValue)) {
            showError(fieldId, errorMessages.invalidFormat);
            return false;
        }

        return true;
    }

    // Error handling functions
    function showError(fieldId, message) {
        const errorElement = document.getElementById(`error-message-${fieldId}`);
        if (errorElement) {
            errorElement.innerText = message;
            errorElement.classList.add('show');
        }
    }

    function hideAllErrors(fieldId) {
        const errorElement = document.getElementById(`error-message-${fieldId}`);
        if (errorElement) {
            errorElement.classList.remove('show');
            errorElement.innerText = '';
        }
    }

    // Formatting for SSN, ZIP, and phone
    const formatInput = (input, format) => {
        if (input) {
            input.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                e.target.value = value.replace(format.regex, format.template);
            });
        }
    };
    formatInput(document.getElementById('ssn'), { regex: /^(\d{3})(\d{2})(\d{4})$/, template: '$1-$2-$3' });
    formatInput(document.getElementById('zip'), { regex: /^(\d{5})$/, template: '$1' });
    formatInput(document.getElementById('phone1'), { regex: /^(\d{3})(\d{3})(\d{4})$/, template: '$1-$2-$3' });

     // Configure password and re-entered password fields
     const usernameField = document.getElementById('userid');
     const passwordField = document.getElementById('password');
     const rePasswordField = document.getElementById('re_password');
     const passwordValidation = {
         uppercase: document.getElementById('uppercase'),
         number: document.getElementById('number'),
         specialChar: document.getElementById('special-char'),
         length: document.getElementById('length')
     };
    
    const dobField = document.getElementById('dob');
    if (dobField) {
        const minDate = '1920-01-01';
        const today = new Date().toISOString().split('T')[0];
        dobField.setAttribute('min', minDate);
        dobField.setAttribute('max', today);
        dobField.addEventListener('blur', function() {
            validateDob(dobField);
        });
    }

    // Attach event listeners for username and password validation
    usernameField.addEventListener('input', validatePassword);
    passwordField.addEventListener('input', validatePassword);

    // Add validation to password and re-password fields
    if (passwordField) passwordField.addEventListener('input', validatePassword);
    if (rePasswordField) rePasswordField.addEventListener('input', checkPasswordsMatch);

    // Validation functions
    function validateDob(field) {
        const dob = new Date(field.value);
        const minAllowedDate = new Date('1920-01-01');
        const maxAllowedDate = new Date();

        if (!field.value) {
            showError('dob', 'Valid date of birth is required. Please check your date of birth.');
        } else if (dob < minAllowedDate || dob > maxAllowedDate) {
            showError('dob', 'Date of Birth must be between 01/01/1920 and today.');
        } else {
            hideAllErrors('dob');
        }
    }

    function validatePassword() {
        const password = passwordField.value;
        const username = usernameField ? usernameField.value.toLowerCase() : '';

        updateValidationState(passwordValidation.uppercase, /[A-Z]/.test(password));
        updateValidationState(passwordValidation.number, /\d/.test(password));
        updateValidationState(passwordValidation.specialChar, /[!@#$%^&*(),.?":{}|<>-]/.test(password));
        updateValidationState(passwordValidation.length, password.length >= 8 && password.length <= 30);



        // Check if password contains username
        if (password === username || (username && password.includes(username))) {
            showError('password', 'Password cannot be the same as or contain your username.');
            return false;
        } else {
            hideAllErrors('password');
            return true;
        }

        if (rePasswordField.value) checkPasswordsMatch();
    }

    function checkPasswordsMatch() {
        if (passwordField.value !== rePasswordField.value) {
            showError('password', 'Passwords do not match.');
        } else {
            hideAllErrors('password');
        }
    }

    function updateValidationState(element, isValid) {
        element.classList.toggle('valid', isValid);
        element.classList.toggle('invalid', !isValid);
    }
    // Slider value display
    const slider = document.getElementById('feeling_today');
    const sliderDisplay = document.getElementById('sliderDisplay');
    if (slider) {
        slider.addEventListener('input', function() {
            sliderDisplay.textContent = slider.value;
        });
    }
    // Form submission validation
    const form = document.getElementById('signup'); //form element
    const reviewButton = document.getElementById('reviewButton'); // Button to trigger review
    const reviewInfoDiv = document.getElementById('reviewInfo'); // The review information div
    const submitButton = document.getElementById('submitButton'); // Button to submit
    const rangeSlider = document.getElementById('feeling_today'); 


    function validateForm(){
        // Run validation checks for radio buttons and checkboxes
        validateDiseases();
        validateGender();
        validateVaccination();
        validateInsurance();

        // Revalidate all fields and show errors if any exist
        let isFormValid = true;
        let firstInvalidField = null;

        // Check if the form is entirely empty (ignoring default values like range slider)
        let formIsEmpty = Array.from(form.elements).every(field => {
            if (field === rangeSlider) return true; // Skip the slider field
            return !field.value.trim();
        });

        if (formIsEmpty) {
            alert("Please enter your information.");
            // Focus on the first field in the form
            form.elements[0].focus();
            return false;
        }

        const invalid_message = document.getElementById('invalid_message');
        const success_message = document.getElementById('success_message');

        // Check if all validations passed
        const diseasesValid = Array.from(document.getElementsByName('diseases')).some(cb => cb.checked);
        const genderValid = Array.from(document.getElementsByName('gender')).some(rb => rb.checked);
        const vaccinationValid = Array.from(document.getElementsByName('vaccination')).some(rb => rb.checked);
        const insuranceValid = Array.from(document.getElementsByName('insurance')).some(rb => rb.checked);
        
        // If any required field is not valid, display an alert and prevent review
        if (!diseasesValid || !genderValid || !vaccinationValid || !insuranceValid) {
            alert("Please ensure all required radio buttons and checkboxes are selected before reviewing.");
            invalid_message.style.display = 'inline';
            invalid_message.classList.add('invalid');
            if(success_message){
                success_message.style.display = 'none';
            }
            if (submitButton){
                submitButton.style.display = 'none';
                }
            return false;
        }

        fieldConfigs.forEach((config) => {
            const field = document.getElementById(config.id);
            const fieldIsValid = dynamicValidation(config.id, config.regex, config.errorMessages, config.minLength, config.maxLength);
            
            // Check if the field is empty and required
            if (field && field.hasAttribute('required') && !field.value.trim()) {
                showError(config.id, `${config.id.replace('_', ' ')} is required.`);
                isFormValid = false;
                if (!firstInvalidField) {
                    firstInvalidField = field;
                }
            }

            // If a field is not empty, we don't need the empty form alert
            if (field && field.value.trim()) {
                emptyFormAlertNeeded = false;
            }

            if (!fieldIsValid) {
                isFormValid = false;
                if (!firstInvalidField) {
                    firstInvalidField = field;
                }
            }
        });

        // Additional validation for the password not matching the user ID
        const usernameField = document.getElementById('userid');
        const passwordField = document.getElementById('password');
        const repasswordField = document.getElementById('re_password');
        if (usernameField && passwordField && passwordField.value.includes(usernameField.value)) {
            showError('password', 'Password cannot contain username');
            isFormValid = false;
            if (!firstInvalidField) {
                firstInvalidField = passwordField;
            }
        } else {
            hideAllErrors('password');
        }

        if (passwordField.value !== rePasswordField.value) {
            showError('password', 'Passwords do not match.');
            isFormValid = false;
        } else {
            hideAllErrors('password');
        }
    

        if (isFormValid) {
            success_message.style.display = 'inline';
            success_message.classList.add('valid');
            if(invalid_message){
                invalid_message.style.display = 'none';
            }
            populateReviewInfo();
            reviewInfoDiv.style.display = 'block';
            submitButton.style.display = 'inline-block';
        } else {
            alert("Please correct the errors before reviewing your information.");
            invalid_message.style.display = 'inline';
            invalid_message.classList.add('invalid');
            if(success_message){
                success_message.style.display = 'none';
            }
            if (submitButton){
            submitButton.style.display = 'none';
            // Focus on the first invalid field to guide the user
            if (firstInvalidField) {
                firstInvalidField.focus();
            }
            }
        }
        return isFormValid;
    }
    // Validate button event listener
    reviewButton.addEventListener('click', function() {
        validateForm();  // Run validation on clicking validate
    });

    // Submit button event listener
    submitButton.addEventListener('click', function(event) {
        // Prevent form submission if validation fails
        if (!validateForm()) {
            event.preventDefault(); // Prevent form from submitting if not valid
        }
    });

    // Function to populate the review info section with entered data
    function populateReviewInfo() {
        fieldConfigs.forEach((config) => {
            const field = document.getElementById(config.id);
            const fieldIDdisplay = field.id;
            console.log(field.id);
            const reviewField = document.getElementById(`${config.id}_`);
            if((field && reviewField) && (field.id == 'password' || field.id == 'ssn')){
                reviewField.textContent = '' || `To ensure privacy, ${fieldIDdisplay} is not displayed.`;
            }
            else if (field && reviewField) {
                reviewField.textContent = field.value || `To ensure privacy, ${fieldIDdisplay} is not displayed.`;
            }
        });
    // Gender mapping and display
    const genderField = document.querySelector('input[name="gender"]:checked');
    const genderReview = document.getElementById('gender_');
    if (genderField && genderReview) {
        genderReview.textContent = genderField.value || 'Not specified';
    } else {
        genderReview.textContent = 'Not provided';
    }

    // Vaccination mapping and additional text input display
    const vaccinationField = document.querySelector('input[name="vaccination"]:checked');
    const vaccinationReview = document.getElementById('vaccination_');
    const vaccinationText = document.querySelector('input[name="vaccination_text"]'); // Text field for other details
    if (vaccinationField && vaccinationReview) {
        const vaccinationMap = {
            '0': 'No',
            '1': 'Yes'
        };
        vaccinationReview.textContent = vaccinationMap[vaccinationField.value];
        if (vaccinationField.value === '1' && vaccinationText && vaccinationText.value) {
            vaccinationReview.textContent += `: ${vaccinationText.value}`;
        }
    } else {
        vaccinationReview.textContent = 'Not provided';
    }

    // Insurance mapping and additional text input display
    const insuranceField = document.querySelector('input[name="insurance"]:checked');
    const insuranceReview = document.getElementById('insurance_');
    const insuranceText = document.querySelector('input[name="insurance_text"]'); // Text field for other details
    if (insuranceField && insuranceReview) {
        const insuranceMap = {
            '0': 'No',
            '1': 'Yes'
        };
        insuranceReview.textContent = insuranceMap[insuranceField.value];
        if (insuranceField.value === '1' && insuranceText && insuranceText.value) {
            insuranceReview.textContent += `: ${insuranceText.value}`;
        }
    } else {
        insuranceReview.textContent = 'Not provided';
    }
    
    //Display wellness score
    const feelingField = document.querySelector('input[name="feeling_today"]');
    const feelingReview = document.getElementById('feeling_today_');
    if (feelingField && feelingReview) {
        feelingReview.textContent = feelingField.value || 'Not specified';
    } else {
        feelingReview.textContent = 'Not provided';
    }

    // Checkbox fields
   // Checkbox fields for diseases
   const diseaseCheckboxes = document.querySelectorAll('input[name="diseases"]:checked');
   const diseasesReview = document.getElementById('diseases_');
   if (diseaseCheckboxes.length > 0 && diseasesReview) {
       const selectedDiseases = Array.from(diseaseCheckboxes).map(cb => cb.value).join(', ');
       diseasesReview.textContent = selectedDiseases;
   } else {
       diseasesReview.textContent = 'None selected';
   }
}

    // Attach edit button functionality to focus the corresponding input
    document.querySelectorAll('.edit_button button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const fieldId = this.closest('.review-item').querySelector('span').id.replace('_', '');
            document.getElementById(fieldId).focus();
        });
    });

    // Symptoms validation
function validateSymptoms() {
    const symptomsField = document.getElementsByName('symptoms')[0];
    const errorElement = document.getElementById('error-message');
    const minLength = 30;
    const maxLength = 1000;

    if (symptomsField.value.length < minLength) {
        showError('symptoms', `Please describe symptoms with at least ${minLength} characters.`);
    } else if (symptomsField.value.length > maxLength) {
        showError('symptoms', `Symptoms cannot exceed ${maxLength} characters.`);
    } else {
        hideAllErrors('symptoms');
    }
}

// Custom validation functions for checkboxes and radio groups
function validateDiseases() {
    const diseaseCheckboxes = document.getElementsByName('diseases');
    const isChecked = Array.from(diseaseCheckboxes).some(cb => cb.checked);
    if (!isChecked) {
        showError('diseases', 'Please select at least one disease.');
    } else {
        hideAllErrors('diseases');
    }
}

function validateGender() {
    const genderRadios = document.getElementsByName('gender');
    const isChecked = Array.from(genderRadios).some(rb => rb.checked);
    if (!isChecked) {
        showError('gender', 'Please select a gender.');
    } else {
        hideAllErrors('gender');
    }
}

function validateVaccination() {
    const vaccinationRadios = document.getElementsByName('vaccination');
    const specifyVaccinationRadio = document.querySelector('input[name="vaccination"][value="1"]');
    const vaccinationInput = document.querySelector('input[name="vaccination_text"]');
    const isChecked = Array.from(vaccinationRadios).some(rb => rb.checked);

    console.log("validateVaccination - vaccinationRadios:", vaccinationRadios);
    console.log("validateVaccination - specifyVaccinationRadio:", specifyVaccinationRadio);
    console.log("validateVaccination - vaccinationInput:", vaccinationInput);

    // Ensure all required elements are present
    if (!isChecked) {
        showError('vaccination', 'Please specify your vaccination status.');
    } else if (specifyVaccinationRadio && specifyVaccinationRadio.checked && vaccinationInput && !vaccinationInput.value) {
        showError('vaccination', 'Please specify the vaccinations.');
    } else {
        hideAllErrors('vaccination');
    }
}

function validateInsurance() {
    const insuranceRadios = document.getElementsByName('insurance');
    const specifyInsuranceRadio = document.querySelector('input[name="insurance"][value="1"]');
    const insuranceInput = document.querySelector('input[name="insurance_text"]');
    const isChecked = Array.from(insuranceRadios).some(rb => rb.checked);

    console.log("validateInsurance - insuranceRadios:", insuranceRadios);
    console.log("validateInsurance - specifyInsuranceRadio:", specifyInsuranceRadio);
    console.log("validateInsurance - insuranceInput:", insuranceInput);

    // Ensure all required elements are present
    if (!isChecked) {
        showError('insurance', 'Please specify your insurance status.');
    } else if (specifyInsuranceRadio && specifyInsuranceRadio.checked && insuranceInput && !insuranceInput.value) {
        showError('insurance', 'Please specify your insurance policy number.');
    } else {
        hideAllErrors('insurance');
    }
}

const vaccinationRadios = document.getElementsByName('vaccination');
const insuranceRadios = document.getElementsByName('insurance');
const vaccinationText = document.getElementById('vaccination_text');
const insuranceText = document.getElementById('insurance_text');
// Function to toggle display of vaccination text field
function toggleVaccinationText() {
    if (document.querySelector('input[name="vaccination"]:checked').value === '1') {
        vaccinationText.style.display = 'block';
    } else {
        vaccinationText.style.display = 'none';
        vaccinationText.value = ''; // Clear input if hidden
    }
}

// Function to toggle display of insurance text field
function toggleInsuranceText() {
    if (document.querySelector('input[name="insurance"]:checked').value === '1') {
        insuranceText.style.display = 'block';
    } else {
        insuranceText.style.display = 'none';
        insuranceText.value = ''; // Clear input if hidden
    }
}

// Attach event listeners to vaccination radio buttons
vaccinationRadios.forEach(radio => {
    radio.addEventListener('change', toggleVaccinationText);
});

// Attach event listeners to insurance radio buttons
insuranceRadios.forEach(radio => {
    radio.addEventListener('change', toggleInsuranceText);
});
//Setting today's date to the header element    
let today = new Date()
		datestring = today.toDateString();
		document.getElementById("date").innerHTML = 'Today is: ' +datestring;
});
