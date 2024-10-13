import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { ButtonList } from '../components';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import Popper from '@material-ui/core/Popper';

import Collapse from '@material-ui/core/Collapse';

import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import ListSubheader from '@material-ui/core/ListSubheader';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { VariableSizeList } from 'react-window';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import WorkIcon from '@material-ui/icons/Work';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import StorageIcon from '@material-ui/icons/Storage';
import ComputerIcon from '@material-ui/icons/Computer';
import EditIcon from '@material-ui/icons/Edit';
import TodayIcon from '@material-ui/icons/Today';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

class Profesion_sector extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		const { classes, handleVote, answers, _professions, setButtonStep } = this.props;

		return (
			<>
				<Paper elevation={3} className={classes.paper}>
					<h4 style={{ textAlign: 'center', margin: 0 }}>Informacje o Twojej pracy</h4>
					<div style={{ marginTop: '20px' }}>
						Te informacje pozwolą mi określić, w jakiej branży pracujesz, szacunkową ilość osób, które mogą korzystać z mojego oprogramowania, czy przechowujecie dane klientów, usług itp. oraz sposób ich przechowywania.
					<br />
						<br />
					Jeśli w obecnej chwili nie pracujesz, wypełnij ankietę danymi ze swojej poprzedniej pracy.
					<br />
						<br />
						<br />
						<Profession_select classes={classes} handleVote={handleVote} value={answers.profession} professions={_professions} />
						<br />
						<br />
						<FormControl component="fieldset" className={classes.input_elem}>
							<FormLabel component="legend"><TodayIcon /> Ile lat pracujesz w danej branży?</FormLabel>
							<TextField
								fullWidth
								color="primary"
								defaultValue={answers.year_work}
								type="number"
								InputProps={{ inputProps: { min: 0 } }}
								onChange={(event) => { handleVote(event.target.value, 'year_work') }}
							/>
						</FormControl>
						<br />
						<br />
						<FormControl component="fieldset" className={classes.input_elem}>
							<FormLabel component="legend"><SupervisorAccountIcon /> Ile osób pracuje w Twojej firmie?</FormLabel>
							<RadioGroup aria-label="gender" defaultValue={answers.count_working} name="count_working" onChange={(event) => { handleVote(event.target.value, 'count_working') }}>
								<FormControlLabel value="1_10" control={<Radio color="primary" />} label="1 - 10" />
								<FormControlLabel value="11_20" control={<Radio color="primary" />} label="11 - 20" />
								<FormControlLabel value="21_50" control={<Radio color="primary" />} label="21 - 50" />
								<FormControlLabel value="51_100" control={<Radio color="primary" />} label="51 - 100" />
								<FormControlLabel value="101_200" control={<Radio color="primary" />} label="101 - 200" />
								<FormControlLabel value="201_500" control={<Radio color="primary" />} label="201 - 500" />
								<FormControlLabel value="501_1000" control={<Radio color="primary" />} label="501 - 1000" />
								<FormControlLabel value="1001" control={<Radio color="primary" />} label="1001 lub więcej" />
							</RadioGroup>
						</FormControl>
						<br />
						<br />
						<FormControl component="fieldset" className={classes.input_elem}>
							<FormLabel component="legend"><StorageIcon /> Czy Twoja firma kataloguje jakieś dane? Przykładowo: adresy klientów, wykonane naprawy, usługi, zabiegi, zlecenia, sprzedaż itp.</FormLabel>
							<RadioGroup aria-label="gender" defaultValue={answers.calatogue_any_data} name="calatogue_any_data" onChange={(event) => { handleVote(event.target.value, 'calatogue_any_data') }}>
								<FormControlLabel value="y" control={<Radio color="primary" />} label="Tak" />
								<FormControlLabel value="n" control={<Radio color="primary" />} label="Nie" />
							</RadioGroup>
						</FormControl>
						<Collapse in={!(answers.calatogue_any_data != undefined && answers.calatogue_any_data == 'n')}>
							<br />
							<br />
							<FormControl component="fieldset" className={classes.input_elem}>
								<FormLabel component="legend"><ComputerIcon /> Czy dane są przechowywane w formie elektroniczej? (na komputerze, serwerze)</FormLabel>
								<RadioGroup aria-label="gender" defaultValue={answers.calatogue_electronic_data} name="calatogue_electronic_data" onChange={(event) => { handleVote(event.target.value, 'calatogue_electronic_data') }}>
									<FormControlLabel value="y" control={<Radio color="primary" />} label="Tak, przechowujemy w formie elektroniczej" />
									<FormControlLabel value="n" control={<Radio color="primary" />} label="Nie, przechowujemy w tradycyjny sposób" />
								</RadioGroup>
							</FormControl>
						</Collapse>
						<Collapse in={!(answers.calatogue_any_data != undefined && answers.calatogue_any_data == 'y')}>
							<br />
							<br />
							<FormControl component="fieldset" className={classes.input_elem}>
								<FormLabel component="legend"><AccessTimeIcon /> Czy Twoja firma planuje w przyszłości katalogować jakieś dane? Np. adresy klientów, wykonane zabiegi, zlecenia, sprzedaż, wysyłka itp.</FormLabel>
								<RadioGroup aria-label="gender" defaultValue={answers.calatogue_future_data} name="calatogue_future_data" onChange={(event) => { handleVote(event.target.value, 'calatogue_future_data') }}>
									<FormControlLabel value="y" control={<Radio color="primary" />} label="Tak" />
									<FormControlLabel value="n" control={<Radio color="primary" />} label="Nie" />
									<FormControlLabel value="u" control={<Radio color="primary" />} label="Nie wiem" />
								</RadioGroup>
							</FormControl>
						</Collapse>
						<Collapse in={(answers.calatogue_any_data == undefined || answers.calatogue_any_data  == 'y') && (answers.calatogue_electronic_data == undefined || answers.calatogue_electronic_data == 'n')}>
							<br />
							<br />
							<FormControl component="fieldset" className={classes.input_elem}>
								<FormLabel component="legend"><ComputerIcon /> Czy Twoja firma planuje w przyszłości zapisywać dane w formie elektroniczej? (na komputerze, serwerze)</FormLabel>
								<RadioGroup aria-label="gender" defaultValue={answers.calatogue_future_electronic} name="calatogue_future_electronic" onChange={(event) => { handleVote(event.target.value, 'calatogue_future_electronic') }}>
									<FormControlLabel value="y" control={<Radio color="primary" />} label="Tak" />
									<FormControlLabel value="n" control={<Radio color="primary" />} label="Nie" />
									<FormControlLabel value="u" control={<Radio color="primary" />} label="Nie wiem" />
								</RadioGroup>
							</FormControl>
						</Collapse>
						<Collapse in={!(answers.calatogue_electronic_data != undefined && answers.calatogue_electronic_data == 'n' || answers.calatogue_any_data != undefined && answers.calatogue_any_data == 'n')}>
							<br />
							<br />
							<FormControl component="fieldset" className={classes.input_elem}>
								<FormLabel component="legend"><EditIcon /> Z jakiego oprogramowania korzystacie do przechowywania danych. Wpisz nazwy kilku z nich.</FormLabel>
								<TextField
									fullWidth
									color="primary"
									rows={4}
									multiline
									defaultValue={answers.software_names}
									onChange={(event) => { handleVote(event.target.value, 'software_names') }}
								/>
							</FormControl>
						</Collapse>
					</div>
					{setButtonStep}
				</Paper>
			</>
		)
	}
}
export default Profesion_sector;

export function Profession_select({ classes, handleVote, value, professions }) {
	const [open, setOpen] = React.useState(false);
	const [options, setOptions] = React.useState([]);
	const loading = open && options.length === 0;

	React.useEffect(() => {
		let active = true;

		if (!loading) {
			return undefined;
		}

		if (active) {
			setOptions(professions);
		}

		return () => {
			active = false;
		};
	}, [loading]);

	React.useEffect(() => {
		if (!open) {
			setOptions([]);
		}
	}, [open]);

	const LISTBOX_PADDING = 8; // px

	function renderRow(props) {
		const { data, index, style } = props;
		return React.cloneElement(data[index], {
			style: {
				...style,
				top: style.top + LISTBOX_PADDING,
			},
		});
	}

	const OuterElementContext = React.createContext({});

	const OuterElementType = React.forwardRef((props, ref) => {
		const outerProps = React.useContext(OuterElementContext);
		return <div ref={ref} {...props} {...outerProps} />;
	});

	function useResetCache(data) {
		const ref = React.useRef(null);
		React.useEffect(() => {
			if (ref.current != null) {
				ref.current.resetAfterIndex(0, true);
			}
		}, [data]);
		return ref;
	}

	const ListboxComponent = React.forwardRef(function ListboxComponent(props, ref) {
		const { children, ...other } = props;
		const itemData = React.Children.toArray(children);
		const theme = useTheme();
		const smUp = useMediaQuery(theme.breakpoints.up('sm'), { noSsr: true });
		const itemCount = itemData.length;
		const itemSize = smUp ? 36 : 48;
		const limitList = (typeof window.orientation !== 'undefined') ? 4 : 9;

		const getChildSize = (child) => {
			return itemSize;
		};

		const getHeight = () => {
			if (itemCount > limitList) {
				return limitList * itemSize;
			}
			return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
		};

		const gridRef = useResetCache(itemCount);

		return (
			<div ref={ref}>
				<OuterElementContext.Provider value={other}>
					<VariableSizeList
						itemData={itemData}
						height={getHeight() + 2 * LISTBOX_PADDING}
						width="100%"
						ref={gridRef}
						outerElementType={OuterElementType}
						innerElementType="div"
						itemSize={(index) => getChildSize(itemData[index])}
						overscanCount={5}
						itemCount={itemCount}
					>
						{renderRow}
					</VariableSizeList>
				</OuterElementContext.Provider>
			</div>
		);
	});

	const PopperMy = function (props) {
		return (<Popper {...props} placement="bottom"
		disablePortal={false}
		modifiers={{
		  flip: {
			enabled: false,
		  },
		  preventOverflow: {
			enabled: false,
			boundariesElement: 'scrollParent',
		  },
		  arrow: {
			enabled: false,
		  },
		}} />)
	  }

	return (
		<FormControl component="fieldset" className={classes.input_elem}>
			<FormLabel component="legend"><WorkIcon /> Jaki zawód wykonujesz lub w jakiej branży pracujesz?</FormLabel>
			<Autocomplete
			 	PopperComponent={PopperMy}
				onChange={(event, newValue, reanson) => {
					if (newValue != null) {
						handleVote(newValue.id, 'profession');
					} else {
						handleVote(undefined, 'profession');
					}
				}}
				value={professions.filter(function (data) { return data.id == value })[0]}
				id="asynchronous-demo"
				style={{ width: '100%' }}
				open={open}
				onOpen={() => {
					setOpen(true);
				}}
				onClose={() => {
					setOpen(false);
				}}
				getOptionSelected={(option, value) => option.name === value.name}
				getOptionLabel={(option) => option.name}
				ListboxComponent={ListboxComponent}
				options={options}
				loadingText={"Wyszukiwanie..."}
				noOptionsText={"Nie znaleziono"}
				loading={loading}
				renderInput={(params) => (
					<TextField
						fullWidth
						{...params}
						InputProps={{
							...params.InputProps,
							endAdornment: (
								<React.Fragment>
									{loading ? <CircularProgress color="inherit" size={20} /> : null}
									{params.InputProps.endAdornment}
								</React.Fragment>
							),
						}}
					/>
				)}
				renderOption={(option, { inputValue }) => {
					const matches = match(option.name, inputValue);
					const parts = parse(option.name, matches);
					return (
						<div style={{ whiteSpace: 'nowrap' }}>
							{parts.map((part, index) => (
								<span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
									{part.text}
								</span>
							))}
						</div>
					);
				}}
			/>
		</FormControl>
	);
}