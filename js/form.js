function sendMail(event) {
    event.preventDefault();

    let params = {
    name: document.getElementById("name").value,
    number: document.getElementById("phone-number").value,
    email: document.getElementById("email").value,
    message: document.getElementById("textarea").value,
    time: new Date().toLocaleString(),
};

    emailjs.send(
        "service_o9kv3ir",
        "template_82ewad3",
        params
    )
    .then(
        (response) => {
            console.log("SUCCESS!", response.status, response.text);
            alert("Message sent successfully!");

            document.getElementById("contact-form").reset();
        },
        (error) => {
            console.error("FAILED...", error);
            alert("Message failed to send. Please try again.");
        }
    );
}