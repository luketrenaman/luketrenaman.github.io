import React from 'react';
class Enemy extends React.Component{
  constructor(props) {
    super(props);
  }
  changeZombie = (e) => {
    this.props.editProperty("zombie",e.target.value);
  }
  clean(val,def){
    if(isNaN(parseFloat(val))){
      return def;
    } else{
      return parseFloat(val);
    }
  }
  changeIntensity = (e) => {
    this.props.editProperty("intensity",this.clean(e.target.value,1));
  }
  changeAmount = (e) => {
    this.props.editProperty("amount",this.clean(e.target.value,1));
  }
  changeDelay = (e) => {
    this.props.editProperty("delay",this.clean(e.target.value,0));
  }
  calculateDifficulty(){
    function duration(obj){
      let type = obj.zombie;
      let map = {
        "normal":10,
        "behemoth":4,
        "carb_loader":15,
        "torso":4,
        "dog":15
      }
      return 180/map[type];
    }
    //duration = 180/speed
    let time = (this.props.delay) * this.props.amount + duration(this.props);
    let ins = this.props.intensity;
    if (this.props.zombie === "normal"){
      ins += 2
    }
    if(this.props.zombie === "behemoth"){
      ins *= 6
    }
    let keypresses = (ins + 1) * this.props.amount;
    return (keypresses / time).toFixed(4) + " i / s";
  }
  render() {
    // const waveList = props.data.map(wave => (
    //   <Wave id={wave.id} delay={wave.delay} wave={wave.wave}>
    // ))
    let ingredients = <span></span>
    return (
        <span>
            <label> Enemy type: </label>
            <select onChange={this.changeZombie} value={this.props.zombie}>
                <option value="normal">Normal</option>
                <option value="carb_loader">Carb loader</option>
                <option value="behemoth">Behemoth</option>
                <option value="mouse">Mouse</option>
                <option value="torso">Torso</option>
                <option value="dog">Dog</option>
            </select>
            <label> Intensity: </label>
            <input onChange={this.changeIntensity} value = {this.props.intensity} type="text"></input>
            <label> Amount: </label>
            <input onChange={this.changeAmount} value = {this.props.amount} type="text"></input>
            <label> Delay: </label>
            <input onChange={this.changeDelay} value = {this.props.delay} type="text"></input>
            <span> {this.calculateDifficulty()} </span>
        </span>
    )
  };
}

export default Enemy;
