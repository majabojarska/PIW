import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

function Copyright(props) {
  return (
    <div className="copyright">
      <p>
        {props.fullname} &copy;{props.year}
      </p>
    </div>
  );
}

function Title(props) {
  return <h1 className="title">{props.text}</h1>;
}

function Description(props) {
  return <p className="description">{props.text}</p>;
}

function CallToAction(props) {
  function handleClick(e) {
    window.scrollTo(0, window.innerHeight);
  }

  return (
    <div className="call-to-action" onClick={handleClick}>
      {props.text}
      <br />
      <FontAwesomeIcon className="scroll-down-button" icon={faChevronDown} />
    </div>
  );
}

class HideableDistroList extends React.Component {
  constructor(props) {
    super(props);
    this.itemArray = props.items;
    this.handleClick = this.handleClick.bind(this);
    this.state = { isListShown: false };
  }

  handleClick(e) {
    // Toggle
    let newState = this.state;
    newState.isListShown = !newState.isListShown;
    this.setState(newState);
  }

  render() {
    const listItems = this.itemArray.map((distro) => (
      <a
        className="distro-list-anchor"
        href={distro.href}
        rel="noopener noreferrer"
        target="_blank"
      >
        <li className="distro-list-item" key={distro.name + distro.href}>
          {distro.name}
        </li>
      </a>
    ));
    let toggleButtonText;
    if (this.state.isListShown) {
      toggleButtonText = "Hide distributions";
    } else {
      toggleButtonText = "Show distributions";
    }
    return (
      <div className="HideableList">
        <button onClick={this.handleClick} id="button_toggle_distro_list">
          {toggleButtonText}
        </button>
        <br />
        {this.state.isListShown && <ul className="distro-list">{listItems}</ul>}
      </div>
    );
  }
}

function App() {
  const descriptionText =
    "Manjaro is a professionally made Linux based operating system that is a suitable replacement for Windows or MacOS. Multiple Desktop Environments are available through our Official and Community editions.";

  const distributions = [
    { name: "Gnome", href: "https://manjaro.org/downloads/official/gnome/" },
    { name: "XFCE", href: "https://manjaro.org/downloads/official/xfce/" },
    { name: "KDE Plasma", href: "https://manjaro.org/downloads/official/kde/" },
    {
      name: "Architect",
      href: "https://manjaro.org/downloads/official/architect/",
    },
  ];
  return (
    <div className="App">
      <Copyright fullname="Maja Bojarska" year="2020" />
      <div className="App-landing-page">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Title text="manjaro" />
          <Description text={descriptionText} />
          <CallToAction text="Learn more" />
        </header>
      </div>
      <div id="secondary_container">
        <div className="centered">
          <HideableDistroList items={distributions} />
        </div>
      </div>
    </div>
  );
}

export default App;
