'use strict';

var React = require('react-native');
var Jxon = require('jxon');
var SearchResults = require('./SearchResults');

var {
	View,
	Text,
	Component,
	TouchableHighlight,
	StyleSheet,
	ActivityIndicatorIOS,
	TextInput
} = React;

class SearchPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchString: '',
			isLoading: false,
			message: ''
		}
	}
	render() {
		var spinner = this.state.isLoading ? 
			(<ActivityIndicatorIOS
					hidden='true'
					size='large'/>) :
			(<View />);
		return(
			<View style={styles.container}>
				<Text style={styles.description}>
					Search for pets to adopt!
				</Text>
				<View style={styles.flowRight}>
					 <TextInput 
					 	style={styles.searchInput}
					 	value={this.state.searchString}
					 	onChange={this.onSearchTextChanged.bind(this)}
					 	placeholder='Search by zipcode'/>
					 <TouchableHighlight style={styles.button}
					 	underlayColor='#99D9F4'
					 	onPress={this.onSearchPressed.bind(this)}>
					 	<Text style={styles.buttonText}>
					 		Search
					 	</Text>
					 </TouchableHighlight>
				</View>
				{spinner}
				<Text style={styles.description}>
					{this.state.message}
				</Text>
			</View>
		);
	}

	onSearchTextChanged(event){
		this.setState({ searchString: event.nativeEvent.text});
	}

	onSearchPressed(){
		this.setState({isLoading: true});
		fetch('http://www.petango.com/webservices/wsadoption.asmx/AdoptableSearch?'+
		'authkey=uj36rnuzp324mmby22csi3mbfbt4y4p1h38ahympi8f5h6vyto&speciesID=&sex='+
		'&ageGroup=&location=&site=&onHold=&orderBy=&primaryBreed=&secondaryBreed='+
		'&specialNeeds=&noDogs=&noCats=&noKids=&stageID=')
			.then(response => Jxon.stringToJs(response._bodyText))// TODO: http status check
			.then(json => this._handleResponse(json))
			.catch(error => 
				this.setState({
					isLoading: false,
					message: 'Something bad happened: ' + error
				}));

	}

	_handleResponse(response){
		var data = [];
		for(var x in response.arrayofxmlnode.xmlnode){
			data.push(response.arrayofxmlnode.xmlnode[x].adoptablesearch);
		}

		this.setState({isLoading: false, message: ''});
		this.props.navigator.push({
			title: 'Results',
			component: SearchResults,
			passProps: {pets: data}
		});
	}
}

var styles = StyleSheet.create({
	description: {
		marginBottom: 20,
		fontSize: 18,
		textAlign: 'center',
		color: '#656565'
	},
	container: {
		padding: 30,
		marginTop: 65,
		alignItems: 'center'
	},
	flowRight: {
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'stretch'
	},
	buttonText: {
		fontSize: 18,
		color: 'white',
		alignSelf: 'center'
	},
	button: {
		height: 36, 
		flex: 1,
		flexDirection: 'row',
		backgroundColor: '#48BBEC',
		borderColor: '#48BBEC',
		borderWidth: 1,
		borderRadius: 8,
		marginBottom: 10,
		alignSelf: 'stretch',
		justifyContent: 'center'
	},
	searchInput: {
		height: 36,
		padding: 4,
		marginRight: 5,
		flex: 4,
		fontSize: 18,
		borderWidth: 1,
		borderColor: '#48BBEC',
		borderRadius: 8,
		color: '#48BBEC'
	},
	image: {
		width: 217,
		height: 138
	}
});

module.exports = SearchPage; 