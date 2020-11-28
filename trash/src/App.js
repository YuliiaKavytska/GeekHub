import React, {PureComponent} from 'react';

export default class App extends PureComponent {
	render() {
		const data = <input type='password'/>


		return (
			<table>
				<tbody>
				{data}
				</tbody>
			</table>
		);
	}
}