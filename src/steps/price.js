import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';

import StorageIcon from '@material-ui/icons/Storage';
import MoneyIcon from '@material-ui/icons/Money';
import PaymentIcon from '@material-ui/icons/Payment';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import TabletMacIcon from '@material-ui/icons/TabletMac'

class Data_store extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { classes, handleVote, answers, setButtonStep } = this.props;

		return (
			<>
				<Paper elevation={3} className={classes.paper}>
					<h4 style={{ textAlign: 'center', margin: 0 }}>Abonamet i cena</h4>
					<div style={{ marginTop: '20px' }}>
						Tu poznam, jaka forma rozliczania się jest dla Ciebie wygodniejsza. Dodatkowo możesz podać swoją propozycję ceny za używanie oprogramowania.
						<br />
						<br />
						<br />
						<FormControl component="fieldset" className={classes.input_elem}>
							<FormLabel component="legend"><PaymentIcon /> Jaki cykl rozliczenia odpowiada Ci najbardziej?</FormLabel>
							<RadioGroup aria-label="gender" defaultValue={answers.abonament} name="abonament" onChange={(event) => { handleVote(event.target.value, 'abonament') }}>
								<FormControlLabel value="monthly" control={<Radio color="primary" />} label="abonament miesięczny" />
								<FormControlLabel value="yearly" control={<Radio color="primary" />} label="abonament roczny" />
								<FormControlLabel value="once" control={<Radio color="primary" />} label="opłata jednorazowa" />
							</RadioGroup>
						</FormControl>
						<br />
						<FormControl component="fieldset" className={classes.input_elem}>
							<FormLabel component="legend"><MoneyIcon /> Jaką cenę jesteś w stanie zapłacić miesięcznie za używanie oprogramowania przy założeniu, że będzie z niego korzystać około {this.props.rand_persons} osób?</FormLabel>
							<Input
								fullWidth
								color="primary"
								defaultValue={answers.price}
								type="number"
								endAdornment={<InputAdornment position="end">zł</InputAdornment>}
								InputProps={{ inputProps: { min: 0 } }}
								onChange={(event) => { handleVote(event.target.value, 'price') }}
							/>
						</FormControl>
					</div>
					{setButtonStep}
				</Paper>
			</>
		)
	}
}
export default Data_store;