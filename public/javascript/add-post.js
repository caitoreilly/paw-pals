// New Post Form Handler
async function newFormHandler(event) {
    event.preventDefault();
    // WILL DEFER TO CAITLIN'S HANDLEBAR NAMING CONVENTION FOR querySelectors
    const postTitle = document.querySelector('input[name="post-title"]').value;
    const postDescription = document.querySelector('input[name="post-text"]').value;
    const postLocation = document.querySelector('input[name="post-loc"]').value;
    const postAvailable = document.querySelector('input[name="post-available"]').value;

    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        postTitle,
        postDescription,
        postLocation,
        postAvailable
      }),
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

  // Event Listener for the new post submit button
  document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);