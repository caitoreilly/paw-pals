// New Post Form Handler
async function newFormHandler(event) {
    event.preventDefault();
    // Will defer to Caitlyn's naming conventions for query selectors for adding post handlebars, if applicable
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

  // Will defer to Caitlyn's naming conventions for query selectors for adding post handlebars, if applicable
  // Event Listener for the new post submit button
  document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);