const Joi = require("@hapi/joi");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const posts = [
  {
    id: 1,
    heading: "Advanced CSS-Only HTML Form Styling",
    subheading:
      "HTML form inputs have always been notoriously difficult to style with CSS, but there are several little-used selectors that give us significant power to style inputs and surrounding elements. Some of these are relatively new, while others have been available for quite some time.",
    text:
      "HTML form inputs have always been notoriously difficult to style with CSS, but there are several little-used selectors that give us significant power to style inputs and surrounding elements. Some of these are relatively new, while others have been available for quite some time.",
    author: "Erik Wahlström",
    email: "erik@mail.com",
    timestamp: 1575967926045
  },
  {
    id: 2,
    heading: "Advanced CSS-Only HTML Form Styling",
    subheading:
      "HTML form inputs have always been notoriously difficult to style with CSS, but there are several little-used selectors that give us significant power to style inputs and surrounding elements. Some of these are relatively new, while others have been available for quite some time.",
    text:
      "HTML form inputs have always been notoriously difficult to style with CSS, but there are several little-used selectors that give us significant power to style inputs and surrounding elements. Some of these are relatively new, while others have been available for quite some time.",
    author: "Erik Wahlström",
    email: "erik@mail.com",
    timestamp: 1575967926045
  },
  {
    id: 3,
    heading: "Advanced CSS-Only HTML Form Styling",
    subheading:
      "HTML form inputs have always been notoriously difficult to style with CSS, but there are several little-used selectors that give us significant power to style inputs and surrounding elements. Some of these are relatively new, while others have been available for quite some time.",
    text:
      "HTML form inputs have always been notoriously difficult to style with CSS, but there are several little-used selectors that give us significant power to style inputs and surrounding elements. Some of these are relatively new, while others have been available for quite some time.",
    author: "Erik Wahlström",
    email: "erik@mail.com",
    timestamp: 1575967926045
  }
];

app.get("/api/posts", (req, res) => {
  res.send(posts);
});

app.post("/api/posts", (req, res) => {
  // const schema = Joi.object().keys({
  //   heading: Joi.string()
  //     .min(3)
  //     .max(50)
  //     .required()
  // });
  // const result = schema.validate(req.body);

  // if (result.error) {
  //   console.log("Error");
  //   res.status(400).send(result.error.details[0].message);
  //   return;
  // }

  const timestamp = Date.now();
  req.body.timestamp = timestamp;

  const post = {
    id: posts.length + 1,
    heading: req.body.heading,
    subheading: req.body.subheading,
    text: req.body.text,
    author: req.body.author,
    email: req.body.email,
    timestamp: timestamp
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
