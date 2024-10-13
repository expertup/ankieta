import React, { Component } from 'react';
import ReactDOM from 'react-dom';

//import i18n from './i18n';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import StorageIcon from '@material-ui/icons/Storage';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import TabletMacIcon from '@material-ui/icons/TabletMac';

class Data_store extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		const { classes, handleVote, answers, setButtonStep } = this.props;

		return (
			<>
				<Paper elevation={3} className={classes.paper}>
					<h4 style={{ textAlign: 'center', margin: 0 }}>Przechowywanie danych</h4>
					<div style={{ marginTop: '20px' }}>
					Zaznacz jaki sposób przechowywania danych preferujesz oraz dostęp do nich, przy założeniu, że w każdej chwili, bezpłatnie możesz wyeksportować (pobrać) dane.
						<br />
						<br />
						<br />
						<FormControl component="fieldset" className={classes.input_elem}>
							<FormLabel component="legend"><StorageIcon /> Baza danych, czyli miejsce przechowywania danych powinno być:</FormLabel>
							<RadioGroup aria-label="gender" defaultValue={answers.data_store} name="data_store" onChange={(event) => { handleVote(event.target.value, 'data_store') }}>
								<FormControlLabel value="data_online" control={<Radio color="primary" />} label={<div>online/w chmurze, czyli na zewnętrznym serwerze<small>(zaletą przechowywania danych na naszym serwerze jest brak konieczności konfiguracji)</small></div>} />
								<FormControlLabel value="data_offline" control={<Radio color="primary" />} label={<div>offline, czyli na firmowym, domowym komputerze<small>(zaletą przechowywania danych lokalnie jest umiejscowienie danych na miejscu w siedzibie firmy, wadą jest złożność konfiguracji systemu)</small></div>} />
							</RadioGroup>
						</FormControl>
						<br />
						<FormControl component="fieldset" className={classes.input_elem}>
							<FormLabel component="legend"><SwapHorizIcon /> Dostęp do systemu zarządzania danymi powinien być:</FormLabel>
							<RadioGroup aria-label="gender" defaultValue={answers.allow_store} name="allow_store" onChange={(event) => { handleVote(event.target.value, 'allow_store') }}>
								<FormControlLabel value="allow_any" control={<Radio color="primary" />} label={<div>dostępny zdalnie w każdej chwili, z każdego miejsca na świecie i o każdej porze</div>} />
								<FormControlLabel value="local_only" control={<Radio color="primary" />} label={<div>tylko w firmie w której pracuję, bez dostępu spoza miejsca pracy</div>} />
							</RadioGroup>
						</FormControl>
						<br />
						<FormControl component="fieldset" className={classes.input_elem}>
							<FormLabel component="legend"><TabletMacIcon /> Dostep do systemu zarządzania danymi powinien być dostosowany do:</FormLabel>
							<RadioGroup aria-label="gender" defaultValue={answers.allow_access} name="allow_access" onChange={(event) => { handleVote(event.target.value, 'allow_access') }}>
								<FormControlLabel value="desktop" control={<Radio color="primary" />} label={<div>komputerów stacjonarnych i laptopów</div>} />
								<FormControlLabel value="mobile" control={<Radio color="primary" />} label={<div>urządzeń mobilnych tj. tablety, telefony komórkowe</div>} />
								<FormControlLabel value="desktop_mobile" control={<Radio color="primary" />} label={<div>do obu z powyższych</div>} />
							</RadioGroup>
						</FormControl>
					</div>
					{setButtonStep}
				</Paper>
			</>
		)
	}
}
export default Data_store;