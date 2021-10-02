import React from "react";
import "./App.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

export default class QuoteMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      quote: "",
      author: "",
      bgColor: "",
      api: "https://api.quotable.io/random",
    };
  }

  componentDidMount() {
    this.getQuote();
  }

  getQuote = () => {
    fetch(this.state.api)
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

  tweetQuote = () => {
    const url = "twitter.com";
    let text = `${this.state.author} - ${this.state.quote}`;
    window.open(
      "http://twitter.com/share?url=" +
        encodeURIComponent(url) +
        "&text=" +
        encodeURIComponent(text),
      ""
    );
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
              <button
                className="fa-twitter-square"
                onClick={() => {
                  this.tweetQuote();
                }}
              >
                <FontAwesomeIcon icon={faTwitter} />
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
