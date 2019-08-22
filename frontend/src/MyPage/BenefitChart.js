import React, { Component } from 'react';

import BillboardChart from "react-billboardjs";
import "react-billboardjs/lib/billboard.css";

class BenefitChart extends Component {
  state={
    Axis: {
      x:{
          type: "timeseries",
          tick: {
              format: "%Y-%m-%d"
          }
      },
      y: {
        tick: {
          culling: {
            max: 5
          }
        }
      },
      y2: {
        show: true,
        tick: {
          culling: true
        }
      }
    },
    Data: {
      x: "x",
      columns: [],
      names: {
        data1: "사진 수",
        data2: "다운로드 수",
        data3: "수입"
      },
      axes: {
        data1: "y",
        data2: "y",
        data3: "y2"
      },
      types: {
        data1: "bar",
        data2: "bar",
        data3: "line"
      }
    }
  }
  _dataSet = (value) => {
    this.setState({
      ...this.state.Axis,
      Data:{
        ...this.state.Data,
        columns: value
      }
    });
  }
  componentWillMount(){
    this._dataSet(this.props.Data);
  }
  componentWillReceiveProps(change){
    this._dataSet(change.Data);
  }
  render() {
    return <BillboardChart 
      data={this.state.Data}
      axis={this.state.Axis}/>;
  }
}

export default BenefitChart;