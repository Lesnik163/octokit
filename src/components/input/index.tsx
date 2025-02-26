import React, { useState } from 'react';

const Input = () => {
	const [value, setValue] = useState('')
	return (
		<input type='text' value={value}>

		</input>
	);
};

export default Input;