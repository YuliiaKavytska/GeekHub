import React from 'react';
import styled from 'styled-components';

export default class DoubleSlider extends React.PureComponent {
    state = {
        max: this.props.max,
        min: this.props.min,
        minValue: this.props.startValue,
        maxValue: this.props.endValue,
        x1: 0,
        x2: 0,
        valueLineStart: 0,
        valueLineWidth: 0,
    }

    line = React.createRef();

    lastMin = 0;
    lastMax = 0;

    clickStartMin = 0;
    clickStartMax = 0;


    componentDidMount() {
        this.lineBar = this.line.current.getBoundingClientRect();

        this.deltaIn = (this.lineBar.width - 17) / (this.state.max - this.state.min);
        this.deltaOut = (this.state.max - this.state.min) / (this.lineBar.width - 17);

        this.lastMin = (this.state.minValue - this.state.min) * this.deltaIn;
        this.lastMax = (this.state.maxValue - this.state.min) * this.deltaIn;

        const startWidth = this.lastMax - this.lastMin;

        this.setState({
            x1: this.lastMin,
            x2: this.lastMax,
            valueLineStart: this.lastMin,
            valueLineWidth: startWidth,
        });
    }

    startMin = (e) => {
        this.clickStartMin = e.clientX;

        document.body.addEventListener('mousemove', this.minMove);
        document.body.addEventListener('mouseup', this.endMin);
    };

    minMove = (e) => {
        let currentMin = this.lastMin + e.clientX - this.clickStartMin;

        if (currentMin < 0) {
            currentMin = 0;
        } else if (currentMin > this.lastMax) {
			currentMin = this.lastMax;
		} else if (currentMin > this.lineBar.width - 17) {
            currentMin = this.lineBar.width - 17;
        }

        let currentMinValue = Math.round((currentMin * this.deltaOut) + this.state.min);
        let currentValueWidth = this.lastMax - currentMin;

        this.setState({
            x1: currentMin,
            minValue: currentMinValue,
            valueLineStart: currentMin,
            valueLineWidth: currentValueWidth,
        });
    };

    endMin = () => {
        this.lastMin = this.state.x1;

        document.body.removeEventListener('mousemove', this.minMove);
        document.body.removeEventListener('mouseup', this.endMin);
    };

    startMax = (e) => {
        this.clickStartMax = e.clientX;

        document.body.addEventListener('mousemove', this.maxMove);
        document.body.addEventListener('mouseup', this.endMax);
    };

    maxMove = (e) => {
        let currentMax = this.lastMax + e.clientX - this.clickStartMax;

        if (currentMax > this.lineBar.width - 17) {
            currentMax = this.lineBar.width - 17;
        } else if (currentMax < this.lastMin) {
            currentMax = this.lastMin;
        } else if (currentMax < 0) {
            currentMax = 0;
        }

        let currentMaxValue = Math.round(currentMax * this.deltaOut + this.state.min);
        let currentValueWidth = currentMax - this.lastMin;

        this.setState({
            x2: currentMax,
            maxValue: currentMaxValue,
            valueLineWidth: currentValueWidth,
        })
    };

    endMax = (e) => {
        this.lastMax = this.state.x2;

        document.body.removeEventListener('mousemove', this.maxMove);
        document.body.removeEventListener('mouseup', this.endMax);
    };

    render() {
        let {minValue, maxValue, x1, x2, valueLineWidth, valueLineStart} = this.state;

        return (
            <Root>
                <input value={minValue}/>
                <input value={maxValue}/>

                <Bar ref={this.line}>
                    <ValueLine width={valueLineWidth} start={valueLineStart}/>
                    <Handler value={x1} onMouseDown={this.startMin}/>
                    <Handler value={x2} onMouseDown={this.startMax}/>
                </Bar>
            </Root>
        );
    }
}

//region ====================== Styles ========================================

const Root = styled.div`
  padding: 30px 50px;
  height: 70vh;
`;

const Bar = styled.div`
  position: relative;
  height: 5px;
  background-color: #fff;
  -webkit-box-shadow: inset 0px 0px 3px 0px #000000;
  box-shadow: inset 0px 0px 3px 0px #000000;
  margin-top: 10px;
`;

const ValueLine = styled.div.attrs((props) => ({
    style: {
        width: props.width + 'px',
        left: props.start + 'px',
    }
}))`
  height: 100%;
  position: absolute;
  background: rgb(255, 0, 0);
  background: linear-gradient(90deg, rgba(255, 0, 0, 1) 0%, rgba(245, 255, 0, 1) 50%, rgba(1, 255, 0, 1) 100%);
  border: 1px solid black;
`;

const Handler = styled.div.attrs(props => ({
    style: {
        left: props.value + 'px',
    }
}))`
  position: absolute;
  height: 15px;
  width: 15px;
  border-radius: 50%;
  background-color: red;
  top: -6px;
  border: 1px solid black;
  box-shadow: 5px 5px 15px 0px #FF8080,
				-9px 5px 15px 0px #FFE488,
				-7px -5px 15px 0px #8CFF85,
				12px -5px 15px 0px #80C7FF,
				12px 10px 15px 2px #E488FF,
				-10px 10px 15px 2px #FF616B,
				-10px -7px 27px 1px #8E5CFF,
				inset 0px 0px 23px 3px rgba(0, 0, 0, 0);
`;

//endregion