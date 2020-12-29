import React from 'react';
import styled from 'styled-components';

export default class Slider extends React.PureComponent {
    state = {
        min: this.props.min,
        max: this.props.max,
        value: this.props.value,
        x: 0,
    }

    lastX = 0;
    clickStart = 0;
    line = React.createRef();

    componentDidMount() {
        this.lineBar = this.line.current.getBoundingClientRect();

        this.deltaIn = ((this.lineBar.width - 17) / (this.state.max - this.state.min)); // переводим велью в пиксели
        this.deltaOut = ((this.state.max - this.state.min) / (this.lineBar.width - 17)); // пиксели в велью

        let startX = (this.state.value - this.state.min) * this.deltaIn;

        this.setState({x: startX});
        this.lastX = startX; // px
    }

    onStart = (e) => {
        this.clickStart = e.clientX;

        document.body.addEventListener('mousemove', this.mouseMove);
        document.body.addEventListener('mouseup', this.mouseStop)
    }

    mouseMove = (e) => {
        let currentX = this.lastX + e.clientX - this.clickStart;

        if (currentX < 0) {
            currentX = 0;
        } else if (currentX > this.lineBar.width - 17) {
            currentX = this.lineBar.width - 17;
        }

        let currentValue = Math.round(currentX * this.deltaOut + this.state.min);

        this.setState({
            value: currentValue,
            x: currentX
        })
    }

    mouseStop = (e) => {
        this.lastX = this.state.x;

        document.body.removeEventListener('mousemove', this.mouseMove);
        document.body.removeEventListener('mouseup', this.mouseStop);
    }

    render() {
        let {value, x} = this.state;
        return (
            <Root>
                <input value={value}/>

                <Bar ref={this.line}>
                    <ValueLine width={x}/>
                    <Handler
                        onMouseDown={this.onStart}
                        x={x}
                    />
                </Bar>
            </Root>
        );
    }
}

//region ====================== Styles ========================================

const Root = styled.div`
  padding: 30px 50px;
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
		width: props.width,
	}
}))`
  height: 100%;
  position: absolute;
  left: 0;
  background: rgb(255, 0, 0);
  background: linear-gradient(90deg, rgba(255, 0, 0, 1) 0%, rgba(245, 255, 0, 1) 50%, rgba(1, 255, 0, 1) 100%);
  border: 1px solid black;
`;

const Handler = styled.div.attrs(props => ({
    style: {
        left: props.x + 'px',
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