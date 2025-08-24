import React from 'react';
import Wave from "./components/Wave";
class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {"data":props.data};
  }
  importData = () =>{
    try{
      this.setState({"data":JSON.parse(prompt("Paste wave object"))});
    } catch{
      alert("Invalid import object");
    }
  }
  addWave = () => {
    this.setState({
        "data": [...this.state.data, {
            "expanded":true,
            "id": "Wave-" + (this.state.data.length + 1),
            "delay": 2.5,
            "wave": [{
                "type":"enemy",
                "zombie": "normal",
                "intensity": 1,
                "amount": 5
            }, {
                "type":"enemy",
                "zombie": "normal",
                "intensity": 2,
                "amount": 5
            }]
        }]
    })
}
  render() {
    let expand = (id) => {
      return () => {
        let state = Object.assign([], this.state.data);
        let wave = state.find(element => {
          return element.id === id;
        });
        wave.expanded = !wave.expanded;
        this.setState({
          "data":state
        });

      }
    }
    let changeWave = (id) => {
      return (newData,prop) => {
        let state = Object.assign([], this.state.data);
        let wave = state.find(element => {
          return element.id === id;
        });
        wave[prop] = newData;
        this.setState({
          "data":state
        });

      }
    }
    const waveList = this.state.data.map(wave => (
      <Wave changeWave={changeWave(wave.id)} key={wave.id} id={wave.id} delay={wave.delay} wave={wave.wave} expanded={wave.expanded} expand={expand(wave.id)}/>
    ))
    return (
    <div className="App">
      <header><h1>Wave Editor</h1></header>
      <p>Sequence enemies, dialogue, conditions, and animations to create a wave.</p>
      <p>A condition will activate everything after it, until a close condition is reached.</p>
      <button onClick={this.importData}>Click to import</button><br/>
    <label>Export data:</label><textarea className="export" value={JSON.stringify(this.state.data)}></textarea>
      {waveList}
      <button onClick={this.addWave}>Add wave</button>
      <p></p>
    </div>
    )
  };
}

export default App;
