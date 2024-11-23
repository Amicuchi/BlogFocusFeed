const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const auth = require('../middleware/auth');

// Get all posts
router.get('/', async (req, res) => {
    try {
      const posts = await Post.find().sort({ date: -1 });
      res.json({ posts });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching posts' });
    }
  });
  
  // Get single post
  router.get('/:id', async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching post' });
    }
  });
  
  // Create post (protected route)
  router.post('/', auth, async (req, res) => {
    try {
      const post = new Post(req.body);
      await post.save();
      res.status(201).json(post);
    } catch (error) {
      res.status(400).json({ error: 'Error creating post' });
    }
  });
  
  // Update post (protected route)
  router.put('/:id', auth, async (req, res) => {
    try {
      const post = await Post.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.json(post);
    } catch (error) {
      res.status(400).json({ error: 'Error updating post' });
    }
  });
  
  // Delete post (protected route)
  router.delete('/:id', auth, async (req, res) => {
    try {
      const post = await Post.findByIdAndDelete(req.params.id);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.json({ message: 'Post deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting post' });
    }
  });
  
  module.exports = router;