const MenuItem = ({ onClick, label }) => {
    return(
        <div 
            onClick={onClick}
            className="px-4
            py-3 
            rounded-xl 
            hover:bg-neutral-100
            font-semibold"
        >
            {label}
        </div>
    )
}

export default MenuItem