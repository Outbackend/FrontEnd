const Container = ({children}) => {
    return (
        <div className="max-w-[2500px]
        mx-auto
        py-10px
        my-10px
        xl:px-20
        md:px-10
        sm:px-2
        px-4"
        >
        {children}
        </div>
    )
}

export default Container