import Categories from "./Home/Category";
import ProjectList from "./Home/ProjectList";
import Container from "../Assets/Container";
import Search from "./Home/Search";
import { useNavigate } from "react-router";

const Home = () => {
  const nevigate = useNavigate();
  const handleCreateProject = () => {
    nevigate("/project");
  };

  return (
    <Container>
      <div className="text-center pt-32">
        <h3 className="text-2xl font-semibold">
          지금 당신을 찾고 있는 프로젝트들
        </h3>
      </div>
      <Categories />
      <Search />
      <button
        type="button"
        onClick={handleCreateProject}
        className="float-right mt-4 px-6 py-2 text-red-500 rounded-full hover:font-bold mr-4"
      >
        <span class="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-lg font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
          Create
        </span>
      </button>
      <ProjectList />
    </Container>
  );
};

export default Home;
