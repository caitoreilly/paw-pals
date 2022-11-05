// Sign up form handler
async function signupFormHandler(event) {
    event.preventDefault();
    const username = document.querySelector('#username-signup').value.trim();
    const userEmail = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const dogName = document.querySelector('input[name="dog-name"]').value.trim();
    const dogAge = document.querySelector('input[name="dog-age"]').value;
    const userAge = document.querySelector('input[name="user-age"]').value;
    const userBorough = document.querySelector('input[name="borough"]:checked').value;
    const userAvailable = document.querySelector('input[name="availability"]:checked').value;
    const dogBreed = document.querySelector('input[name="breed"]:checked').value;
    const dogActivity = document.querySelector('input[name="activity"]:checked').value;

    if (username && email && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                userEmail,
                password,
                dogName,
                dogAge,
                userAge,
                userBorough,
                userAvailable,
                dogBreed,
                dogActivity
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