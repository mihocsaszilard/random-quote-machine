import React from "react";
import "./App.scss";

export default class QuoteMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      quotes: "",
      author: "",
      bgColor: "",
    };
  }

  componentDidMount() {
    this.getQuote();
  }

  getQuote = () => {
    fetch("https://api.quotable.io/random")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            quote: result.content,
            author: result.author,
          });
          console.log(result);
        },
        (error) => {
          this.setState({
            error,
          });
        }
      );
  };

  randomColor = () => {
    let letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  render() {
    return (
      <div>
        {this.state.quote ? (
          <div id="wrapper" style={{ backgroundColor: this.randomColor() }}>
            <div id="quote-box">
              <p id="text">{this.state.quote}</p>
              <p id="author">- {this.state.author}</p>
              <button
                onClick={() => {
                  this.getQuote();
                  this.randomColor();
                }}
              >
                New Quote
              </button>
            </div>
          </div>
        ) : (
          <div>{this.state.error}</div>
        )}
        <p className="copyright">
          Created by:&nbsp;
          <a href="https://github.com/mihocsaszilard">mihocsaszilard</a>
        </p>
      </div>
    );
  }
}
