import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

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
					<List object={this.props.obj} activeItem={this.state.selectedItem} onChange = { (id) => this.setState({selectedItem: id}) } />
				</div>
				
				<div className='images-block'>
					<Images object = {this.props.obj} selectedItem = {this.state.selectedItem} />
				</div>
				
			</div>
		) 
	}
}


// Список коллекций
class List extends React.Component {
	constructor(props){
		super(props);
		this.state={list: null};
	}

	componentDidMount() {
		console.log('List DidMount');
		getData(this.props.object)
			.then(data => {
				this.setState( {list: data.map((item, index) => {
					
					// Задаем активным первый элемент по умолчанию и передаем id коллекции для компонента Images
					if (this.props.activeItem === null && index === 0) {
						this.props.onChange(item.id); 
						return (
							<li key={item.id}>
								<a className='list-item--active' onClick={() => {this.props.onChange(item.id)}}  href="void:javascript">{item.title}</a>
							</li>
						)	
					
					} else 
						return (
							<li key={item.id}>
								<a onClick={() => {this.props.onChange(item.id)}}  href="void:javascript">{item.title}</a>
							</li>
						)
				}	
			)});	
		});
	}

	render() {
		return <ul>{this.state.list}</ul>;
	}
}

// Блок с изображениями
class Images extends React.Component {
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

// Получение данных от сервера
function getData(object) {
	let objectLocation = apiLocation + object + userAccessKey;
			
	return fetch(objectLocation)
			.then(res => res.json())
			.then(data => (data))
}

ReactDOM.render(
	<App title='Galleries' obj='collections'/>,
	document.getElementById('root')
)
 
