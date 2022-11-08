// Login form handler
async function loginFormHandler(event) {
    event.preventDefault();
    const userEmail = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    if (userEmail && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                userEmail,
                password
            }),
            headers: {'Content-Type': 'application/json'}
        });
        if (response.ok) {
            console.log("okay");
            document.location.replace('/dashboard');
        } else {
            console.log("not okay.");
            let result = await response.json()
            alert(result.message)
        }
    }
}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);