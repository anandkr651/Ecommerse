import puppy from "../assets/nothing here yet.webp";

function NoData() {
  return (
    <div className="flex justify-center items-center flex-col pt-10">
      <img src={puppy} alt="no data" className="w-44 bg-gray-400 rounded-lg " />
      <p className="font-medium italic ">No Data</p>
    </div>
  );
}

export default NoData;
