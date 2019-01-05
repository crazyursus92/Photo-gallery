import React from 'react';
import {getData} from '../index.js';
import Item from './Item';

export default class List extends React.Component {
	constructor(props){
		super(props);
		this.state={
			list: [
				{
					id: null,
					title: null,
					active: false
				}				
			]
		};

	}

	// Обновялем состояние активного элемента + передаем выбранный элемент наверх
	handleUpdateList(id){
		this.props.onChange(id);
		this.setState({list: this.state.list.map((item) => {
			item.id === id ? item.active = true : item.active = false;
			return item;
		})});
	}

	componentDidMount() {
		getData(this.props.object)
			.then(data => {
				this.setState( {list: data.map((item, index) => {
					return {
						id: item.id,
						title: item.title,
						active: false
					}
				}
				)});	
			});
	}

	render() {
		return <ul><Item items={this.state.list} onClick = {(id) => this.handleUpdateList(id)} /></ul>;
	}
}
