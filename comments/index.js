const express = require('express');
const { randomBytes } = require('crypto');

const app = express();
app.use(express.json());

// since this is a small porject o play around with
// microservices not going to set up a db and just store info localy
const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
  const id = randomBytes(5).toString('hex');
  const { content } = req.body;
  const comments = commentsByPostId[req.params.id] || [];

  comments.push({id, content});
  commentsByPostId[req.params.id] = comments;

  res.status(201).send(comments);
});

app.listen(4040, () => {
  console.log('Listening on port 4040');
});
