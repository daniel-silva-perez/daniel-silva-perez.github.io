document.querySelector('.pageclip-form').addEventListener('submit', function(e) {
    e.preventDefault();

    let form = e.target;
    let url = form.action;

    fetch(url, {
        method: 'POST',
        body: new FormData(form)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response;
        })
        .then(response => {
            alert('Form submitted successfully!');
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            alert('There has been a problem with your fetch operation, see console for more details.');
        });
});