import Mint from "../components/Mint";
import RecruitmentProcess from '../components/RecruitmentProcess';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MintPage = () => {
  return (
    <>
      <div className="">
        <main className="">
          <div className="">
            <Mint />
            
            <ToastContainer hideProgressBar={true} />
          </div>
        </main>
      </div>
    </>
  );
};

export default MintPage;
