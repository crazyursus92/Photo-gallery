import React from 'react';

export default class Item extends React.Component{
	
	// Добавляем класс - делаем элемент активным
	getClass(active) {
		if (active) return 'list-item--active';
		return null;
	}

	render(){
		return this.props.items.map( (item) => {
			return ( 
				<li key={item.id} className = {this.getClass(item.active)}>
					<a onClick={ () => this.props.onClick(item.id) } href="javascript:void(0)">
						{item.title}
					</a>
				</li>
			)	
		})
		
	}
}
