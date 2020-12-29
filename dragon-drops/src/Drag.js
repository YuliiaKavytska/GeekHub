import React from 'react';
import styled from 'styled-components';

export default class Drag extends React.PureComponent {
    state={
        x: 0,
        y: 0,
    }

    lastX = 0;
    lastY = 0;

    startX = 0;
    startY = 0;

    containerRef = React.createRef();

    onDragStart = (e) => {
        this.startX = e.clientX;
        this.startY = e.clientY;

        this.rect = this.containerRef.current.getBoundingClientRect();

        document.body.addEventListener('mousemove', this.onDrag);
        document.body.addEventListener('mouseup', this.onDragEnd);
    };

    onDrag = (e) => {
        let currentX = this.lastX + e.clientX - this.startX;
        let currentY = this.lastY + e.clientY - this.startY;

        if (currentX < 0) {
           currentX = 0;
        } else if (currentX > this.rect.width - 100) {
            currentX = this.rect.width - 100;
        }

        if (currentY < 0) {
            currentY = 0;
        } else if (currentY > this.rect.height - 100) {
            currentY = this.rect.height - 100;
        }

        this.setState({x: currentX, y: currentY});
    };

    onDragEnd = (e) => {
        this.lastX = this.state.x;
        this.lastY = this.state.y;

        document.body.removeEventListener('mousemove', this.onDrag);
        document.body.removeEventListener('mouseup', this.onDragEnd);
    }

    render() {
        let {x, y} = this.state;
        return (
            <Container ref={this.containerRef}>
                <Root
                    x={x}
                    y={y}
                    onMouseDown={this.onDragStart}
                />
            </Container>
        );
    };
}

//region ========================= STYLE =================================


const Container = styled.div`
  height: 600px;
  width: 700px;
  border: 1px solid black;
  margin: 50px 0px 0px 50px;
  position: relative;
`;
const Root = styled.div.attrs(props => ({
    style: {
        top: props.y + 'px',
        left: props.x + 'px',
    }
}))`
  position: absolute;
  width: 100px;
  height: 100px;
  background-color: darkslateblue;
`;
//endregion