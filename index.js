//main fuction starts
function main() {
    displayPosts();
    addNewPostListeners();
}

//function to get all posts from the API and show them
function displayPosts() {
    //fetch to get data
    fetch("http://localhost:3000/posts")
    .then(function(response) {
        return response.json();
    })
    .then(function(posts) {
        console.log("Got posts:",posts);

        const postListDiv = document.getElementById('post-list');
        postListDiv.innerHTML = '';//clear existing posts
        
        //Loop through each post and create a clickable item
        for (let i = 0; i<posts.length; i++) {
        const post = posts[i];
        const postItem = document.createElement('div');
        postItem.className = 'post-item';
        postItem.textContent = post.title;
        
        //Add clickk event to show post details
        postItem.addEventListener('click', function(){
            handlePostClick(post.id);
        });

        postListDiv.appendChild(postItem);
        }
    })
    .catch(function(error) {
        console.error("Error getting posts:", error);
        document.getElementById('post-list').innerHTML = '<p>Error loading posts</p>';

    });
} 

//Function to show details of a specific post
function handlePostClick(postId) {
    console.log("CLicked on post ID:" , postId);

    fetch('http://localhost:3000/posts/' +)
}