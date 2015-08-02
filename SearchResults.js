'use strict';

var React = require('react-native');

var PetDetails = require('./PetDetails');

var {
	Text,
	View,
	StyleSheet,
	Image,
	Component,
	TouchableHighlight,
	ListView,
} = React;


class SearchResults extends Component {
	constructor(props){
		super(props);
		var dataSource = new ListView.DataSource(
			{rowHasChanged: (r1, r2) => r1.id !== r2.id});
		this.state = {
			dataSource: dataSource.cloneWithRows(this.props.pets)
		};
	}

	render() {
		return(
			<ListView
				dataSource={this.state.dataSource}
				renderRow={this.renderRow.bind(this)}/>
		);
	}

	renderRow(rowData, sectionID, rowID){
		return (
			<TouchableHighlight onPress={() => this.rowPressed(rowData)}
				underlayColor='#dddddd'>
				<View style={styles.row}>
					<Image style={styles.cellImage} source={{uri: rowData.photo}} />
					<View style={styles.textContainer}>
						<Text style={styles.title} numberOfLines={2}>
							{rowData.name}
						</Text>
						<Text style={styles.species} numberOfLines={1}>
							{rowData.species}
						</Text>
						<Text style={styles.species} numberOfLines={1}>
							{rowData.agegroup}
						</Text>
						<Text style={styles.species} numberOfLines={1}>
							{rowData.sex}
						</Text>
						<Text style={styles.species} numberOfLines={1}>
							{rowData.primarybreed}
						</Text>
					</View>
					<View style={styles.separator}/>
				</View>
			</TouchableHighlight>
		); 
	}

	rowPressed(pet) {
		fetch('http://www.petango.com/webservices/adoptablesearch/'+
			'wsAdoptableAnimalDetails.aspx?id=' +
			pet.id) // check the status of the request
			.then(response =>  {
				var data = parseHtml(response._bodyText)
				data.name = pet.name;
				data.photo = pet.photo;
				return data;
			})
			.then(json => 
				this.props.navigator.push({
					title: "Pet Details",
					component: PetDetails,
					passProps: {pet: json}
				})
			)
			.catch(exception =>  console.log(exception));
	}
}

function parseHtml(html) {
	html = html.substring(html.lastIndexOf('AnimalID') + 10);
	var id = html.slice(0, html.indexOf('</span>'));
	html = html.substring(html.lastIndexOf('Species') + 9);
	var species = html.slice(0, html.indexOf('</span>'));
	html = html.substring(html.lastIndexOf('Breed') + 7);
	var breed = html.slice(0, html.indexOf('</span>'));
	html = html.substring(html.lastIndexOf('Age') + 5);
	var age = html.slice(0, html.indexOf('</span>'));
	html = html.substring(html.lastIndexOf('Sex') + 5);
	var sex = html.slice(0, html.indexOf('</span>'));
	html = html.substring(html.lastIndexOf('Size') + 6);
	var size = html.slice(0, html.indexOf('</span>'));
	html = html.substring(html.lastIndexOf('Color') + 7);
	var color = html.slice(0, html.indexOf('</span>'));

	//add altered spayed/neutered


	html = html.substring(html.lastIndexOf('Declawed') + 10);
	var declawed = html.slice(0, html.indexOf('</span>'));
	html = html.substring(html.lastIndexOf('Site') + 6);
	var site = html.slice(0, html.indexOf('</span>'));
	html = html.substring(html.lastIndexOf('Location') + 10);
	var location = html.slice(0, html.indexOf('</span>'));
	html = html.substring(html.lastIndexOf('IntakeDate') + 12);
	var intakeDate = html.slice(0, html.indexOf('</span>'));
	html = html.substring(html.lastIndexOf('Price') + 7);
	var price = html.slice(0, html.indexOf('</span>'));
	return  {
		id: id,
		species: species,
		breed: breed,
		age: age,
		sex: sex,
		size: size,
		color: color,
		declawed: declawed,
		site: site,
		location: location,
		intakeDate: intakeDate,
		price: price
	};

}

var styles = StyleSheet.create({
	cellImage: {
		backgroundColor: '#dddddd',
    	height: 93,
    	marginRight: 10,
    	width: 60,
	},
	textContainer: {
		flex: 1
	},
	separator: {
		height: 1,
		backgroundColor: '#dddddd'
	},
	title: {
		flex: 1,
    	fontSize: 16,
    	fontWeight: '500',
    	marginBottom: 2,
	},
	row: {
		alignItems: 'center',
		backgroundColor: 'white',
		flexDirection: 'row',
		padding: 5
	},
	species: {
		color: '#999999',
		fontSize: 12,
	}
});


module.exports = SearchResults;