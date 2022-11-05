// Sign up form handler
async function signupFormHandler(event) {
    event.preventDefault();
    // WILL DEFER TO CAITLIN'S HANDLEBAR NAMING CONVENTION FOR querySelectors
    const username = document.querySelector('#username-signup').value.trim();
    const userEmail = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && email && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                userEmail,
                password
            }),
            headers: {'Content-Type': 'application/json'}
    });
        if (response.ok) {
            alert('Account created! Click okay to log in.');
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText)
        }
    }
}

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);