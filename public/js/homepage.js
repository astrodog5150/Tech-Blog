const viewPost = async (event) => {
    event.preventDefault()

    const id = event.target.id

    document.location.replace(`/viewpost/${id}`);
}

[...document.querySelectorAll(".home-post")].forEach(button => 
    button.addEventListener("click", viewPost))