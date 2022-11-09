// A function to edit a post
async function editFormHandler(event) {
    event.preventDefault();
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
 // Will defer to Caitlyn's naming conventions for query selectors for updating post handlebars, if applicable
    const postTitle = document.querySelector('input[name="post-title"]').value;
    const postDescription = document.querySelector('input[name="post-text"]').value;
    const postLocation = document.querySelector('input[name="post-loc"]').value;
    const postAvailable = document.querySelector('input[name="post-available"]').value;

    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
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
  // Will defer to Caitlyn's naming conventions for query selectors for updating post handlebars, if applicable
  document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);