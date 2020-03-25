import React, { Component } from 'react';

import * as math from 'mathjs';
import Plot from 'react-plotly.js';

var X,Y,result;
class FWOH2 extends Component {
  constructor(props){
    super(props);
    this.state={submitted:false,x:"",h:"",e:"",d:"",showOutput:false};
    X=[];
    Y=[];
    result=0;
    this.clear=this.clear.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.ForwardH2=this.ForwardH2.bind(this);
  }
  clear(event){
    event.preventDefault();
    this.setState({submitted:false,x:"",h:"",e:"",d:"",showOutput:false});
    X=[];
    Y=[];
    result=0;
  }
  handleSubmit(event) {
    let str=this.state.e;
    let c=0;
    for(let i=0;i<str.length;i++){
      if(str[i]==="x"||str[i]==="X"){
        c++;
      }
    }
    if((str.length!==0)&&(c!==0)&&this.state.submitted){
      X=[];
      Y=[];
      result=0;
      this.ForwardH2();
      this.setState({submitted:false,showOutput:true});
    }
    event.preventDefault();
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
    this.setState({submitted:true});
  }
  ForwardH2(event){
    var func=(x)=>{
        let scope={x:x}
        let code=math.compile(this.state.e);
        return code.eval(scope);
      }

    var graph=()=>{
      for(let i=0;i<=10;i+=0.1){
          X.push(i);
          Y.push(func(i));
      }
    }

    var x=parseFloat(this.state.x);
    var h=parseFloat(this.state.h);
    var d=parseInt(this.state.d);
    switch (d) {
            case 1:
                result = (-1*func(x+(2*h)) + 4*func(x+(1*h)) -3*func(x)) / (2*h);
                break;
            case 2:
                result = (-1*func(x+(3*h)) + 4*func(x+(2*h)) -5*func(x+(1*h)) + 2*func(x)) / Math.pow(h, 2);
                break;
            case 3:
                result = (-3*func(x+(4*h)) + 14*func(x+(3*h)) -24*func(x+(2*h)) + 18*func(x+(1*h)) -5*func(x)) / (2*Math.pow(h, 3));
                break;
            case 4:
                result = (-2*func(x+(5*h)) + 11*func(x+(4*h)) -24*func(x+(3*h)) + 26*func(x+(2*h)) -14*func(x+(1*h)) + 3*func(x)) / Math.pow(h, 4);
                break;
            default:
                console.log("Error");
        }
    graph();
  }
  render() {
    return (

      <div className="columns has-background-white">
                  <div className="column is-15 is-custom">
                      <form id="F" onSubmit={this.handleSubmit}>
                          <h3 className="title is-1 has-text-danger"><strong>Forward divided Differences Err of order h^2</strong></h3>
                          <hr className="is-divider"/>
                          <div className="field has-addons">
                              <p className="control">
                                <a className="button is-static is-meduim" href="#undefined" >
                                    Equation :
                                </a>
                              </p>
                              <p className="control">
                                  <input className="input is-black is-meduim" name="e" type="text" 
                                  style={{width:"80vh"}} value={this.state.e} onChange={this.handleChange} placeholder="Enter Equation" />
                              </p>
                          </div>
                          <div className="field has-addons">
                              <p className="control">
                                <a className="button is-static is-meduim" href="#undefined" >
                                    x :
                                </a>
                              </p>
                              <p className="control">
                                  <input className="input is-black is-meduim" name="x" type="number" 
                                  style={{width:"80vh"}} step="any" value={this.state.x} onChange={this.handleChange} placeholder="Enter x"/>
                              </p>
                          </div>
                          <div className="field has-addons">
                              <p className="control">
                                <a className="button is-static is-meduim" href="#undefined" >
                                    h :
                                </a>
                              </p>
                              <p className="control">
                                  <input className="input is-black is-meduim" name="h" type="number" 
                                  style={{width:"80vh"}} step="any" value={this.state.h} onChange={this.handleChange} placeholder="Enter h" />
                              </p>
                          </div>
                          <div className="field has-addons">
                              <p className="control">
                                <a className="button is-static is-meduim" href="#undefined" >
                                    Degree :
                                </a>
                              </p>
                              <p className="control">
                                  <input className="input is-black is-meduim" name="d" type="number" 
                                  style={{width:"80vh"}} min="1" max="4" value={this.state.d} onChange={this.handleChange} placeholder="Enter Degree" />
                              </p>
                          </div><br/>
                          <div className="field has-addons">
                              <div className="control">
                                  <input type="submit" value="Submit" className="button is-success is-rounded"/>
                              </div>
                              <div className="control">
                                  <button className="button is-danger is-rounded" 
                                onClick={this.clear}>  Reset  </button>
                              </div>
                          </div>
                      </form>
                      {(this.state.showOutput)&&
                          <div>
                              <div className="box has-background-dark" id="T">
                                  <h1 className="title is-1 has-text-white">Graph</h1>
                                  <hr className="is-divider"/>
                                  <div>
                                      <Plot
                                          data={[
                                              {
                                                  x:X,
                                                  y:Y,
                                                  type:'scatter'
                                              }
                                          ]}
                                          latout={{width:500,height:300}}
                                      />
                                  </div>
                              </div>
                              <div className="box has-background-dark" id="C">
                                  <h1 className="title is-1 has-text-white">Output</h1>
                                  <hr className="is-divider"/>
                                  <h2 className="title is-2 has-text-white"><strong>The Approximate is {result}</strong></h2><br/><br/>
                              </div>
                          </div>
                      }

                  </div>
      </div>
    );
  }
}
export default FWOH2;
