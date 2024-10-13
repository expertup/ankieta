//import fetch from 'cross-fetch';

import 'whatwg-fetch';
import ls from 'local-storage'

import React from 'react';
import ReactDOM from 'react-dom';
import Mailto from 'react-protected-mailto'

import Start from './steps/start';
import Profesion_sector from './steps/profesion_sector';
import Parts_software from './steps/parts_software';
import Data_store from './steps/data_store';
import Language_use_help from './steps/language_use_help';
import Price from './steps/price';
import Finish from './steps/finish';

import './style.css'

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import withWidth from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/core/styles';
import { red } from "@material-ui/core/colors";
import { indigo } from "@material-ui/core/colors";
import green from "@material-ui/core/colors/green";
import grey from "@material-ui/core/colors/grey";

import CssBaseline from '@material-ui/core/CssBaseline'

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import SendIcon from '@material-ui/icons/Send';
import ErrorIcon from '@material-ui/icons/Error';
import DoneIcon from '@material-ui/icons/Done';
import CircularProgress from '@material-ui/core/CircularProgress';


import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';

const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

const styles = theme => ({
	textContainer: {
		width: '80%',
		textAlign: 'left',
		marginLeft: 'auto',
		marginRight: 'auto',
	},
	paper: {
		padding: '1em',
		boxSizing: 'border-box',
		margin: '2em auto 0 auto',
		'& p': {
			textAlign: 'left'
		},
		[theme.breakpoints.up('xs')]: {
			width: '100%',
		},
		[theme.breakpoints.up('sm')]: {
			width: '80%',
		},
		[theme.breakpoints.up('md')]: {
			width: '60%',
		},
	},
	input_elem: {
		margin: "0 auto",
		display: 'block',
		[theme.breakpoints.up('xs')]: {
			width: '100%',
		},
		[theme.breakpoints.up('sm')]: {
			width: '80%',
		},
		[theme.breakpoints.up('md')]: {
			width: '80%',
		},
	},
	write_email: {
		[theme.breakpoints.up('xs')]: {
			width: '90%',
		},
		[theme.breakpoints.up('sm')]: {
			width: '40%',
		},
	},
	input_email: {
		margintop: 'unset',
		width: '100%'
	},
	dialogContent:{
		display: 'flex',
		'& button':{
			marginTop: '1em'
		},
		[theme.breakpoints.up('xs')]: {
			flexDirection: 'column',
			'& button':{
				width: '110px',
				marginLeft: 'auto',
				marginRight: 'auto'
			}
		},
		[theme.breakpoints.up('sm')]: {
			flexDirection: 'row',
			'& button':{
				marginLeft: '0.5em',
				marginTop: 'unset'
			}
		}
	},
	button_space: {
		margin: '0 0.3em'
	},
	align_center: {
		textAlign: 'center'
	},
	buttonOutlinedPrimary: {
		backgroundColor: '#6d4c41',
		color: 'white',
		'&:hover': {
			backgroundColor: 'rgb(76, 53, 45)'
		}
	},
	linkshare: {
		color: indigo[800]
	},
	containedGreen: {
		color: theme.palette.getContrastText(green[600]),
		backgroundColor: green[600],
		"&:hover": {
			backgroundColor: green[700],
			// Reset on touch devices, it doesn't add specificity
			"@media (hover: none)": {
				backgroundColor: green[600]
			}
		}
	},
	containedRed: {
		color: theme.palette.getContrastText(red[600]),
		backgroundColor: red[600],
		"&:hover": {
			backgroundColor: red[700],
			// Reset on touch devices, it doesn't add specificity
			"@media (hover: none)": {
				backgroundColor: red[600]
			}
		}
	},
	footer: {
		marginTop: 'auto',
		textAlign: 'center',
		'& button': {
			display: 'inline-block',
			margin: '2em 1em 0 1em'
		},
		'& .text': {
			marginTop: '2em',
			display: 'inline-block',
			padding: '0.5em',
			fontWeight: 500
		}
	},
	dialogHead: {
		width: '100%',
		textAlign: 'center',
		lineHeight: '48px'
	},
	dialogRoot: {
		margin: 0,
		padding: '4px',
	},
});

const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#6d4c41"
		},
		secondary: {
			main: "#3e2723"
		},
		error: {
			main: red.A400
		}
	},
	overrides: {
		MuiCssBaseline: {
			'@global': {
				'small': {
					display: 'block',
					marginBottom: '0.4em',
				},
				'legend svg': {
					verticalAlign: 'middle',
					position: 'relative',
					top: '-2px',
					marginRight: '2px'
				},
				'body': {
					backgroundColor: 'transparent'
				}
			}
		},
		MuiToggleButton: {
			root: {
				height: 'auto',
				minHeight: '48px'
			}
		},
		MuiToggleButtonGroup: {
			grouped: {
				padding: '0px 17px 0px 19px',
				color: 'rgba(0, 0, 0, 0.54)'
			}
		},
		MuiStepper: {
			root: {
				margin: 0,
				padding: 0,
			}
		},
		MuiFormControlLabel: {
			root: {
				marginTop: '0.1em',
				marginBottom: '0.1em',
			}
		},
		MuiFormGroup: {
			root: {
				marginTop: '0.5em',
				marginBottom: '0.7em',
			}
		},
		MuiFormLabel:{
			root:{
				display: 'inline'
			}
		},
		MuiSelect: {
			root: {
				marginTop: '5px'
			}
		},
		MuiButton: {
			containedSecondary: {
				color: '#fff !important',
				boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2) !important, 0px 2px 2px 0px rgba(0,0,0,0.14) !important, 0px 1px 5px 0px rgba(0,0,0,0.12) !important',
				backgroundColor: '#3e2723 !important'
			}
		},
		MuiTypography:{
			h6:{
				display: 'flex'
			}
		}
	},
});

function randomIntFromInterval(min, max) { // min and max included 
	return Math.floor(Math.random() * (max - min + 1) + min);
}
const isEmpty = function (o) {
	for (var key in o) {
		if (o.hasOwnProperty(key))
			return false;
	}
	return true;
}

class Questions extends React.Component {
	constructor(props) {
		super(props)
		this.handleVote = this.handleVote.bind(this);
		this.render_steps = this.render_steps.bind(this);
		this.setStep = this.setStep.bind(this);
		this.set_state = this.set_state.bind(this);
		this.set_visiblity = this.set_visiblity.bind(this);
		this.render_curent_step = this.render_curent_step.bind(this);
		this.render_button_step = this.render_button_step.bind(this);
		this.clear_questionaries = this.clear_questionaries.bind(this);
		this.submit_anwers = this.submit_anwers.bind(this);
		this.state = {
			_p_parts_software: true,
			_p_data_storage: true,
			_p_parts_price: true,
			_current: 0,
			rand_persons: 30,
			submitAnswers: 0, // 0 - neutral, 1 - load, 2 - done, 4 - error
			answers: {}
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (nextState._current != this.state._current) {
			document.getElementById('app').scrollTop = 0;
		}

		return true;
	}

	async componentDidMount() {
		this.setState({ 'answers': ls.get('answers') || [] }, () => {
			this.set_visiblity();

			if (this.state.answers.count_working != undefined) {
				var _count_pers = {
					'1_10': randomIntFromInterval(5, 9),
					'11_20': randomIntFromInterval(12, 18),
					'21_50': randomIntFromInterval(25, 58),
					'51_100': randomIntFromInterval(61, 100),
					'101_200': randomIntFromInterval(101, 200),
					'201_500': randomIntFromInterval(201, 500),
					'501_1000': randomIntFromInterval(500, 1000),
					'1001': '1500',
				}[this.state.answers.count_working];
				this.setState({ rand_persons: _count_pers });
			}
		});
		const response = await fetch('/', {
			method: "POST",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ 'z': '' }),
		});
		const json = await response.json();
		this.setState({ _professions: json });
	}
	set_state() {
		ls.set('answers', this.state.answers);
	}

	set_visiblity() {
		const { answers } = this.state;


		if ((answers.calatogue_electronic_data == undefined && answers.calatogue_any_data == undefined && answers.calatogue_future_data == undefined && answers.calatogue_future_electronic == undefined) ||
			(answers.calatogue_any_data == 'y' && answers.calatogue_electronic_data == 'y') ||
			(answers.calatogue_any_data == 'n' && answers.calatogue_future_data != 'n') ||
			(answers.calatogue_any_data == 'y' && answers.calatogue_electronic_data == 'n' && answers.calatogue_future_electronic != 'n')) { // 2
			this.setState({
				_p_parts_software: true
			});
		} else {
			this.setState({
				_p_parts_software: false
			});
		}

		if ((answers.calatogue_electronic_data == undefined && answers.calatogue_any_data == undefined && answers.calatogue_future_data == undefined && answers.calatogue_future_electronic == undefined) ||
			(answers.calatogue_any_data == 'y' && answers.calatogue_electronic_data == 'y') ||
			answers.calatogue_any_data == 'y' &&
			(answers.calatogue_electronic_data == 'y' || (answers.calatogue_electronic_data == 'n' && answers.calatogue_future_electronic == 'y'))) { // 3
			this.setState({
				_p_data_storage: true
			});
		} else {
			this.setState({
				_p_data_storage: false
			});
		}

		if ((answers.calatogue_electronic_data == undefined && answers.calatogue_any_data == undefined && answers.calatogue_future_data == undefined && answers.calatogue_future_electronic == undefined) ||
			(answers.calatogue_any_data == 'n' && answers.calatogue_future_data != 'n') ||
			(answers.calatogue_any_data == 'y' && answers.calatogue_electronic_data == 'y') ||
			(answers.calatogue_any_data == 'y' && answers.calatogue_electronic_data == 'n' && answers.calatogue_future_electronic != 'n')) { // 5
			this.setState({
				_p_parts_price: true
			});
		} else {
			this.setState({
				_p_parts_price: false
			});
		}
	}

	handleVote(value, name) {
		if (name == 'count_working') {
			var _count_pers = {
				'1_10': randomIntFromInterval(5, 9),
				'11_20': randomIntFromInterval(12, 18),
				'21_50': randomIntFromInterval(25, 58),
				'51_100': randomIntFromInterval(61, 100),
				'101_200': randomIntFromInterval(101, 200),
				'201_500': randomIntFromInterval(201, 500),
				'501_1000': randomIntFromInterval(500, 1000),
				'1001': '1500',
			}[value];
			this.setState({ rand_persons: _count_pers });
		}
		if (value !== null) {
			if (name.indexOf('_') === 0) {
				this.setState({ [name]: value }, () => { this.set_state(); this.set_visiblity(); });
			} else {
				this.setState(prevState => ({
					answers: {
						...prevState.answers,
						[name]: value
					}
				}), () => { this.set_state(); this.set_visiblity(); });
			}
		}
	}
	setStep(dir) {
		if (dir > 0) {
			this.setState((prevState, props) => ({ _current: prevState._current + 1 }));
		} else {
			this.setState((prevState, props) => ({ _current: prevState._current - 1 }));
		}
	}
	render_steps(c) {
		const { _p_parts_software, _p_data_storage, _p_parts_price } = this.state;
		var _count = 2 + [_p_parts_software, _p_data_storage, _p_parts_price].filter(function (n) { return n == true }).length;
		var steps = [];
		for (var a = 1; a <= _count; a++) {
			steps.push(
				<Step key={a} active={a == c || _count < c} completed={false}>
					<StepLabel></StepLabel>
				</Step>
			)
		}
		return steps;
	}
	render_button_step(c) {
		const { _p_parts_software, _p_data_storage, _p_parts_price, submitAnswers } = this.state;
		const { classes } = this.props;
		var _count = 2 + [_p_parts_software, _p_data_storage, _p_parts_price].filter(function (n) { return n == true }).length;

		if (c == 0) {
			return (<>
				<br />
				<br />
				<div className={classes.align_center}>
					<Button className={classes.button_space} variant="contained" color='secondary' onClick={() => { this.setStep(1) }}>Dalej</Button>
				</div>
			</>);
		} else if (c < _count) {
			return (<>
				<br />
				<br />
				<div className={classes.align_center}>
					<Button className={classes.button_space} variant="contained" color='default' onClick={() => { this.setStep(0) }}>Wstecz</Button>
					<Button className={classes.button_space} variant="contained" color='secondary' onClick={() => { this.setStep(1) }}>Dalej</Button>
				</div>
			</>);
		} else if (c == _count) {
			return (<>
				<br />
				<br />
				<div className={classes.align_center}>
					<Button className={classes.button_space} variant="contained" color='default' onClick={() => { this.setStep(0) }}>Wstecz</Button>
					<Button
						className={classes.button_space}
						variant="contained"
						color={(submitAnswers == 0 || submitAnswers == 1) ? 'secondary' : ''}
						onClick={this.submit_anwers}
						disabled={submitAnswers == 1}
						className={
							{
								0: null,
								1: null,
								2: classes.containedGreen,
								3: classes.containedRed
							}[submitAnswers]}
						endIcon={
							{
								0: <SendIcon />,
								1: <CircularProgress style={{ color: 'white' }} size={20} />,
								2: <DoneIcon />,
								3: <ErrorIcon />
							}[submitAnswers]
						}>
						Wyślij odpowiedzi
					</Button>
				</div>
			</>);
		}
	}
	render_curent_step(c) {
		const { _p_parts_software, _p_data_storage, _p_parts_price, _current } = this.state;
		var array_steps = [];

		array_steps.push(<Start {...this.props} {...this.state} handleVote={this.handleVote} setButtonStep={this.render_button_step(_current)} />);
		array_steps.push(<Profesion_sector {...this.props} {...this.state} handleVote={this.handleVote} setButtonStep={this.render_button_step(_current)} />);

		if (_p_parts_software)
			array_steps.push(<Parts_software {...this.props} {...this.state} handleVote={this.handleVote} setButtonStep={this.render_button_step(_current)} />);

		if (_p_data_storage)
			array_steps.push(<Data_store {...this.props} {...this.state} handleVote={this.handleVote} setButtonStep={this.render_button_step(_current)} />);

		array_steps.push(<Language_use_help {...this.props} {...this.state} handleVote={this.handleVote} setButtonStep={this.render_button_step(_current)} />);

		if (_p_parts_price)
			array_steps.push(<Price {...this.props} {...this.state} handleVote={this.handleVote} setButtonStep={this.render_button_step(_current)} />);

		array_steps.push(<Finish {...this.props} {...this.state} />);

		return array_steps[c];
	}
	submit_anwers() {
		const { answers } = this.state;
		var prep_answers = answers;
		this.setState({ submitAnswers: 1 });
		if (prep_answers.languages != undefined)
			prep_answers.languages = prep_answers.languages.join(',');
		if (prep_answers.segments_use != undefined)
			prep_answers.segments_use = prep_answers.segments_use.join(',');
		fetch('/', {
			method: "POST",
			body: JSON.stringify({ 'a': prep_answers }),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			timeout: 10000,
		})
			.then(response => response.json())
			.then((data) => {
				if (data.status == 'ok') {
					this.setState({
						answers: {}
					});
					ls.set('answers', {});
					this.setStep(1);
				} else {
					this.setState({ submitAnswers: 3 });
				}
			}).catch(function (error) {
				this.setState({ submitAnswers: 3 });
			}.bind(this));
	}
	clear_questionaries() {
		this.setState({
			answers: {},
			_p_parts_software: true,
			_p_data_storage: true,
			_p_parts_price: true,
			_current: 0,
			rand_persons: 30,
			submitAnswers: 0
		});
		ls.set('answers', {});
	}
	render() {
		const { classes } = this.props;
		const { _current, answers } = this.state;
		return (
			<MuiThemeProvider theme={theme}>
				<CssBaseline />
				<Paper elevation={3} className={classes.paper}>
					<Stepper>
						{this.render_steps(_current)}
					</Stepper>
				</Paper>

				{this.render_curent_step(_current)}

				<div className={classes.footer}>
					<Button variant="contained" color='default' onClick={this.clear_questionaries} disabled={isEmpty(answers)}>Wyczyść ankietę</Button>
					<br />
					<Paper className={'text'}>
						kontakt: <Mailto email='ankieta@piotrsiekierzynski.pl' obfuscatedHref="http://E-mail" className={classes.linkshare} />
						<br />
						Piotr Siekierzyński
					</Paper>
				</div>
			</MuiThemeProvider>
		)
	}
}
export default withStyles(styles)(withWidth()(Questions));

export class Unsub_mail extends React.Component {
	constructor(props) {
		super(props)
		this.handleClose = this.handleClose.bind(this);
		this.submitUnsub = this.submitUnsub.bind(this);
		this.state = {
			stateUnsub: 0, // 0 - neutral, 1 - load, 2 - done, 4 - error
			unsubError: false,
			unsubBusy: false,
			openDialog: false
		}
	}
	handleClose(set){
		this.setState({openDialog: set});
	}
	validateEmail(email) {
		const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
		return re.test(String(email).toLowerCase());
	}
	submitUnsub() {
		const { stateUnsub } = this.state;
		var mail = document.getElementById('unsubMail').value;
		if(this.validateEmail(mail)){
			if(stateUnsub!=1){
				this.setState({unsubError: false, stateUnsub: 1});
				
				fetch('/', {
					method: "POST",
					body: JSON.stringify({ 'u': mail }),
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					timeout: 10000,
				})
				.then(response => response.json())
				.then((data) => {
					if (data.status == 'ok') {
						this.setState({ stateUnsub: 2 });
					} else {
						this.setState({ stateUnsub: 3 });
					}
				}).catch(function (error) {
					this.setState({ stateUnsub: 3 });
				}.bind(this));
			}
		}else{
			this.setState({unsubError: true});
		}
	}
	render() {
		const { openDialog, stateUnsub, unsubError, unsubBusy } = this.state;
		const { classes } = this.props;
		return (<>
			<Button variant="contained" color='default' onClick={()=>{this.handleClose(true);}}>Usuń adres mailowy z listy</Button>
			<Dialog onClose={()=>{this.handleClose(false)}} aria-labelledby="customized-dialog-title" open={openDialog} scroll={'body'} maxWidth={'sm'} fullWidth={true}>
				<MuiDialogTitle id="customized-dialog-title" className={classes.dialogRoot}>
					<div className={classes.dialogHead}>Wypisz się z listy</div>
					<IconButton aria-label="close" onClick={()=>{this.handleClose(false)}}>
						<CloseIcon />
					</IconButton>
				</MuiDialogTitle >
				<MuiDialogContent dividers className={classes.dialogContent}>

					<TextField
						className={classes.input_email}
						placeholder={'E-mail'}
						id="unsubMail"
						name="email"
						inputProps={{
							maxLength: 1000
						}}
						disabled={stateUnsub == 1}
						onChange={this.onChangeUnsub}
						error={unsubError || unsubBusy}
						helperText={(unsubBusy) ? 'Podany adres nie istnieje' : null}
					/>
					<Button
						variant="contained"
						onClick={this.submitUnsub}
						color={(stateUnsub == 0 || stateUnsub == 1) ? 'secondary' : ''}
						disabled={stateUnsub == 1}
						className={
							{
								0: null,
								1: null,
								2: classes.containedGreen,
								3: classes.containedRed
							}[stateUnsub]}
						endIcon={
							{
								0: <SendIcon />,
								1: <CircularProgress style={{ color: 'white' }} size={20} />,
								2: <DoneIcon />,
								3: <ErrorIcon />
							}[stateUnsub]
						}>
						Wyślij
						</Button>

				</MuiDialogContent>
			</Dialog>
		</>)
	}
}