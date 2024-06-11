const Button = ({
    onClick,
}) => {
    return (
        <button
            onClick={onClick}
            className={`
                rounded-2xl
                hover:opacity-80
                transition
                px-6
                py-2
                bg-gray-900
                text-white
             `}
                >
            Search
        </button>
    )
}

export default Button