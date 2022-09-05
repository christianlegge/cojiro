import React from "react";

const TextInput = ({
	name,
	placeholder,
	required,
	valueState,
}: {
	name: string;
	placeholder?: string;
	required?: boolean;
	valueState?: [string, React.Dispatch<React.SetStateAction<string>>];
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
				{...(valueState
					? {
							value: valueState[0],
							onChange: (e) => {
								valueState[1](e.target.value);
							},
					  }
					: {})}
				{...{ required: required }}
			/>
		</div>
	);
};

export default TextInput;
