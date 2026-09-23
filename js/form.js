function sendMail(){
    let params = {
        name : document.getElementById("name").value,
        number : document.getElementById("phone-number").value,
        email : document.getElementById("email").value,
        message : document.getElementById("textarea").value,
    }

    emailjs.send("service_39encda", "template_78byqoh", params).then(
  (response) => {
    alert('SUCCESS!', response.status, response.text);
  },
  (error) => {
    alert('FAILED...', error.text);
  },
);
}