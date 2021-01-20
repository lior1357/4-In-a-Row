import './index.css';
import Square from './Square'

export default class Column extends React.Component {

    renderSquare(i){
        return (
            <Square value = {this.props.squares[i]}/>
        )
    }

    render() {
        return(
            <button onClick={this.props.onClick}>
                <div>{this.renderSquare(5)}</div>
                <div>{this.renderSquare(4)}</div>
                <div>{this.renderSquare(3)}</div>
                <div>{this.renderSquare(2)}</div>
                <div>{this.renderSquare(1)}</div>
                <div>{this.renderSquare(0)}</div>
            </button>
        )
    }
}

