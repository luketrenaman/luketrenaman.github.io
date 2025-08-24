import React from 'react';
class Condition extends React.Component{
  constructor(props) {
    super(props);
  }
  clean(val,def){
    if(isNaN(parseFloat(val))){
      return def;
    } else{
      return parseFloat(val);
    }
  }
  changeCondition = (e) => {
    if(e.target.value === "wait_seconds"){
        this.props.editProperty("seconds",5);
    } else{
        this.props.editProperty("seconds",null);
    }
    this.props.editProperty("condition",e.target.value);
  }
  changeText = (e) => {
    this.props.editProperty("text",e.target.value);
  }
  changeSeconds = (e) => {
    this.props.editProperty("seconds",this.clean(e.target.value));
  }
  render() {
    // const waveList = props.data.map(wave => (
    //   <Wave id={wave.id} delay={wave.delay} wave={wave.wave}>
    // ))
    let secondsDisplay;
    if(this.props.condition === "wait_seconds"){
        secondsDisplay = <span>
            <label> Seconds: </label>
            <input onChange={this.changeSeconds} value = {this.props.seconds} type="number"></input>
        </span>
    }
    return (
        <span>
            <label> Condition: </label>
            <select value={this.props.condition} onChange={this.changeCondition}>
                <option value = "start">Control - Unpause game</option>
                <option value = "pause">Control - Pause game</option>
                <option value = "wait_until_empty">Wait - No zombies on screen</option>
                <option value = "wait_seconds">Wait - Wait x seconds</option>
                <option value = "have_robot">LEGACY If - Have robot</option>
                <option value = "have_cat">If - Have cat</option>
                <option value = "retrieve_robot">LEGACY If - Chance of retrieve robot</option>
                <option value = "mix">Modifier - Mix following zombies</option>
                <option value = "end_condition">End Condition</option>
                <option value = "else_condition">Else</option>
            </select>
            {secondsDisplay}
        </span>
    )
  };
}

export default Condition;
