document.querySelector('.pageclip-form').addEventListener('submit', function (e) {
    e.preventDefault();

    let form = e.target;
    let url = form.action;

    fetch(url, {
        method: 'POST',
        body: new FormData(form)
    })
        .then(response => {
            if (response.ok) {
                alert('Form submitted successfully!');
            } else {
                throw new Error('Form submission failed');
            }
        })
        .catch(error => {
            alert(error);
        });
});