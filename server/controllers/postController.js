const Post = require('../models/Post');

// Create a new post
const createPost = async (req, res) => {
    try {
        const { title, content, author } = req.body;
        const newPost = new Post({
            title,
            content,
            author,
        });

    const savedPost = await newPost.save();
        res.status(201).json(savedPost);
}        
    catch (error) {
        res.status(500).json({ message: 'Error creating post', error });
}
};

// Get all posts
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
            res.status(200).json(posts);
} 
    catch (error) {
        res.status(500).json({ message: 'Error fetching posts', error });
}
};

// Get a single post by ID
const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
    }
        res.status(200).json(post);
} 
    catch (error) {
        res.status(500).json({ message: 'Error fetching post', error });
}
};

// Update a post by ID
const updatePost = async (req, res) => {
    try {
        const { title, content, author } = req.body;
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            { title, content, author },
            { new: true }
    );

    if (!updatedPost) {
        return res.status(404).json({ message: 'Post not found' });
    }

        res.status(200).json(updatedPost);
} 
    catch (error) {
        res.status(500).json({ message: 'Error updating post', error });
}
};

// Delete a post by ID
const deletePost = async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);

    if (!deletedPost) {
        return res.status(404).json({ message: 'Post not found' });
    }

        res.status(200).json({ message: 'Post deleted successfully' });
} 
    catch (error) {
        res.status(500).json({ message: 'Error deleting post', error });
}
};

module.exports = {createPost, getAllPosts, getPostById, updatePost, deletePost};
