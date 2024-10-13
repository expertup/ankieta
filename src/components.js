import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

export class ButtonList extends Component {
  constructor(props) {
    super(props)
  }
  render() {
		const { width, array, getValue, name, ansver, classes } = this.props;
    return (
			<div style={{margin: '9px auto 0 auto', textAlign: 'center'}}>
				<ButtonGroup variant="outlined" color="primary" orientation={(width!='xs')?'horizontal':'vertical'}>
					{array.map(function(item){
						return <Button onClick={()=> getValue(Object.keys(item)[0], name)} className={(ansver!=null && ansver==Object.keys(item)[0])?classes.buttonOutlinedPrimary:''}>{Object.values(item)[0]}</Button>
					}.bind(this))}
				</ButtonGroup>
			</div>
    )
  }
}