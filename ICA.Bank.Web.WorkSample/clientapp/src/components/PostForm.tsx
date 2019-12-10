import React from "react";
import axios from "axios";
import styles from "../styles/postform.module.scss";

interface PostFormProps {}

interface PostFormState {
  heading: string;
  subheading: string;
  text: string;
  author: string;
  email: string;
  headingError: string;
  emailError: string;
}

const initialState = {
  heading: "",
  subheading: "",
  text: "",
  author: "",
  email: "",
  headingError: "",
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
    console.log(this.state);
  };

  validate = () => {
    let headingError = "";
    let emailError = "";

    if (this.state.heading.length < 1) {
      headingError = "Please enter something here";
    }

    if (this.state.heading.length > 10) {
      headingError = "You need can only enter 50 characters";
    }

    if (!this.state.email.includes("@")) {
      emailError =
        "Invalid email. Make sure you type in a correct email (author@mail.com)";
    }
    if (headingError || emailError) {
      this.setState({ headingError, emailError });
      return false;
    }
    return true;
  };

  submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValid = this.validate();

    if (isValid) {
      console.log(this.state);
      this.setState(initialState);
    }

    console.log(this.state);
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
          <p>Heading</p>
          <input
            type="text"
            name="heading"
            value={heading}
            onChange={this.changeHandler}
          />
          <p className={styles.validation}>{this.state.headingError}</p>
          <p>Subheading</p>
          <input
            type="text"
            name="subheading"
            value={subheading}
            onChange={this.changeHandler}
          />
          <p>Text</p>
          <input
            type="text"
            name="text"
            value={text}
            onChange={this.changeHandler}
          />
          <p>Author</p>
          <input
            type="text"
            name="author"
            value={author}
            onChange={this.changeHandler}
          />
          <p>Email</p>
          <input
            type="text"
            name="email"
            value={email}
            onChange={this.changeHandler}
          />
          <p className={styles.validation}>{this.state.emailError}</p>

          <button type="submit">Submit</button>
        </form>
      </>
    );
  }
}

export default PostForm;
