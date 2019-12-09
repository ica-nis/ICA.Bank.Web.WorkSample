import React from "react";
import axios from "axios";

interface PostFormProps {}

interface PostFormState {
  heading: string;
  text: string;
}

class PostForm extends React.Component<PostFormProps, PostFormState> {
  constructor(props: PostFormProps) {
    super(props);
    this.state = {
      heading: "",
      text: ""
    };
  }

  changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [event.target.name]: event.target.value } as Pick<
      PostFormState,
      keyof PostFormState
    >);
    console.log(this.state);
  };

  submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
    const { heading, text } = this.state;
    return (
      <>
        <form onSubmit={this.submitHandler}>
          <input
            type="text"
            name="heading"
            value={heading}
            onChange={this.changeHandler}
          />
          <input
            type="text"
            name="text"
            value={text}
            onChange={this.changeHandler}
          />
          <button type="submit">Submit</button>
        </form>
      </>
    );
  }
}

export default PostForm;
