import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Images from './components/Images';
import List from './components/List';

const apiLocation = 'https://api.unsplash.com/';
const userAccessKey = '/?client_id=1c9cdfe7008e8accf5df7453bf2548202bc55308c810ec1ff83bdefcf3afd991';

class App extends React.Component {
	constructor(props){
		super(props);
		this.state={selectedItem: null};
	}

	render() {
		return (
			<div className='container'>
				<div className='header'>
					<h1 className='text-center'>Unsplash photo gallery</h1>
				</div>
				
				<div className='list-block'>
					<h2 className='text-center'>{this.props.title}</h2>
					<List object={this.props.obj} onChange = {(id) => this.setState({selectedItem: id}) } />
				</div>
				
				<div className='images-block'>
					<Images object = {this.props.obj} selectedItem = {this.state.selectedItem} />
				</div>
				
			</div>
		) 
	}
}

// Получение данных от сервера
export function getData(object) {
	let objectLocation = apiLocation + object + userAccessKey;

	return fetch(objectLocation)
			.then(res => res.json())
			.then(data => data)
}

ReactDOM.render(
	<App title='Galleries' obj='collections'/>,
	document.getElementById('root')
)
 
