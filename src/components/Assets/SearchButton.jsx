const SearchButton = ({
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
                bg-[#5C9CDD]
                text-white
                font-semibold
             `}
                >
            Search
        </button>
    )
}

export default SearchButton