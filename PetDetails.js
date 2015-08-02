'use strict';

var React = require('react-native');

var {
	View,
	Text,
	Image,
	Component,
	ScrollView,
	PixelRatio,
	StyleSheet
} = React;

class PetDetails extends Component {

	render(){
		var pet = this.props.pet;
		return (
			<ScrollView contentContainerStyle={styles.contentContainer}>
				<View style={styles.mainSection}>
					<Image style={styles.detailsImage}
						source={{uri: pet.photo}} />
					<View style={styles.rightPane}>
						<Text style={styles.title}>{pet.name}</Text>
						<Text style={styles.description}>{pet.species}</Text>
						<Text style={styles.description}>{pet.breed} </Text>
						<Text style={styles.description}>{pet.age} </Text>
						<Text style={styles.description}>{pet.sex}</Text>
					</View>
				</View>
				<View style={styles.separator} />
				<Text style={styles.descriptionTitle}>Size:</Text>
				<Text style={styles.description}>{pet.size}</Text>
				<Text style={styles.descriptionTitle}>Color:</Text>
				<Text style={styles.description}>{pet.color} </Text>
				<Text style={styles.descriptionTitle}>Declawed:</Text>
				<Text style={styles.description}>{pet.declawed}</Text>
				<Text style={styles.descriptionTitle}>Site:</Text>
				<Text style={styles.description}>{pet.site}</Text>
				<Text style={styles.descriptionTitle}>Location:</Text>
				<Text style={styles.description}>{pet.location}</Text>
				<Text style={styles.descriptionTitle}>Intake Date:</Text>
				<Text style={styles.description}>{pet.intakeDate} </Text>
				<Text style={styles.descriptionTitle}>Price: </Text>
				<Text style={styles.description}>{pet.price}</Text>
			</ScrollView>
		);
	}
}

var styles = StyleSheet.create({
	contentContainer: {
		padding: 10,
	},
	rightPane: {
		justifyContent: 'space-between',
		flex: 1,
	},
	title: {
		flex: 1,
		fontSize: 16,
		fontWeight: '500',
		paddingBottom: 20,
	},
	mainSection: {
		flexDirection: 'row',
	},
	detailsImage: {
		width: 134,
		height: 200,
		backgroundColor: '#eaeaea',
		marginRight: 10,
	},
	separator: {
		backgroundColor: 'rgba(0,0,0,0.1)',
		height: 1 / PixelRatio.get(),
		marginVertical: 10
	},
	description: {
		fontSize: 13,
		paddingBottom: 10,
	},
	descriptionTitle: {
		fontSize: 14,
		fontWeight: '500'
	}
});

module.exports = PetDetails;