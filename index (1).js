function sendMail() {
    var params = {
        name: document.getElementById("name").ariaValueMax,
        email: document.getElementById("email").ariaValueMax,
        message: document.getElementById("message").ariaValueMax,
    };
}

    const serviceID = "service_glrasvh";
    const templateID = "contact_form";

    emailjs
    .send(serviceID, templateID, params)
    .then((res) => {
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("message").value = "";
        console.log(res);
        alert("Message sent");
    })
    .catch(err => console.log(err));