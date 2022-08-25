import React, { useState } from 'react';
import { tempEmails } from '../utils/emails';
import light from "../styles/light.module.css";
import dark from "../styles/dark.module.css";
import common from "../styles/common.module.css";

const EmailContext = React.createContext({
	emails: null,
	values: '',
	darkState: false,
	theme: light,
	commonTheme: common,
	setPin: (id, value) => {},
	setImportant: (id, value) => {},
	setStar: (id, value) => {},
	setOld: (id) => {},
	removeEmail: (id) => {},
	setValues: (value) => {},
	setDarkState: (value) => {},
});
export { EmailContext };

const EmailContextContainer = (props) => {
	/* eslint-disable-next-line */
	const { children } = props;
	const [ emails, setEmails ] = useState(tempEmails.map(email => { return {...email, pin: false, star: false, important: false}}));
	const [ values, setValues ] = useState('');
	const [darkState, setDarkState] = useState(false);
	const theme = darkState ? dark : light;
	const commonTheme = common;
	const setPin = (id, value) => {
		const temp = [...emails];
		let email = temp.filter(email => email.id === id)[0];
		email.pin = value;
		setEmails(temp);
	};
	const setImportant = (id, value) => {
		const temp = [...emails];
		let email = temp.filter(email => email.id === id)[0];
		email.important = value;
		setEmails(temp);
	};
	const setStar = (id, value) => {
		const temp = [...emails];
		let email = temp.filter(email => email.id === id)[0];
		email.star = value;
		setEmails(temp);
	};
	const setOld = (id) => {
		const temp = [...emails];
		let email = temp.filter(email => email.id === id)[0];
		email.new = false;
		setEmails(temp);
	}
	const removeEmail = (id) => {
		const temp = emails.filter(email => email.id !== id);
		setEmails(temp);
	}
	return (
		<EmailContext.Provider
			value={{
				emails: emails,
				setPin: setPin,
				setOld: setOld,
				removeEmail: removeEmail,
				setImportant: setImportant,
				setStar: setStar,
				values: values,
				setValues: setValues,
				darkState: darkState,
				setDarkState: setDarkState,
				theme: theme,
				commonTheme: commonTheme
			}}
		>
			{children}
		</EmailContext.Provider>
	);
};

export default EmailContextContainer;
