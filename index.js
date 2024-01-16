function sendMail() {
    var params = {
        name: document.getElementById("name").ariaValueMax,
        email: document.getElementById("email").ariaValueMax,
        message: document.getElementById("message").ariaValueMax,
    };
}

    const serviceID = "service_8e2s3vi";
    const templateID = "template_j3m5r7p";

    emailjs.send(serviceID, templateID, params).then((res) => {
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("message").value = "";
        console.log(res);
        alert("Message sent");
    })

    .catch(err => console.log(err))
;