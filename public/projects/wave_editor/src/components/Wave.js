import React from 'react';
import Button from '../Button';
import Element from "./Element";
class Wave extends React.Component{
  constructor(props) {
    super(props);
    
  }
  insert = (idx) => {
    return () => {
      let wave = this.props.wave;
      wave.splice(idx,0,{
        "type":"enemy",
        "zombie": "normal",
        "intensity": 1,
        "amount": 5
      });
      this.props.changeWave(wave,"wave");
    }
  }
   addElement = () =>{
     let wave = this.props.wave;
     wave.push(    {
      "type":"enemy",
      "zombie": "normal",
      "intensity": 1,
      "amount": 5
    });
      this.props.changeWave(wave,"wave");
   }

   deleteElement = (idx) =>{
    return () => {
      let wave = this.props.wave;
      wave.splice(idx,1);
      this.props.changeWave(wave,"wave"); //Changes wave property to wave variable

    }
  }
  editElement = (idx) =>{
    return (val) => {
      let wave = this.props.wave;
      wave[idx] = Object.assign({},val);
      this.props.changeWave(wave,"wave"); //Changes wave property to wave variable

    }
  }
  swap = (idx,change) => {
    let wave = this.props.wave;
    let a = Object.assign({},wave[idx]);
    let nextElem = (idx+change + wave.length) % wave.length;
    let b = Object.assign({},wave[nextElem]);
    this.editElement(idx)(b);
    this.editElement(nextElem)(a);

  }
  swapBefore = (idx) => {
    return () => {
      this.swap(idx,-1)  
    }
  }
  swapAfter = (idx) => {
    return () => {
      this.swap(idx,1)  
    }
  }
  calculateDifficulty(){
    function duration(obj){
      let type = obj.zombie;
      let map = {
        "normal":10,
        "behemoth":2,
        "carb_loader":15,
        "torso":4,
        "dog":15
      }
      return 180/map[type];
    }
    //duration = 180/speed
    let wave = Object.assign([],this.props.wave);
    /*wave.push({
      "type":"condition",
      "condition":"wait_until_empty"
    })*/
    wave = wave.filter(function(component){
      return component.type === "enemy" && component.zombie !== "mouse" 
      //|| (component.type === "condition" && component.condition === "wait_until_empty");
    });
    let keypresses = 0; 
    let time = 180/10;
    for(let i = 0; i < wave.length;i++){
        time += (wave[i].delay || this.props.delay) * wave[i].amount;
        let ins = wave[i].intensity;
        if (wave[i].zombie === "normal"){
          ins += 2
        }
        if(wave[i].zombie === "behemoth"){
          ins *= 6
        }
        keypresses += (ins + 1) * wave[i].amount;
    }
    return (keypresses / time).toFixed(4) + " ingredients / s";
  }
  render() {
    // const waveList = props.data.map(wave => (
    //   <Wave id={wave.id} delay={wave.delay} wave={wave.wave}>
    // ))
    const elemList = this.props.wave.map((elem,idx) => (
        <Element insert={this.insert(idx)} swapBefore={this.swapBefore(idx)} swapAfter={this.swapAfter(idx)}
        delay={this.props.delay} delete={this.deleteElement(idx)} edit={this.editElement(idx)} key={idx} data={elem}/>
      ))
    // let flipExpanded = () => {
    //     this.setprops({expanded:!this.props.expanded})
    // }
    return (
    <div className="wave">
      <h3><Button positive={!this.props.expanded} onClick={this.props.expand}/> {this.props.id.split("-").join(" ")}</h3>
      <div style={this.props.expanded ? {display:"block"} : {display:"none"}}>
        <b>Wave delay: </b><input onChange={(e) => {
          this.props.changeWave(parseFloat(e.target.value),"delay");
        }} value={this.props.delay}></input>
        <b> Average difficulty: {this.calculateDifficulty()}</b>
        {elemList}
        <button onClick={this.addElement}>Add element</button>
      </div>
    </div>
    )
  };
}

export default Wave;
