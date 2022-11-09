// Sign up form handler
async function signupFormHandler(event) {
    event.preventDefault();
    const username = document.querySelector('input[name="username"]').value.trim();
    const userEmail = document.querySelector('input[name="email"]').value.trim();
    const password = document.querySelector('input[name="password"]').value.trim();
    const dogName = document.querySelector('input[name="name"]').value.trim();
    const dogAge = document.querySelector('input[name="age"]').value;
    const userBorough = document.querySelector('input[name="borough"]').value;
    const userAvailable = document.querySelector('input[name="availability"]').value;
    const dogBreed = document.querySelector('input[name="breed"]').value;
    const dogActivity = document.querySelector('input[name="activity"]').value;

    if (username && userEmail && password) {
        console.log("okay!");
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                userEmail,
                password,
                dogName,
                dogAge,
                userBorough,
                userAvailable,
                dogBreed,
                dogActivity
            }),
            headers: {'Content-Type': 'application/json'}
    });
        if (response.ok) {
            alert('Account created! Click okay to log in.');
            document.location.replace('/login');
        } else {
            alert(response.statusText)
        }
    }
}

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
