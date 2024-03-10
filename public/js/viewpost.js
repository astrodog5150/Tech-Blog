const addComment = () => {
    document.getElementById('comment-form').style.display = "block"
}

const commentFormHandler = async (event) => {
    event.preventDefault()

    const comment = document.getElementById('comment').value
    const id = document.getElementsByClassName('home-post-header')[0].id
    console.log(id)
    
    if (comment) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ comment, id }),
            headers: { 'Content-Type': 'application/json' }
        })

        if (response) {
            window.location.reload()
        } else {
            alert(response.statusText)
        }
    }
}

document
    .getElementById('add-comment')
    .addEventListener('click', addComment)

document
    .getElementById("comment-submit")
    .addEventListener("click", commentFormHandler)