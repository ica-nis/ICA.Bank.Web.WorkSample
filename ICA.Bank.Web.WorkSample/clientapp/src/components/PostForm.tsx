import React from "react";
import axios from "axios";
import styles from "../styles/postform.module.scss";
import CharCountInput from "./CharCountInput";

interface PostFormProps {}

interface PostFormState {
  heading: string;
  subheading: string;
  text: string;
  author: string;
  email: string;
  headingError: string;
  subheadingError: string;
  textError: string;
  authorError: string;
  emailError: string;
}

const initialState = {
  heading: "",
  subheading: "",
  text: "",
  author: "",
  email: "",
  headingError: "",
  subheadingError: "",
  textError: "",
  authorError: "",
  emailError: ""
};

class PostForm extends React.Component<PostFormProps, PostFormState> {
  constructor(props: PostFormProps) {
    super(props);
    this.state = initialState;
  }

  changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [event.target.name]: event.target.value } as Pick<
      PostFormState,
      keyof PostFormState
    >);
  };

  textAreachangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ [event.target.name]: event.target.value } as Pick<
      PostFormState,
      keyof PostFormState
    >);
  };

  validate = () => {
    let headingError = "";
    let subheadingError = "";
    let authorError = "";
    let emailError = "";

    // Heading error
    if (this.state.heading.length < 1) {
      headingError = "Please enter something here";
    }

    if (this.state.heading.length > 50) {
      headingError = "You need can only enter 50 characters";
    }

    // Subheading error
    if (this.state.subheading.length < 1) {
      subheadingError = "Please enter something here";
    }

    if (this.state.subheading.length > 250) {
      subheadingError = "You need can only enter 250 characters";
    }

    // Author error
    if (this.state.author.length < 1) {
      authorError = "Please enter something here";
    }

    if (this.state.author.length > 40) {
      authorError = "You need can only enter 40 characters";
    }

    // Email error
    if (!this.state.email.includes("@")) {
      emailError =
        "Invalid email. Make sure you type in a valid email address (author@mail.com)";
    }

    // Error handler
    if (headingError || subheadingError || authorError || emailError) {
      this.setState({ headingError, subheadingError, authorError, emailError });
      return false;
    }
    return true;
  };

  submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValid = this.validate();

    if (isValid) {
      this.setState(initialState);
    }

    axios
      .post("http://localhost:3001/api/posts", this.state)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { heading, subheading, text, author, email } = this.state;
    return (
      <>
        <form className={styles.postForm} onSubmit={this.submitHandler}>
          <h1>Create a Post</h1>
          <h4 className={styles.inputHeaders}>Heading</h4>
          <CharCountInput
            onChange={this.changeHandler}
            value={heading}
            type="text"
            name="heading"
            maxChars={50}
          />

          <p className={styles.validation}>{this.state.headingError}</p>
          <h4 className={styles.inputHeaders}>Description</h4>
          <CharCountInput
            onChange={this.changeHandler}
            value={subheading}
            type="text"
            name="subheading"
            maxChars={250}
          />
          <p className={styles.validation}>{this.state.subheadingError}</p>

          <h4 className={styles.inputHeaders}>Text</h4>

          <textarea
            className={styles.textArea}
            onChange={this.textAreachangeHandler}
            value={text}
            name="text"
          />
          <h4 className={styles.inputHeaders}>Author</h4>
          <CharCountInput
            onChange={this.changeHandler}
            value={author}
            type="text"
            name="author"
            maxChars={40}
          />

          <p className={styles.validation}>{this.state.authorError}</p>
          <h4 className={styles.inputHeaders}>Email</h4>

          <input
            className={styles.inputField}
            type="text"
            name="email"
            value={email}
            onChange={this.changeHandler}
          />
          <p className={styles.validation}>{this.state.emailError}</p>

          <button
            name="submit"
            type="submit"
            className={styles.submit}
            data-submit="...Sending"
          >
            Submit
          </button>
        </form>
      </>
    );
  }
}

export default PostForm;
