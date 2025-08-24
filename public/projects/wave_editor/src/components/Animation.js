import React from 'react';
class Animation extends React.Component{
  constructor(props) {
    super(props);
  }
  changePath = (e) => {
    this.props.editProperty("path",e.target.value);
  }
  render() {
    // const waveList = props.data.map(wave => (
    //   <Wave id={wave.id} delay={wave.delay} wave={wave.wave}>
    // ))
    let ingredients = <span></span>
    return (
        <span>
            <label> Animation path: </label>
            <input className="input-txt" onChange={this.changePath} value = {this.props.path} type="text"></input>
        </span>
    )
  };
}

export default Animation;
