const GOOGLE_APPS_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbyQbISeN4QYL4LQYPkxbAT0Fiw5OZpa3nrhdeCM-nn5-84DpRf-JWB3uAuBdx-h9B9tCA/exec";


const contactForm =
    document.getElementById("contact-form");



contactForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        const button =
            document.getElementById("send-button");


        const gender =
            document.querySelector(
                'input[name="gender"]:checked'
            );


        const firstTime =
            document.querySelector(
                'input[name="first-time"]:checked'
            );
            
        if (!gender) {

            alert(
                "Please select your gender."
            );

            return;
        }


        if (!firstTime) {

            alert(
                "Please select YES or NO for First Time."
            );

            return;
        }


        // =================================================
        // COLLECT FORM DATA
        // =================================================

        const params = {

            name:
                document
                    .getElementById("name")
                    .value
                    .trim(),

            email:
                document
                    .getElementById("email")
                    .value
                    .trim(),

            number:
                document
                    .getElementById("phone-number")
                    .value
                    .trim(),

            address:
                document
                    .getElementById("address")
                    .value
                    .trim(),

            occupation:
                document
                    .getElementById("occupation")
                    .value
                    .trim(),

            gender:
                gender.value,

            first_time:
                firstTime.value,

            message:
                document
                    .getElementById("textarea")
                    .value
                    .trim()

        };


        console.log(
            "Registration data:",
            params
        );


        // =================================================
        // DISABLE BUTTON
        // =================================================

        button.disabled = true;

        button.textContent =
            "Registering...";


        try {


            // =================================================
            // 1. SEND TO GOOGLE SHEETS
            // =================================================

            const googleSheetResponse =
                await fetch(
                    GOOGLE_APPS_SCRIPT_URL,
                    {

                        method: "POST",

                        body:
                            JSON.stringify(params)

                    }
                );


            // =================================================
            // READ GOOGLE RESPONSE
            // =================================================

            const responseText =
                await googleSheetResponse.text();


            console.log(
                "Google Sheets raw response:",
                responseText
            );


            const result =
                JSON.parse(responseText);


            console.log(
                "Google Sheets result:",
                result
            );


            // =================================================
            // CHECK DUPLICATE
            // =================================================

            if (result.duplicate) {

                alert(
                    "This email address has already been registered."
                );

                return;
            }


            // =================================================
            // CHECK GOOGLE SHEETS ERROR
            // =================================================

            if (!result.success) {

                console.error(
                    "Google Sheets error:",
                    result.message
                );


                alert(
                    "Registration could not be completed.\n\n" +
                    result.message
                );

                return;
            }


            // =================================================
            // GET REGISTRATION NUMBER
            // =================================================

            const registrationNumber =
                result.registrationNumber;


            console.log(
                "Registration Number:",
                registrationNumber
            );


            // =================================================
            // 2. SEND ADMIN EMAIL THROUGH EMAILJS
            // =================================================

            const emailResult =
                await emailjs.send(

                    "service_o9kv3ir",

                    "template_82ewad3",

                    {

                        ...params,

                        registration_number:
                            registrationNumber

                    }

                );


            console.log(
                "EmailJS success:",
                emailResult
            );


            // =================================================
            // SUCCESS
            // =================================================

            alert(

                "Registration submitted successfully!\n\n" +

                "Your Registration Number is:\n" +

                registrationNumber

            );


            // =================================================
            // RESET FORM
            // =================================================

            contactForm.reset();


        } catch (error) {

            console.error(
                "Registration error:",
                error
            );


            alert(

                "Something went wrong while submitting your registration.\n\n" +

                "Please try again."

            );

        }


        // =================================================
        // ENABLE BUTTON
        // =================================================

        button.disabled = false;

        button.textContent =
            "Send Message";

    }
);