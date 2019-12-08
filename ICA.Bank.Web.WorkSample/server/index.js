const Joi = require("@hapi/joi");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const posts = [
  {
    id: 1,
    heading: "post 1",
    text: "This is a blogpost"
  },
  {
    id: 2,
    heading: "post 2",
    text: "This is also blogpost"
  }
];

// app.get("/", (req, res) => {
//   res.send("Hello world");
// });

app.get("/api/posts", (req, res) => {
  res.send(posts);
});

app.post("/api/posts", (req, res) => {
  const schema = Joi.object().keys({
    heading: Joi.string()
      .min(3)
      .max(50)
      .required()
  });
  const result = schema.validate(req.body);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  const post = {
    id: posts.length + 1,
    heading: req.body.heading,
    text: req.body.text
  };
  posts.push(post);
  res.send(post);
});

app.get("/api/posts/:id", (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) res.status(404).send("The post with the given ID was not found.");
  res.send(post);
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));
