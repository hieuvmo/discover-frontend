import { Spin } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";

import { routerPaths } from "routers/router.paths";
import { laptopServices } from "services/laptop.service";
import { ILaptop } from "types/laptop.model";
import Slider from "./component/Slider/Slider";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Home = () => {
  const navigate = useNavigate();
  const [laptopList, setLaptopList] = useState<ILaptop[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchLaptopListAPI = async () => {
      try {
        setLoading(true);
        const response = await laptopServices.getListLaptop();
        setLaptopList(response);
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLaptopListAPI();
  }, []);

  return (
    <>
      <Slider />
      {loading ? (
        <div className="h-full flex justify-center items-center">
          <Spin indicator={antIcon} />
        </div>
      ) : (
        laptopList.map((laptop: ILaptop) => (
          <p
            key={laptop._id}
            className="cursor-pointer mb-4"
            onClick={() => navigate(`${routerPaths.LAPTOP_LIST}/${laptop._id}`)}
          >
            {laptop.productName}
          </p>
        ))
      )}
    </>
  );
};

export default Home;
