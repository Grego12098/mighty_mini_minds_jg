import ThermometerImage from "../../../Img/Therm_final_rectangle.png";

export default function Thermometer(props) {

  function moodValue() {
    let mood = props.mood * 0.6;
    mood += 40;
    mood = `${mood}%`;
    return mood;
  }

  const thermometerStyle = { 
    height: moodValue(),
    background:
      "linear-gradient(0deg, rgba(238,102,11,1) 5%, rgba(235,224,3,0.9780287114845938) 40%, rgba(0,255,145,1) 100%",
  };

  return (
    <div className=" w-12 relative mt-24 h-32 sm:h-48 sm:w-16 ml-8">
      <div
        className="w-10/12 bg-green-300 absolute bottom-2 left-0 right-0 mx-auto z-0 sm:max-h-[95%] max-h-[93%]"
        style={thermometerStyle}
      ></div>
      <img
        src={ThermometerImage}
        alt="thermometer"
        className="h-full w-full z-10"
        style={{ position: "relative", zIndex: 1 }}
      />
    </div>
  );
}
