import React from 'react';
import {getData} from '../index.js';

export default class Images extends React.Component {
	constructor(props){
		super(props);
		this.state={imgList: props.object, selectedImg: ''};
		this.request = props.object;
	}
	
	// Подгрузка изображений выбранной коллекции
	componentDidUpdate(prevProps) {
		if (this.props.selectedItem !== prevProps.selectedItem) {
			this.request = this.props.object + '/' + this.props.selectedItem + '/photos';
			getData(this.request)
				.then(data => {
					this.setState({imgList: data.map( (item) =>  <img key={item.id} onClick = {() => this.uploadImg(item.id)} src={item.urls.small} alt='картинка' />  )});
				})
		}	
	}

	// Подгрузка одного изображения
	uploadImg(imgId) {
		this.request = 'photos/' + imgId;
		getData(this.request)
			.then(data => {
				this.setState({imgList: <div><h2>{data.description}</h2><img className='full-image' key={data.id} src={data.urls.full} alt='картинка' /></div> });
			})
		
	}

	// Первичная подгрузка изображений коллекции по умолчанию
	componentDidMount() {
		getData(this.request)
			.then(data => {
				this.setState({imgList: data.map( (item) =>  <img key={item.id} src={item.cover_photo.urls.small} alt='картинка' /> )});
			})
	}

	render() {
		return <div className='wrapper'>{this.state.imgList}</div>	
	}
}
