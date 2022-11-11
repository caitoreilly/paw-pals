// A function to edit a post
async function editFormHandler(event) {
    event.preventDefault();
    // Will defer to Caitlyn's naming conventions for query selectors for updating user handlebars, if applicable
    // Username
    let username = document.querySelector('input[name="username"]').value.trim();
    if(username.length) username = '"username": "' + username + '"';
    // Email
    let userEmail = document.querySelector('input[name="email"]').value.trim();
    if(userEmail.length) userEmail = '"email": "' + userEmail + '"';
    // Password
    let password = document.querySelector('input[name="password"]').value.trim();
    if (!password.length) {
        alert('You must enter your current password to confirm changes or enter a new password.');
        return
    } else {
        password = '"password": "' + password + '"';
    }
    // Dog Name
    let dogName = document.querySelector('input[name="dog-name"]').value.trim();
    if(dogName.length) dogName = '"dog name": "' + dogName + '"';
    // Dog Age
    let dogAge = document.querySelector('input[name="dog-age"]').value;
    if(dogAge.isInteger) dogAge = '"dog age": "' + dogAge + '"';
    // User Age
    let userAge = document.querySelector('input[name="user-age"]').value;
    if(userAge.isInteger) userAge = '"user age": "' + userAge + '"';

    // CHOICE QUERIES
    let userBorough = document.querySelector('input[name="borough"]:checked').value;
    let userAvailable = document.querySelector('input[name="availability"]:checked').value;
    let dogBreed = document.querySelector('input[name="breed"]:checked').value;
    let dogActivity = document.querySelector('input[name="dog-activity"]:checked').value;
    const ID = document.querySelector('input[name="user-id"]').value;


    let userUpdate = '{' + [username, userEmail, password, dogName, dogAge, userAge, userBorough, userAvailable, dogBreed, dogActivity].filter(value => value).join(',') + '}';
    userUpdate = JSON.parse(userUpdate)

    const response = await fetch(`/api/users/${ID}`, {
        method: 'PUT',
        body: JSON.stringify(userUpdate),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    if (response.ok) {
        document.location.replace('/dashboard');
        } else {
        alert(response.statusText);
        }
  }
  // Will defer to Caitlyn's naming conventions for query selectors for updating user handlebars, if applicable
  document.querySelector('.edit-user-form').addEventListener('submit', editFormHandler);