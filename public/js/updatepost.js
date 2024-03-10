const updatePostFormHandler = async (event) => {
    event.preventDefault()

    const title = document.querySelector('#post-title').value.trim()
    const post = document.querySelector('#post-content').value.trim()
    const id = event.target.id

    if (title && post) {
        const response = await fetch('/api/posts', {
            method: 'PUT',
            body: JSON.stringify({ title, post, id }),
            headers: { 'Content-Type': 'application/json' },
        })

        if (response) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
}

const deletePost = async (event) => {
    event.preventDefault()

    const id = event.target.id

    const response = await fetch('/api/posts', {
        method: 'DELETE',
        body: JSON.stringify({ id }),
        headers: { 'Content-Type': 'application/json' },
    })

    if (response) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document
    .querySelector('.update')
    .addEventListener('click', updatePostFormHandler)

document
    .querySelector('.delete')
    .addEventListener('click', deletePost)