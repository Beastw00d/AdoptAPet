'use strict';

var React = require('react-native');

var {
	View,
	Text,
	Image,
	Component,
	StyleSheet
} = React;

class PetDetails extends Component {

	render(){
		var pet = this.props.pet;
		return (
			<View style={styles.container}>
				<Image style={styles.image}
					source={{uri: pet.photo}} />
				<View style={styles.heading}>
					<Text style={styles.title}>{pet.name}</Text>
					<View style={styles.separator}/>
				</View>
				<Text style={styles.description}>{pet.age}</Text>
				<Text style={styles.description}>{pet.sex} </Text>
				<Text style={styles.description}>{pet.species} </Text>
				<Text style={styles.description}>{pet.primarybreed}</Text>
			</View>
		);
	}
}

var styles = StyleSheet.create({
	container: {
		marginTop: 65
	},
	heading: {
		backgroundColor: '#F8F8F8'
	},
	separator: {
		height: 1,
		backgroundColor: '#DDDDDD'
	},
	image: {
		width: 400,
		height: 300
	},
	price: {
		fontSize: 25,
		fontWeight: 'bold',
		margin: 5,
		color: '#48BBEC'
	},
	title: {
		fontSize: 20,
		margin: 5,
		color: '#656565'
	},
	description: {
		fontSize: 18,
		margin: 5,
		color: '#656565'
	}
});

module.exports = PetDetails;