import React from "react";
import { useNavigate } from "react-router-dom";
import { Sun } from "lucide-react";
import { useState } from "react";
import axios from "axios";

const Dashboard = () => {
    const navigate = useNavigate();
    const [searchCity, setSearchCity] = useState("");
    const [error, setError] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(searchCity.trim() !== "") {
            try {
                const response = await axios.get(`http://localhost:4000/api/weather/${searchCity}`);
                if(response.data) {
                    navigate(`/weather/${searchCity}`);
                    setError(null);
                } else {
                    setError("Không tìm thấy thành phố nào phù hợp");
                }
                
            }
            catch (err) {
                setError("Đã xảy ra lỗi khi tìm kiếm");
        }
     }
    }
    return (
    <header className="h-screen w-screen font-sans">
      <div className="flex items-center justify-between h-40 bg-blue-50">
        <div className="flex items-center gap-2 cursor-pointer ml-40" onClick={() => navigate("/")}>
          <Sun className="w-20 h-20 text-amber-500" />
          <span className="font-extrabold text-2xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent tracking-wide">Weather Forecast</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-10">
        <div className=" flex items-center justify-center gap-2">
          <input type="text" value={searchCity} onChange={(e) => setSearchCity(e.target.value)} placeholder="Nhập tên thành phố...."
          className="text-gray-700 text-xl font-sans w-128 h-16 border border-gray-700 rounded-3xl px-3 py-2"></input>
          <button type="submit" className="bg-blue-500 h-16 w-30 text-xl text-white rounded-3xl ">Tìm kiếm</button>
        </div>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </form>
    </header>
    );
}
export default Dashboard;