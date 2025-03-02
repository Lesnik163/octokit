import React, { } from 'react';

type InputProps = {
	handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
	name: string;
}
const Input: React.FC<InputProps> = ({ handleInput, name }) => {

	return (
		<input
			type='text'
			value={name}
			onChange={handleInput}
			placeholder='Введите имя пользователя'
			style={{ minWidth: '400px' }} />
	);
};

export default Input;