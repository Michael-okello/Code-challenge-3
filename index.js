// Main function starts
function main() {
    displayPosts();
    addNewPostListeners();
}

// Function to get all posts from the API and show them
function displayPosts() {
    // Fetch to get data
    fetch("http://localhost:3000/posts")
    .then(function(response) {
        return response.json();
    })
    .then(function(posts) {
        console.log("Got posts:", posts);
        const postListDiv = document.getElementById('post-list');
        postListDiv.innerHTML = ''; // Clear existing posts
        
        // Loop through each post and create a clickable item
        for (let i = 0; i < posts.length; i++) {
            const post = posts[i];
            const postItem = document.createElement('div');
            postItem.className = 'post-item';
            postItem.textContent = post.title;
            
            // Add click event to show post details
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

// Function to show details of a specific post
function handlePostClick(postId) {
    console.log("Clicked on post ID:", postId);
    fetch('http://localhost:3000/posts/' + postId)
    .then(function(response) {
        return response.json();
    })
    .then(function(post) {
        console.log("Got post details:", post);
        const postDetailDiv = document.getElementById('post-detail');
        postDetailDiv.innerHTML = '<h3>' + post.title + '</h3>' +
            '<p><strong>Author:</strong> ' + post.author + '</p>' +
            '<div><strong>Content:</strong></div>' +
            '<p>' + post.content + '</p>';
    })
    .catch(function(error) {
        console.error("Error getting post details:", error);
        document.getElementById('post-detail').innerHTML = '<p>Error loading post details</p>';
    });
}

// Function to set up the form listener for adding new posts
function addNewPostListeners() {
    const form = document.getElementById('new-post-form');
    form.addEventListener('submit', function(event){
        event.preventDefault(); // Stop the form from submitting normally
        console.log("Form submitted!");
        
        // Get form data
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        const author = document.getElementById('author').value;
        
        console.log("New post data:", { title: title, content: content, author: author });
        
        // Create the new post object
        const newPost = {
            title: title,
            content: content,
            author: author
        };
        
        // For now, just add it to the list without saving to server
        // (The instructions say it doesn't need to persist)
        const postListDiv = document.getElementById('post-list');
        const postItem = document.createElement('div');
        postItem.className = 'post-item';
        postItem.textContent = newPost.title;
        
        // Add click event for the new post
        postItem.addEventListener('click', function() {
            // Show the new post details
            const postDetailDiv = document.getElementById('post-detail');
            postDetailDiv.innerHTML = '<h3>' + newPost.title + '</h3>' +
                '<p><strong>Author:</strong> ' + newPost.author + '</p>' +
                '<div><strong>Content:</strong></div>' +
                '<p>' + newPost.content + '</p>';
        });
        
        postListDiv.appendChild(postItem);
        
        // Clear the form
        form.reset();
        
        console.log("New post added to list!");
    });
}

// Wait for the page to load completely before starting
document.addEventListener('DOMContentLoaded', main);