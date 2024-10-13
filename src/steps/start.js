import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { ButtonList } from '../components';

import Paper from '@material-ui/core/Paper';
import ToggleButton from '@material-ui/lab/ToggleButton';
import Button from '@material-ui/core/Button';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';

class Start extends Component {
  constructor(props) {
    super(props)
  }
  render() {
		const { classes, handleVote, setButtonStep } = this.props;
    return (
		<>
			<Paper elevation={3} className={classes.paper}>
				<div className='a'>
					Witam w interaktywnej ankiecie.
				</div>
				<div className='a'>
				Aktualnie jestem w trakcie projektowania oprogramowania do katalogowania danych tj.: naprawy, usługi, dane pacjentów, zlecenia itp. Ankieta ma na celu zbadanie zapotrzebowań przyszłych klientów, odbiorców i dostosowanie oprogramowania do ich potrzeb.
				</div>
				<div className='a'>
				Ankieta jest w pełni anonimowa, czas na jej wypełnienie to maksymalnie 15 minut. Odpowiedzi na wszystkie pytania są dobrowolne.
				</div>
				<div className='a'>
				Pytania będą zmieniały się w zależności od udzielnych odpowiedzi. Dodatkowo odpowiedzi zostaną zapisane w pamięci przeglądarki, więc możesz w każdej chwili wrócić do wypełniania ankiety. Po wysłaniu ankiety, odpowiedzi zostaną usunięte.
				</div>
				{setButtonStep}
			</Paper>
		</>
    )
  }
}
export default Start;