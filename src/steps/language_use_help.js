import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { ButtonList } from '../components';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';

import LanguageIcon from '@material-ui/icons/Language';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import TuneIcon from '@material-ui/icons/Tune';
import HelpIcon from '@material-ui/icons/Help';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';

const names = ["angielski", "arabski", "bengalski", "chiński", "francuski", "gudźarati", "hindi", "hiszpański", "japoński", "jawajski", "kantoński", "koreański", "malajalam", "marathi", "minnański", "niemiecki", "pendżabski", "perski", "portugalski", "rosyjski", "tajski", "tamilski", "telugu", "turecki", "ukraiński", "urdu", "wietnamski", "włoski", "wu"];

class Language_use_help extends Component {
	constructor(props) {
		super(props)
	}

	getStyles(name, languages) {
		return {
			fontWeight: (languages === undefined || languages.indexOf(name) === -1) ? 400 : 500,
		};
	}

	render() {
		const { classes, handleVote, answers, setButtonStep } = this.props;

		return (
			<>
				<Paper elevation={3} className={classes.paper}>
					<h4 style={{ textAlign: 'center', margin: 0 }}>Język i pomoc</h4>
					<div style={{ marginTop: '20px' }}>
						Na podstawie tych odpowiedzi dowiem się, {(answers.calatogue_any_data == 'y' && (answers.calatogue_future_electronic == 'y' || answers.calatogue_electronic_data == 'y'))?'jakie są Twoje preferencje językowe oraz ':''}jak często korzystasz z pomocy dołączonych do oprogramowania.
						<br />
						<br />
						<br />
						{(answers.calatogue_any_data == 'y' && (answers.calatogue_future_electronic == 'y' || answers.calatogue_electronic_data == 'y'))?<>
						<FormControl component="fieldset" className={classes.input_elem}>
							<FormLabel component="legend"><LanguageIcon /> Jakie języki, po za Polskim, powinny być ostępne do obsługi systemu? Wybierz 2 najbardziej piorytetowe:</FormLabel>
							<Select
								fullWidth
								color="primary"
								multiple
								value={(Array.isArray(answers.languages)) ? answers.languages : []}
								onChange={(event) => {
									const { value } = event.target;
									if (value.length < 3)
										handleVote(value, 'languages');
								}}
							>
								{names.map((name) => (
									<MenuItem key={name} value={name} style={this.getStyles(name, answers.languages)}>
										{name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<br />
						<br /></>:null}
						<FormControl component="fieldset" className={classes.input_elem}>
							<FormLabel component="legend"><TouchAppIcon /> Jak często korzystasz z samouczka?</FormLabel>
							<ButtonList
								array={[
									{ 1: 'Nigdy - 1' },
									{ 2: '2' },
									{ 3: '3' },
									{ 4: '4' },
									{ 5: '5 - Zawsze' }
								]}
								ansver={(answers.vote_tutorial != undefined) ? answers.vote_tutorial : null}
								name='vote_tutorial'
								getValue={handleVote}
								{...this.props} />
						</FormControl>
						<br />
						<br />
						<FormControl component="fieldset" className={classes.input_elem}>
							<FormLabel component="legend"><TuneIcon /> Jak często używasz kreatora pierwszej konfiguracji?</FormLabel>
							<ButtonList
								array={[
									{ 1: 'Nigdy - 1' },
									{ 2: '2' },
									{ 3: '3' },
									{ 4: '4' },
									{ 5: '5 - Zawsze' }
								]}
								ansver={(answers.vote_creator != undefined) ? answers.vote_creator : null}
								name='vote_creator'
								getValue={handleVote}
								{...this.props} />
						</FormControl>
						<br />
						<br />
						<FormControl component="fieldset" className={classes.input_elem}>
							<FormLabel component="legend"><HelpIcon /> Jak często zaglądasz do pomocy dołączonej do oprogramowania?</FormLabel>
							<ButtonList
								array={[
									{ 1: 'Nigdy - 1' },
									{ 2: '2' },
									{ 3: '3' },
									{ 4: '4' },
									{ 5: '5 - Zawsze' }
								]}
								ansver={(answers.vote_help != undefined) ? answers.vote_help : null}
								name='vote_help'
								getValue={handleVote}
								{...this.props} />
						</FormControl>
						<br />
						<br />
						<FormControl component="fieldset" className={classes.input_elem}>
							<FormLabel component="legend"><DesktopWindowsIcon /> Jaka jest Twoja umiejętność obsługi komutera?</FormLabel>
							<ButtonList
								array={[
									{ 1: 'Bardzo słaba - 1' },
									{ 2: '2' },
									{ 3: '3' },
									{ 4: '4' },
									{ 5: '5 - Badzo dobra' }
								]}
								ansver={(answers.vote_pc_use != undefined) ? answers.vote_pc_use : null}
								name='vote_pc_use'
								getValue={handleVote}
								{...this.props} />
						</FormControl>
					</div>
					{setButtonStep}
				</Paper>
			</>
		)
	}
}
export default Language_use_help;