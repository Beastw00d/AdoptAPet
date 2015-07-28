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
	ListView
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
				<View>
					<View style={styles.rowContainer}>
						<Image style={styles.thumb} source={{uri: rowData.photo}} />
						<View style={styles.textContainer}>
							<Text style={styles.title}>
								{rowData.name}
							</Text>
						</View>
						<View style={styles.separator}/>
					</View>
				</View>
			</TouchableHighlight>
		); 
	}

	rowPressed(pet) {

		this.props.navigator.push({
			title: "Pet Details",
			component: PetDetails,
			passProps: {pet : pet}
		});
	}
}

var styles = StyleSheet.create({
	thumb: {
		width: 120,
		height: 120,
		borderRadius: 60,
		marginRight: 10
	},
	textContainer: {
		flex: 1
	},
	separator: {
		height: 1,
		backgroundColor: '#dddddd'
	},
	title: {
		fontSize: 20,
		color: '#656565'
	},
	rowContainer: {
		flexDirection: 'row',
		padding: 10
	},
});


module.exports = SearchResults;