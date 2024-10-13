import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Mailto from 'react-protected-mailto'
import 'whatwg-fetch';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress'

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import StorageIcon from '@material-ui/icons/Storage';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import TabletMacIcon from '@material-ui/icons/TabletMac';

import SendIcon from '@material-ui/icons/Send';
import ErrorIcon from '@material-ui/icons/Error';
import DoneIcon from '@material-ui/icons/Done';


class Finish extends Component {
	constructor(props) {
		super(props)
		this.submit_mail = this.submit_mail.bind(this);
		this.onChangeMail = this.onChangeMail.bind(this);
		this.state = {
			submitMail: 0, // 0 - neutral, 1 - load, 2 - done, 3 - error
			mailError: false,
			mailBusy: false,
		}
	}
	validateEmail(email) {
		const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
		return re.test(String(email).toLowerCase());
	}
	submit_mail(){
		const { submitMail } = this.state;
		var mail = document.getElementById('submitMail').value;
		if(this.validateEmail(mail)){
			if(submitMail!=1){
				this.setState({mailError: false, submitMail: 1});
				fetch('/', {
					method: "POST",
					body: JSON.stringify({ 'm': mail }),
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					timeout: 10000,
				})
				.then(response => response.json())
				.then((data) => {
					if(data.status == 'ok'){
						this.setState({submitMail: 2, mailBusy: false});
					}else if(data.status == 'error'){
						this.setState({submitMail: 3, mailBusy: false});
					}else if(data.status == 'busy'){
						this.setState({mailBusy: true, submitMail: 0});
					}
				}).catch(function(error) {
					this.setState({submitMail: 3});
				}.bind(this));
			}
		}else{
			this.setState({mailError: true});
		}
	}
	onChangeMail(){
		this.setState({mailError: false, mailBusy: false, submitMail: 0});
	}
	render() {
		const { classes } = this.props;
		const { submitMail, mailError, mailBusy } = this.state;

		return (
			<>
				<Paper elevation={3} className={classes.paper}>
					<h4 style={{ textAlign: 'center', margin: 0 }}>Koniec ankiety</h4>
					<div style={{ marginTop: '20px' }}>
						<div className='a'>
						Bardzo dziękuje za udzielone odpowiedzi, które pomogą mi w lepszym dopasowaniu oprogramowania do Twoich i Waszych potrzeb.
						</div>

						<div className='a'>
							Pozostały ostanie dwie rzeczy:
						</div>

						<div className='a' style={{paddingLeft: '2em'}}>
							Jeśli znasz kogoś, kto mógłby wypełnić tę ankietę, nie zależnie od wykonywanego zawodu, stażu, umiejętności obsługi komputera itp., możesz wysłać mu linka do niej <a onClick={(e)=>{e.preventDefault(); return false;}} href="https://ankieta.piotrsiekierzynski.pl" className={classes.linkshare}>https://ankieta.piotrsiekierzynski.pl</a>. Wystarczy, że ankietę wypełnią dwie osoby, będzie to bardzo pomocne dla mnie.
						</div>

						<div className='a' style={{paddingLeft: '2em'}}>
							A druga rzecz to taka, że jeśli chcesz w przyszłości otrzymać informację o powstałym oprogramowaniu, możesz zostawić swojego maila. Oczywiście adres trafi do innego worka z danymi i nie zostanie on powiązany z odpowiedziami z ankiety. W każdej chwili możesz się wypisać listy, poprzez link znajdujący się w e-mailu potwierdzającym. Adres mailowy należy potwierdzić w ciągu 24 godzin.
						</div>
						<div style={{textAlign: 'center',marginBottom: '1em' }}>
							<TextField
								style={{marginTop: '1em'}}
								className={classes.write_email}
								placeholder={'E-mail'}
								id="submitMail"
								name="email"
								inputProps={{
									maxLength: 1000
								}}
								disabled={submitMail == 1}
								onChange={this.onChangeMail}
								error={mailError || mailBusy}
								helperText={(mailBusy)?'Podany adres już istnieje':null}
							/>
							<Button
								style={{marginLeft: '0.5em', marginTop: '1em'}}
								variant="contained"
								onClick={this.submit_mail}
								color={(submitMail == 0 || submitMail == 1)?'secondary':''}
								disabled={submitMail == 1}
								className={
									{
										0:null,
										1:null,
										2:classes.containedGreen,
										3:classes.containedRed
									}[submitMail]}
								endIcon={
									{
										0:<SendIcon />,
										1:<CircularProgress style={{color: 'white'}} size={20} />,
										2:<DoneIcon />,
										3:<ErrorIcon />
									}[submitMail]
								}>
									Wyślij
							</Button>
						</div>

						<div className='a' style={{paddingLeft: '2em'}}>
						Adresy mailowe będą przechowywane przez okres do 5 lat. W razie potrzeby korekty danych kontaktowych lub ich usunięcia możesz się skontaktować ze mną przez <Mailto email='ankieta@piotrsiekierzynski.pl' obfuscatedHref="http://E-mail" className={classes.linkshare}/>. Ten sam adres mailowy widnieje zawsze w stopce strony.
						</div>

						<div className='a'>
							To już wszystko. Jeszcze raz dziękuję za udział w ankiecie. Pozdrawiam i życzę samych sukcesów.
						</div>

						<div className='a'>
							Piotr Siekierzyński
						</div>
					</div>
				</Paper>
			</>
		)
	}
}
export default Finish;