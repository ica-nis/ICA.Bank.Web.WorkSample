import React from "react";
import styles from "../styles/input.module.scss";

interface CharCountInputProps {
  value: string;
  type: string;
  name: string;
  maxChars: number;
  onChange: any;
}

interface CharCountInputState {}

class CharCountInput extends React.Component<
  CharCountInputProps,
  CharCountInputState
> {
  state = {
    charsLeft: this.props.maxChars
  };

  componentDidMount() {
    this.handleCharCount(this.props.value);
  }

  handleCharCount = (value: string) => {
    const { maxChars } = this.props;
    const charCount = value.length;
    const charsLeft = maxChars - charCount;
    this.setState({ charsLeft });
  };

  changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [event.target.name]: event.target.value } as Pick<
      CharCountInputState,
      keyof CharCountInputState
    >);
    this.handleCharCount(event.target.value);
    this.props.onChange(event);
  };

  renderCharactersLeft = () => {
    const { charsLeft } = this.state;

    let content;
    if (charsLeft >= 0) {
      content = (
        <span
          style={{ fontSize: "12px", float: "right" }}
        >{`Characters left: ${charsLeft}`}</span>
      );
    } else if (charsLeft != null && charsLeft < 0) {
      const string = charsLeft.toString().substring(1);
      content = (
        <span
          style={{ fontSize: "12px", float: "right", color: "red" }}
        >{`Too many characters: ${string}`}</span>
      );
    } else {
      content = null;
    }
    return content;
  };

  render() {
    const { value, type, name } = this.props;

    return (
      <>
        <input
          className={styles.inputField}
          onChange={this.changeHandler}
          value={value}
          type={type}
          name={name}
        />
        {this.renderCharactersLeft()}
      </>
    );
  }
}

export default CharCountInput;
