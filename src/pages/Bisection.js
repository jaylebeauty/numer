import React, { Component } from 'react';
import Plot from 'react-plotly.js';
import api from './api';
import axios from 'axios';
import * as math from 'mathjs';
import { LineChart,Line,XAxis,YAxis,CartesianGrid,Tooltip,Legend,
}from 'recharts';

var X=[], Y=[];
export default class Bisection extends Component {

  constructor(props) {
    super(props);
    X = [];
    Y = [];
    this.state = { Arr: [], xl: "", xr: "", E: "", submitted: true};
    this.clear = this.clear.bind(this);
    this.componentDidMount =this.componentDidMount.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.BisectionMethod = this.BisectionMethod.bind(this);
  }
  componentDidMount = async () => {
        await api.getBisection().then(res => {
        var xr=0;
        var xl=0;
        var fx="";
        xr = res.data.xr
        xl = res.data.xl
        fx = res.data.fx
           this.setState({update:this.state.update++});
        })
}

  clear(event) {
   
    this.setState({ Arr: [] });
    this.setState({ xl: "" });
    this.setState({ xr: "" });
    this.setState({ E: "" });
    this.setState({ submitted: true });

    event.preventDefault();
  }
  handleSubmit(event) {
    let str = this.state.E;
    let c = 0;
    for (let i = 0; i < str.length; i++) {
      if (str[i] === "x" || str[i] === "X") {
        c++;
      }
    }
    if ((str.length !== 0) && (c !== 0)  && this.state.submitted && this.state.xl !== "" && this.state.xr !== "") {
      this.BisectionMethod();
      this.setState({ submitted: false });
    }
    event.preventDefault();
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    this.setState({ submitted: true });
    this.setState({ Arr: [] });
  }
  BisectionMethod(event) {
    X = [];
    Y = [];
    var func = (x) => {
      let scope = { x: x }
      let code = math.compile(this.state.E);
      return code.eval(scope);
    };
    var err = (x0, x1) => { return Math.abs((x1 - x0) / x1)};
    var arr;
    var data = { xl: 0, xr: 0, xm: 0, err: "", fxl: 0, fxr: 0, fxm: 0, count: 1 };
    var t = true;
    var xOld = 0;
    data.xl = parseFloat(this.state.xl);
    data.xr = parseFloat(this.state.xr);
    while (t) {
      data.xm = (data.xl + data.xr) / 2;
      data.fxl = (func(data.xl)).toFixed(6);
      data.fxr = (func(data.xr)).toFixed(6);
      data.fxm = (func(data.xm)).toFixed(6);
      data.err = err(xOld, data.xm).toFixed(6);
      arr = this.state.Arr;
      arr.push({ xl: data.xl, 
        xr: data.xr, 
        xm: data.xm, 
        err: data.err, 
        fxl: data.fxl, 
        fxr: data.fxr, 
        fxm: data.fxm, 
        count: data.count });
      if (func(data.xm) === 0 || data.err<= 0.000001 ) {
        t = false;
      }
      else if (func(data.xl) * func(data.xm) < 0) {
        data.xr = data.xm;
      }
      else if (func(data.xl) * func(data.xm) > 0) {
        data.xl = data.xm;
      }
      xOld = data.xm;

        X.push(data.count);
        Y.push(data.err);
          data.count++;
   

    }
  }
  render() {
    const DataRow = (props) => {
      return (<tr>
        <td>{props.data.count}</td>
        <td>{props.data.xl}</td>
        <td>{props.data.xr}</td>
        <td>{props.data.xm}</td>
        <td>{props.data.fxl}</td>
        <td>{props.data.fxr}</td>
        <td>{props.data.fxm}</td>
        <td>{props.data.err}</td>
        </tr>);
    }
    let rows = this.state.Arr.map(x => { return <DataRow key={x.count} data={x} /> });

    return (
           <div className="columns has-background-black">
                <div className="column is-15 is-custom">
                    <form id="F" className="box has-background-dark" 
                    onSubmit={this.handleSubmit}>
                        <h3 className="title is-1 has-text-white"><strong>BisectionMethod</strong></h3>
                        <hr className="is-divider" />
                        <div className="field has-addons">
                            <p className="control">
                                <a className="button is-static is-meduim" href="#undefined" >
                                    Equation :
                                </a>
                            </p>
                            <p className="control">
                                <input className="input is-primary is-meduim" 
                                name="E" 
                                type="text" 
                                style={{ width: "80vh" }} 
                                value={this.state.E} 
                                onChange={this.handleChange}
                                placeholder="Enter Equation" />
                            </p>
                        </div>
                        <div className="field has-addons">
                            <p className="control">
                                <a className="button is-static is-meduim" href="#undefined" >
                                    Xl :
                                </a>
                            </p>
                            <p className="control">
                                <input className="input is-primary is-meduim" 
                                name="xl" 
                                type="number" 
                                style={{ width: "80vh" }} 
                                step="any" 
                                value={this.state.xl} 
                                onChange={this.handleChange} 
                                placeholder="Enter Xl" />
                            </p>
                        </div>
                        <div className="field has-addons">
                            <p className="control">
                                <a className="button is-static is-meduim" href="#undefined" >
                                    Xr :
                                </a>
                            </p>
                            <p className="control">
                                <input className="input is-primary is-meduim" 
                                name="xr" 
                                type="number" 
                                style={{ width: "80vh" }} 
                                step="any" 
                                value={this.state.xr} 
                                onChange={this.handleChange} 
                                placeholder="Enter Xr" />
                            </p>
                        </div><br />
                        <div className="field has-addons">
                            <div className="control">
                                <input type="submit" 
                                value="Submit" 
                                className="button is-success is-rounded" />
                            </div>
                            <div className="control">
                                <button className="button is-danger is-rounded" 
                                onClick={this.clear}>  Reset  </button>
                            </div>
                        </div>
                    </form>
                    {(this.state.submitted)
                        ? <div></div>
                        : <div><div className="box has-background-dark" id="T">
                            <h1 className="title is-1 has-text-white">Table</h1>
                            <hr className="is-divider" />
                            <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth ">
                                <thead>
                                    <tr><th>n</th>
                                        <th>Xl</th>
                                        <th>Xr</th>
                                        <th>Xm</th>
                                        <th>func(Xl)</th>
                                        <th>func(Xr)</th>
                                        <th>func(Xm)</th>
                                        <th>ERR</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows}
                                </tbody>
                            </table>
                        </div>
                            <div className="box has-background-dark" id="C">
                                <h1 className="title is-1 has-text-white">Chart</h1>
                                <hr className="is-divider" />
                                <LineChart Data={this.state.Arr} />
                                <div>
                                    <Plot
                                        data={[
                                            {
                                                x: X,
                                                y: Y,
                                                type: 'scatter'
                                            }
                                        ]}
                                        latout={{ width: 500, height: 300 }}
                                    />
                                </div>
                            </div>
                        </div>
                    }

                </div>
            </div>
        );
    }
}