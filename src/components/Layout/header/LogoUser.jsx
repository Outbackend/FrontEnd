const UserImg = ({src}) => {
    return (
        <img 
            src={src || "/UserDefault.jpg"}
            alt="User"
            style={{
                width:'50px',
                height:'50px',
                borderRadius:'9999px' }}
            />
    );
};

export default UserImg;