// A function to edit a post
async function editFormHandler(event) {
    event.preventDefault();
    const postID = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
 // WILL DEFER TO CAITLIN'S HANDLEBAR NAMING CONVENTION FOR querySelectors
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
  // WILL DEFER TO CAITLIN'S HANDLEBAR NAMING CONVENTION FOR querySelectors
  document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);