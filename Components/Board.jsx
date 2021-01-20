import Column from './Column'
import './index.css';


export default class Board extends React.Component {
    renderColumn(i) {
        return (
            <Column squares = {this.props.gameBoard[i]} 
                    onClick = {() => this.props.onClick(i)}
            />
        )
    }

    render () {
        return(
        <div>
            {this.renderColumn(6)}
            {this.renderColumn(5)}
            {this.renderColumn(4)}
            {this.renderColumn(3)}
            {this.renderColumn(2)}
            {this.renderColumn(1)}
            {this.renderColumn(0)}
        </div>
        )
    }
}