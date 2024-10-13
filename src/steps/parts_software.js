import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { ButtonList } from '../components';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';


import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import Checkbox from '@material-ui/core/Checkbox';

import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import EditIcon from '@material-ui/icons/Edit';

class Parts_software extends Component {
	constructor(props) {
		super(props);
		this.state = {
			values: []
		}
		this.get_values = this.get_values.bind(this);
	}
	get_values(event, isChecked, value) {
		const { handleVote } = this.props;
		if (isChecked) {
			this.setState({ values: this.state.values.concat([value]) }, () => {
				handleVote(this.state.values, 'segments_use');
			});
		} else {
			var array = [...this.state.values];
			var index = array.indexOf(value)
			if (index !== -1) {
				array.splice(index, 1);
				this.setState({ values: array }, () => {
					handleVote(this.state.values, 'segments_use');
				});
			}
		}
	}
	componentDidMount() {
		const { answers } = this.props;
		this.setState({ values: answers.segments_use || [] });
	}
	render() {
		const { classes, handleVote, answers, setButtonStep } = this.props;
		const segments = [
			{ 'label': 'faktury', 'value': 'f' },
			{ 'label': 'katalogowanie napraw', 'value': 'c_r' },
			{ 'label': 'katalogowanie produktów', 'value': 'c_p' },
			{ 'label': 'katalogowanie wykonanych usług dla klientów', 'value': 'c_s_c' },
			{ 'label': 'kontrahenci', 'value': 'c' },
			{ 'label': 'księgowość', 'value': 'b' },
			{ 'label': 'lista pracownicza', 'value': 'w_l' },
			{ 'label': 'magazyn', 'value': 'm' },
			{ 'label': 'moduł dostępu do statusu usługi/naprawy/potwierdzenia rezerwacji dla klientów', 'value': 's_s_c' },
			{ 'label': 'moduł usługi drukowania', 'value': 'm_p_s' },
			{ 'label': 'przyjecie towaru', 'value': 'r_p' },
			{ 'label': 'RMA', 'value': 'r' },
			{ 'label': 'sprzedaż', 'value': 's' },
			{ 'label': 'wysyłka towaru', 'value': 'p_s' },

		]
		return (
			<>
				<Paper elevation={3} className={classes.paper}>
					<h4 style={{ textAlign: 'center', margin: 0 }}>Rodzaj, kategoria danych</h4>
					<div style={{ marginTop: '20px' }}>
						Na podstawie tych informacji będę w stanie określić jakie "moduły" oprogramowania są używane w Twojej firmie.
						<br />
						<br />
						<br />
						<FormControl component="fieldset" className={classes.input_elem}>
							<FormLabel component="legend"><ViewModuleIcon /> Jakiego rodzaju dane {(answers.calatogue_any_data == 'y' && answers.calatogue_electronic_data == 'n' && answers.calatogue_future_electronic != 'n' || answers.calatogue_any_data == 'n' && answers.calatogue_future_data != 'n') ? 'planujesz katalogować/przechowywać' : 'katalogujesz/przechowujesz'} w firmie?</FormLabel>
							<FormGroup>
								{segments.map((s) => {
									return (<FormControlLabel
										control={<Checkbox name="segments" color="primary" />}
										label={s.label}
										value={s.value}
										checked={(answers.segments_use != undefined) ? answers.segments_use.indexOf(s.value) !== -1 : false}
										onChange={(e) => { this.get_values(e, e.target.checked, e.target.value) }}
									/>)
								})}
							</FormGroup>
						</FormControl>
						<br />
						<br />
						{(answers.calatogue_any_data == 'y' && answers.calatogue_electronic_data == "y" || answers.calatogue_any_data == 'y' && answers.calatogue_electronic_data == undefined) ? <>
							<FormControl component="fieldset" className={classes.input_elem}>
								<FormLabel component="legend"><ThumbUpIcon /> Czy oprogramowanie firmowe spełnia Twoje potrzeby, oczekiwania?</FormLabel>
								<ButtonList
									array={[
										{ 1: 'Nie spełnia - 1' },
										{ 2: '2' },
										{ 3: '3' },
										{ 4: '4' },
										{ 5: '5 - Spełnia' }
									]}
									ansver={(answers.vote_software != undefined) ? answers.vote_software : null}
									name='vote_software'
									getValue={handleVote}
									{...this.props} />
							</FormControl>
							<br />
							<br /></> : null}
						<FormControl component="fieldset" className={classes.input_elem}>
							<FormLabel component="legend"><EditIcon /> Co można zmienić {(answers.calatogue_any_data == 'y' && answers.calatogue_electronic_data == "y") ? 'w oprogramowaniu firmowym' : 'w sposobie przechowywania danych w firmie'}, czego Ci brakuje?</FormLabel>
							<TextField
								fullWidth
								color="primary"
								rows={4}
								multiline
								defaultValue={answers.software_descr_changes}
								onChange={(event) => { handleVote(event.target.value, 'software_descr_changes') }}
							/>
						</FormControl>
					</div>
					{setButtonStep}
				</Paper>
			</>
		)
	}
}
export default Parts_software;