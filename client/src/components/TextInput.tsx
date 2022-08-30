import React from "react";

const TextInput = ({
	name,
	placeholder,
	required,
}: {
	name: string;
	placeholder?: string;
	required?: boolean;
}) => {
	return (
		<div className="p-2">
			<label htmlFor={name}>{name}</label>
			<br />
			<input
				className="border-[1px] border-gray-300 rounded-md p-2"
				placeholder={placeholder}
				type="text"
				name={name}
				id={name}
				{...{ required: required }}
			/>
		</div>
	);
};

export default TextInput;
