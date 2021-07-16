import React from "react";

import "./styles.css";
import ReactCardFlip from "react-card-flip";

//

export default class Card extends React.Component {
  state = {
    isFlipped: false,
    img: "https://i.pinimg.com/originals/fa/d8/a3/fad8a3dd63316d884ac11ae3bd2cf235.jpg",
    locked: false,
  };

  //creating an event//
  handleClick = (e) => {
    e.preventDefault();
    this.setState({ isFlipped: !this.state.isFlipped });
    this.props.setCards(this.props.card);
  };

  //all the back of the card images in an object that sets state
  componentDidMount() {
    switch (this.props.card) {
      case "ace":
        this.setState({
          img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/01_of_spades_A.svg/1200px-01_of_spades_A.svg.png",
        });
        break;
      case "king":
        this.setState({
          img: "https://i7.pngguru.com/preview/458/229/186/king-of-spades-playing-card-suit-jack-queen.jpg",
        });
        break;
      case "queen":
        this.setState({
          img: "https://i.pinimg.com/originals/64/fe/3a/64fe3aaedd0cd7e7a89f15127bbcc3f4.png",
        });
        break;
      case "jack":
        this.setState({
          img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/English_pattern_jack_of_spades.svg/1200px-English_pattern_jack_of_spades.svg.png",
        });
        break;
      case "ten":
        this.setState({
          img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/10_of_spades.svg/1200px-10_of_spades.svg.png",
        });
        break;
      case "nine":
        this.setState({
          img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/9_of_spades.svg/2000px-9_of_spades.svg.png",
        });
        break;
      case "eight":
        this.setState({
          img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Playing_card_spade_8.svg/1200px-Playing_card_spade_8.svg.png",
        });
        break;
      case "seven":
        this.setState({
          img: "https://imgproxy.geocaching.com/109531ae252d813ca88e1e98aa9eff60d5e42575?url=http%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F6%2F66%2FPlaying_card_spade_7.svg%2F200px-Playing_card_spade_7.svg.png",
        });
        break;
      case "six":
        this.setState({
          img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Playing_card_spade_6.svg/1200px-Playing_card_spade_6.svg.png",
        });
        break;
    }
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.failure !== this.props.failure) {
      this.setState({ isFlipped: false });
    }
    if (prevProps.matches.length !== this.props.matches.length) {
      if (this.props.matches.includes(this.props.card)) {
        this.setState({ locked: true });
      }
    }
    if (prevProps.toggleFlip !== this.props.toggleFlip) {
      setTimeout(() => this.setState({ isFlipped: false }), 1000);
    }
  };

  render() {
    //this is the page of the card image

    return (
      <ReactCardFlip
        className="memory-card"
        isFlipped={this.state.locked ? true : this.state.isFlipped}
        flipDirection="horizontal"
      >
        <div onClick={this.props.locked ? null : this.handleClick}>
          <img
            className="card-back"
            src={
              "https://cdn.shopify.com/s/files/1/0200/7616/products/playing-cards-bicycle-rider-back-2_1024x1024.png?v=1535755695"
            }
            alt="card back"
          />
        </div>
        <div>
          <img
            className="card-front"
            src={`${this.state.img}`}
            alt="card face"
          />
        </div>
      </ReactCardFlip>
    );
  }
}
