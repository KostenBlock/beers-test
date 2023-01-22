import classes from "./text-input.module.scss";

type Props = {
	textValue?: string;
	label?: string;
	className?: string;
	classNameContainer?: string;
	classNameLabel?: string;
	holder?: string;
	isDisabled?: boolean;
	isRequired?: boolean;
	changeEvent?: Function;
	styles?: object;
};

const TextInput = ({
	textValue = "",
	changeEvent = () => {},
	label = "",
	classNameLabel = "",
	holder = "",
	isDisabled = false,
	isRequired = false,
	styles = {},
	className = "",
	classNameContainer = "",
}: Props) => {
	return (
		<div className={`${classes.input__container} ${classNameContainer} ${isDisabled ? classes.disabled__component : ""} row`}>
			{label && (
				<p className={`${classes.label__element} ${classNameLabel}`}>
					{label} {isRequired && <span style={{ color: !isDisabled ? "#f1595e" : "#ddd" }}>*</span>}
				</p>
			)}
			<input
				type="text"
				value={textValue}
				placeholder={holder}
				disabled={isDisabled}
				style={{ ...styles }}
				className={`${classes.input} ${className}`}
				onChange={(event) => changeEvent(event.target.value)}
			/>
		</div>
	);
};

export default TextInput;
