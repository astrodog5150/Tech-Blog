const createPost = () => {
    document.location.replace('/createpost')
  }

const updatePost = async (event) => {
  document.location.replace(`/updatepost/${event.target.id}`)
}
  
[...document.querySelectorAll('.post')].forEach(button => 
  button.addEventListener('click', updatePost))
  
document
  .querySelector('.new-post')
  .addEventListener('click', createPost);