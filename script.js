//Get current date and time using Javascript
		let today = new Date()
		datestring = today.toDateString();
		document.getElementById("date").innerHTML = 'Today is: ' +datestring;

		//Setting max value for date of birth to today. Source: https://stackoverflow.com/questions/32378590/set-date-input-fields-max-date-to-today
		var dd = today.getDate();
		var mm = today.getMonth() + 1;
		var yyyy = today.getFullYear();
		
		if (dd < 10) {
			dd = '0' + dd;
		}

		if (mm < 10) {
			mm = '0' + mm;
		} 

		today = yyyy + '-' + mm + '-' + dd;
		document.getElementById("dob").setAttribute("max", today);

		//SSN input with autoformatting. Checked for blogs, stackexchange for similar implementation. Used similar code structure
		//https://stackoverflow.com/questions/25367230/masking-a-social-security-number-input
		const ssnInput = document.getElementById('ssn');
    	ssnInput.addEventListener('input', function(e) {
        	let value = e.target.value.replace(/\D/g, ''); // Remove all non-digit characters. 
        		if (value.length > 3 && value.length <= 5) {
            	value = value.replace(/^(\d{3})(\d+)/, '$1-$2');
        } else if (value.length > 5) {
            value = value.replace(/^(\d{3})(\d{2})(\d+)/, '$1-$2-$3');
        }
        e.target.value = value;
    });

    	//Zip input with autoformatting. Similar to code for SSN above.
		const zipInput = document.getElementById('zip');
    	zipInput.addEventListener('input', function(e) {
        	let value = e.target.value.replace(/\D/g, ''); // Remove all non-digit characters. 
        		if (value.length > 5 && value.length <= 10) {
            	value = value.replace(/^(\d{5})(\d+)/, '$1-$2');
        } 
        e.target.value = value;
    });

    	//Phone number input with autoformatting. Similar to code for SSN above.
		const phoneInput = document.getElementById('phone1');
    	phoneInput.addEventListener('input', function(e) {
        	let value = e.target.value.replace(/\D/g, ''); // Remove all non-digit characters. 
        		if (value.length > 3 && value.length <= 6) {
			    value = value.replace(/^(\d{3})(\d+)/, '$1-$2');
			} else if (value.length > 6) {
			    value = value.replace(/^(\d{3})(\d{3})(\d+)/, '$1-$2-$3');
			}
        e.target.value = value;
    });

//Slider value updated on page
const slider = document.getElementById('feeling_today');
const sliderDisplay = document.getElementById('sliderDisplay');

// Update the display when the slider changes
slider.addEventListener('input', function() {
    sliderDisplay.textContent = slider.value;
});

//Validation checks
function validation() {
	console.log('this is validation fn.');
	let validation_check = true;

	function hideAllErrors() {
        let errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(el => el.style.display = 'none');
    }

    // Start fresh: hide all error messages
    hideAllErrors();

	//Checks for firstname, lastname

	//Define the regex for FirstName and LastName
	let regexFN = /^[A-Za-z'-]*$/;
	let regex = /^[A-Za-z'-]*[2-5]?[A-Za-z'-]*$/;

	let inputFN = document.getElementById('firstname').value
	//Get the html element to display the error message
	let errorMessage_fn = document.getElementById('error-message-fn');
	let errorMessage_fn_reqd = document.getElementById('error-message-fn-reqd');

	// Check if mandatory input is not null
    if (document.getElementById('firstname').hasAttribute('required') && !inputFN){
    	errorMessage_fn_reqd.style.display = 'inline'; // Show error message
    	validation_check = false;
    //Check regex
    }else if (!regexFN.test(inputFN)) {
      event.preventDefault(); 
      errorMessage_fn.style.display = 'inline'; // Show error message
      validation_check = false;
    } else {
      errorMessage_fn.style.display = 'none'; // Hide error message
    }

	let regexMid = /^[a-zA-Z]?$/;     
    let inputMid = document.getElementById('middleinit').value
	//Get the html element to display the error message
	let errorMessage_mi = document.getElementById('error-message-mi');
    if (!regex.test(inputMid)) {
      event.preventDefault(); 
      errorMessage_mi.style.display = 'inline'; // Show error message
      validation_check = false;
    } else {
      errorMessage_mi.style.display = 'none'; // Hide error message
    }


    let inputLN = document.getElementById('lastname').value;
    //Get the html element to display the error message
    let errorMessage_ln = document.getElementById('error-message-ln');
    let errorMessage_ln_reqd = document.getElementById('error-message-ln-reqd');
    if (document.getElementById('lastname').hasAttribute('required') && !inputLN){
    	errorMessage_ln_reqd.style.display = 'inline';
    	validation_check = false;
    // Check if the input matches the regex
    }else if (!regex.test(inputLN)) {
      event.preventDefault(); 
      errorMessage_ln.style.display = 'inline'; // Show error message
      validation_check = false;
    } else {
      errorMessage_ln.style.display = 'none'; // Hide error message
    }

    //validation for date
    let inputDate = document.getElementById('dob').value;
    let errorMessage_dob = document.getElementById('error-message-dob');
	let errorMessage_dob_reqd = document.getElementById('error-message-dob-reqd');
    if (document.getElementById('dob').hasAttribute('required') && !inputDate){
    	errorMessage_dob_reqd.style.display = 'inline';
    	validation_check = false;
    // Check if the input matches the regex
    }else if (inputDate > today) {
      event.preventDefault(); 
      errorMessage_dob.style.display = 'inline'; // Show error message
      validation_check = false;
    } else {
      errorMessage_dob.style.display = 'none'; // Hide error message
    }

    //validation for SSN
    let inputSSN = document.getElementById('ssn').value.trim();
	// Get the HTML element to display the error message
	let errorMessage_ssn_reqd = document.getElementById('error-message-ssn-reqd');
	let errorMessage_ssn = document.getElementById('error-message-ssn'); // Add another error message for invalid SSN

	// Regular expression for valid SSN: XXX-XX-XXXX
	let regexSSN = /^\d{3}-\d{2}-\d{4}$/;
	let ssnCheck = true;
	// Check if the SSN field is required and empty
	if (document.getElementById('ssn').hasAttribute('required') && !inputSSN) {
	    errorMessage_ssn_reqd.style.display = 'inline';
	    errorMessage_ssn.style.display = 'none'; // Hide invalid message if empty
	    validation_check = false;
	} else if (!regexSSN.test(inputSSN)) {
	    // Check if the input matches the regex for a valid SSN
	    errorMessage_ssn.style.display = 'inline'; // Show error message for invalid format
	    errorMessage_ssn_reqd.style.display = 'none'; // Hide required field message
	    ssnCheck = false;
	    validation_check = false;
	} else {
	    // Hide both error messages if the input is valid
	    errorMessage_ssn_reqd.style.display = 'none';
	    errorMessage_ssn.style.display = 'none';
	}

	document.getElementById('ssn_').innerHTML = ssnCheck ? "Valid SSN" : "SSN Invalid";
	document.getElementById('ssn_').classList.add(ssnCheck ? 'valid': 'invalid');

    //validation for address
    regexAddr1 = /^[#.0-9a-zA-Z\s,-]+$/;
    let inputAddr1 = document.getElementById('addr1').value;
    //Get the html element to display the error message
    let errorMessage_addr1 = document.getElementById('error-message-addr1');
    let errorMessage_addr1_reqd = document.getElementById('error-message-addr1-reqd');
    if (document.getElementById('addr1').hasAttribute('required') && !inputAddr1){
    	errorMessage_addr1_reqd.style.display = 'inline';
    	validation_check = false;
    // Check if the input matches the regex
    }else if (!regexAddr1.test(inputAddr1)) {
      event.preventDefault(); 
      errorMessage_addr1.style.display = 'inline'; // Show error message
      validation_check = false;
    } else {
      errorMessage_addr1.style.display = 'none'; // Hide error message
    }

	//validation for City    
    let inputCity = document.getElementById('city').value;
    //Get the html element to display the error message
    let errorMessage_city = document.getElementById('error-message-city');
    let errorMessage_city_reqd = document.getElementById('error-message-city-reqd');
    if (document.getElementById('city').hasAttribute('required') && !inputCity){
    	errorMessage_city_reqd.style.display = 'inline';
    	validation_check = false;
    // Check if the input matches the regex
    }else if (!regexAddr1.test(inputCity)) {
      event.preventDefault(); 
      errorMessage_city.style.display = 'inline'; // Show error message
      validation_check = false;
    } else {
      errorMessage_city.style.display = 'none'; // Hide error message
    }

    //validation for State
    let inputState = document.getElementById('state').value;
    //Get the html element to display the error message
    let errorMessage_state_reqd = document.getElementById('error-message-state-reqd');
    if (document.getElementById('state').hasAttribute('required') && !inputState){
    	errorMessage_state_reqd.style.display = 'inline';
    	validation_check = false;
    // Check if the input matches the regex
    } else {
      errorMessage_state_reqd.style.display = 'none'; // Hide error message
    }

    //validation for zip
    let inputZip = document.getElementById('zip').value;
    //Get the html element to display the error message
    let errorMessage_zip_reqd = document.getElementById('error-message-zip-reqd');
    if (document.getElementById('zip').hasAttribute('required') && !inputZip){
    	errorMessage_zip_reqd.style.display = 'inline';
    	validation_check = false;
    // Check if the input matches the regex
    } else {
      errorMessage_zip_reqd.style.display = 'none'; // Hide error message
    }

    //validation for email
    let regex_email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    //https://stackoverflow.com/questions/201323/how-can-i-validate-an-email-address-using-a-regular-expression
    let inputEmail = document.getElementById('email').value;
    let errorMessage_email = document.getElementById('error-message-email');
	// Check if the input matches the regex
    if (!regex_email.test(inputEmail)) {
      event.preventDefault(); 
      errorMessage_email.style.display = 'inline'; // Show error message
      validation_check = false;
    } else {
      errorMessage_email.style.display = 'none'; // Hide error message
    }

    //validation for phone
    let regex_phone = /^(\+1\s?)?(\([0-9]{3}\)|[0-9]{3})?[-.\s]?[0-9]{3}?[-.\s]?[0-9]{4}?$/;
    let inputPhone = document.getElementById('phone1').value;
    let errorMessage_phone1 = document.getElementById('error-message-phone1');
	// Check if the input matches the regex
    if (!regex_phone.test(inputPhone)) {
      event.preventDefault(); 
      errorMessage_phone1.style.display = 'inline'; // Show error message
      validation_check = false;
    } else {
      errorMessage_phone1.style.display = 'none'; // Hide error message
    }

    //Checkbox validation
    let diseases = document.getElementsByName('diseases');
    let errorMessage_diseases_reqd = document.getElementById('error-message-diseases-reqd');
    let isDiseasesChecked = false;
    for (let i = 0; i < diseases.length; i++) {
        if (diseases[i].checked) {
            isDiseasesChecked = true;
        }
    }

    if (!isDiseasesChecked) {
        errorMessage_diseases_reqd.style.display = 'inline';
        validation_check = false;
    } else {
        errorMessage_diseases_reqd.style.display = 'none';
    }

    // Radio Button Validation
    const gender = document.getElementsByName('gender');
    const errorMessage_gender_reqd = document.getElementById('error-message-gender-reqd');
    let isGenderChecked = false;

    // Loop through radio buttons to check if any is selected
    for (let i = 0; i < gender.length; i++) {
        if (gender[i].checked) {
            isGenderChecked = true;
            break;
        }
    }

    if (!isGenderChecked) {
        errorMessage_gender_reqd.style.display = 'inline';
        validation_check = false;
    } else {
        errorMessage_gender_reqd.style.display = 'none';
    }


    const vaccination = document.getElementsByName('vaccination');
    const errorMessage_vaccination_reqd = document.getElementById('error-message-vaccination-reqd');
    let isVaccChecked = false;

    // Loop through radio buttons to check if any is selected
    for (let i = 0; i < vaccination.length; i++) {
        if (vaccination[i].checked) {
            isVaccChecked = true;
        }
    }

    if (!isVaccChecked) {
        errorMessage_vaccination_reqd.style.display = 'inline';
        validation_check = false;
    } else {
        errorMessage_vaccination_reqd.style.display = 'none';
    }

    const insurance = document.getElementsByName('insurance');
    const errorMessage_insurance_reqd = document.getElementById('error-message-insurance-reqd');
    let isInsChecked = false;

    // Loop through radio buttons to check if any is selected
    for (let i = 0; i < insurance.length; i++) {
        if (insurance[i].checked) {
            isInsChecked = true;
            break;
        }
    }

    if (!isInsChecked) {
        errorMessage_insurance_reqd.style.display = 'inline';
        validation_check = false;
    } else {
        errorMessage_insurance_reqd.style.display = 'none';
    }

    //Validations for userid
    let regex_userid = /^[a-zA-Z][a-zA-Z0-9_-]{4,29}$/;
    let inputUserid = document.getElementById('userid').value;
    //Get the html element to display the error message
    let errorMessage_userid = document.getElementById('error-message-userid');
    let errorMessage_userid_reqd = document.getElementById('error-message-userid-reqd');
    if (document.getElementById('userid').hasAttribute('required') && !inputUserid){
    	errorMessage_userid_reqd.style.display = 'inline';
    	validation_check = false;
    // Check if the input matches the regex
    } else if (!regex_userid.test(inputUserid)) {
      event.preventDefault(); 
      errorMessage_userid.style.display = 'inline'; // Show error message
      validation_check = false;
    }else{
      errorMessage_userid.style.display = 'none'; // Hide error message
    }

    //Validations for password
    //Check for allowed characters
    let regex_pwd = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;"'<>,.?~\\/-]).{8,30}$/;
    let inputPwd = document.getElementById('password').value;
    //Get the html element to display the error message
    let errorMessage_pwd = document.getElementById('error-message-pwd');
    let errorMessage_pwd_reqd = document.getElementById('error-message-pwd-reqd');
    if (document.getElementById('password').hasAttribute('required') && !inputPwd){
    	errorMessage_pwd_reqd.style.display = 'inline';
    	validation_check = false;
    // Check if the input matches the regex
    } else if (!regex_pwd.test(inputPwd)) {
      event.preventDefault(); 
      errorMessage_pwd.style.display = 'inline'; // Show error message
      validation_check = false;
    }else{
      errorMessage_pwd.style.display = 'none'; // Hide error message
    }

    //check for password and re-entered password matches. Also checks for is password contains userid
    let password = document.getElementById('password').value.trim();
	let re_password = document.getElementById('re_password').value.trim();
	let userid_ = document.getElementById('userid').value.toString().trim(); 

	// Check if passwords match or if the password contains part of the userid
	let errorMessage_passmatch = document.getElementById('error-message-passmatch');
	let errorMessage_uidpwd = document.getElementById('error-message-uidpwd');
	let passwordMessage = document.getElementById('password_');

	// Validation check for matching passwords
	if (password !== re_password) {
	    errorMessage_passmatch.style.display = 'inline';
	    passwordMessage.innerHTML = "Passwords do not match";
	    passwordMessage.style.color = "red"; // Color for no match
	    validation_check = false;
	} else {
	    errorMessage_passmatch.style.display = 'none';
	    passwordMessage.innerHTML = "Passwords match";
	    passwordMessage.style.color = "green"; // Color for match
	}

	// Validation check for password containing userid
	if (password.toLowerCase() === userid_.toLowerCase() || password.toLowerCase().includes(userid_.toLowerCase())) {
	    errorMessage_uidpwd.style.display = 'inline';
	} else {
	    errorMessage_uidpwd.style.display = 'none';
	}

    return validation_check;
  };


//Review function will grab the info from the form and show them to the user for review
function review(){
	console.log('this is review fn.');
		const firstname = document.getElementById('firstname').value;
		const middleinit = document.getElementById('middleinit').value;
		const lastname = document.getElementById('lastname').value;
		const dateofbirth = document.getElementById('dob').value;
		const ssn = document.getElementById('ssn').value;
		const addr1 = document.getElementById('addr1').value;
		const addr2 = document.getElementById('addr2').value;
		const city = document.getElementById('city').value;
		const state = document.getElementById('state').value;
		const zip = document.getElementById('zip').value.substring(0,5);
		const phone1 = document.getElementById('phone1').value;
		const email = document.getElementById('email').value;
		const gender_ = document.querySelector('input[name="gender"]:checked') ? document.querySelector('input[name="gender"]:checked').value : null;
		const vaccination_ = document.querySelector('input[name="vaccination"]:checked') ? document.querySelector('input[name="vaccination"]:checked').value : null;
		const insurance_ = document.querySelector('input[name="insurance"]:checked') ? document.querySelector('input[name="insurance"]:checked').value : null;
		const userid = document.getElementById('userid').value;

		//getting all values in checkbox
		let diseases_ = [];
		let checkboxes = document.querySelectorAll('input[type=checkbox]:checked')
		for (let i = 0; i < checkboxes.length; i++) {
		  diseases_.push(checkboxes[i].value)
		}

		if (validation() == true){
			document.getElementById('reviewInfo').style.display = 'block';
			document.getElementById('firstname_').innerHTML = firstname;
			document.getElementById('middleinit_').innerHTML =middleinit;
			document.getElementById('lastname_').innerHTML = lastname;
			document.getElementById('dob_').innerHTML = dateofbirth;
			document.getElementById('addr1_').innerHTML =addr1;
			document.getElementById('addr2_').innerHTML =addr2;
			document.getElementById('city_').innerHTML =city;
			document.getElementById('state_').innerHTML = state;
			document.getElementById('zip_').innerHTML = zip;
			document.getElementById('email_').innerHTML = email;
			document.getElementById('phone1_').innerHTML = phone1;
			document.getElementById('diseases_').innerHTML = diseases_.join(", ");
			document.getElementById('gender_').innerHTML = gender_;
			document.getElementById('vaccination_').innerHTML = !!Number(vaccination_) ? "Yes" : "No";
			document.getElementById('insurance_').innerHTML = !!Number(insurance_) ? "Yes" : "No";
			document.getElementById('userid_').innerHTML = userid.toLowerCase();
			document.getElementById('feeling_today_').innerHTML = slider.value;
	}
}

//password validation on the fly
document.getElementById('password').addEventListener('input', function() {
    const password = this.value;

    // Regex patterns
    const hasUppercase = /[A-Z]/;
    const hasNumber = /\d/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
    const minLength = 8;
    const maxLength = 30;

    // Check for uppercase letters
    if (hasUppercase.test(password)) {
        document.getElementById('uppercase').classList.add('valid');
        document.getElementById('uppercase').classList.remove('invalid');
    } else {
        document.getElementById('uppercase').classList.add('invalid');
        document.getElementById('uppercase').classList.remove('valid');
    }

    // Check for numbers
    if (hasNumber.test(password)) {
        document.getElementById('number').classList.add('valid');
        document.getElementById('number').classList.remove('invalid');
    } else {
        document.getElementById('number').classList.add('invalid');
        document.getElementById('number').classList.remove('valid');
    }

    // Check for special characters
    if (hasSpecialChar.test(password)) {
        document.getElementById('special-char').classList.add('valid');
        document.getElementById('special-char').classList.remove('invalid');
    } else {
        document.getElementById('special-char').classList.add('invalid');
        document.getElementById('special-char').classList.remove('valid');
    }

    // Check for length
    if (password.length >= minLength && password.length <= maxLength) {
        document.getElementById('length').classList.add('valid');
        document.getElementById('length').classList.remove('invalid');
    } else {
        document.getElementById('length').classList.add('invalid');
        document.getElementById('length').classList.remove('valid');
    }
});

function focusEdit() {
	const targetID = event.target.closest('p').querySelector('span').id;
	const focusID = targetID.slice(0,-1);
	console.log(focusID);
	document.getElementById(focusID).focus();
}

    

