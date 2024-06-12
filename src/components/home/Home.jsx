import Categories from "./Category"
import ProjectList from "./ProjectList"
import Search from "./Search"

const Home = () => {
    return (
        <div className="
        max-w-[2000px]
        mx-auto
        py-10px
        my-10px
        xl:px-20
        md:px-10
        sm:px-2
        px-4 
        pt-20
        ">
            <div className="text-center">
                <h3 className="text-2xl mb-3">
                    지금 당신을 찾고 있는 프로젝트들
                </h3>
            </div>
            <Categories/>
            <Search/>
            <ProjectList/>
        </div>
    )
}

export default Home