
const CurrentDate = () => {
  return <div className="text-center my-2 font-bold text-2xl">{new Date().toLocaleDateString()}</div>;
};

export default CurrentDate;
