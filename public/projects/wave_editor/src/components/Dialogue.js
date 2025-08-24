import React from 'react';
class Dialogue extends React.Component{
  constructor(props) {
    super(props);
  }
  changeExpression = (e) => {
    this.props.editProperty("expression",e.target.value);
  }
  changeText = (e) => {
    this.props.editProperty("text",e.target.value);
  }
  render() {
    // const waveList = props.data.map(wave => (
    //   <Wave id={wave.id} delay={wave.delay} wave={wave.wave}>
    // ))
    let ingredients = <span></span>
    return (
        <span>
            <label> Facial expression: </label>
            <select value={this.props.expression} onChange={this.changeExpression}>
                <option value = "neutral">Neutral</option>
                <option value = "unsure">Unsure</option>
                <option value = "happy">Happy</option>
                <option value = "shocked">Shocked</option>
                <option value = "angry">Angry</option>
                <option value = "annoyed">Annoyed</option>
                <option value = "pleasantly surprised">Pleasantly Surprised</option>
                <option value = "robot">Robot</option>
            </select>
            <label> Text: </label>
            <textarea onChange={this.changeText} value={this.props.text}></textarea>
        </span>
    )
  };
}

export default Dialogue;
