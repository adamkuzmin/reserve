import { useEffect } from "react";

const PinLayer = ({ map }) => {
  const [pins, setPins] = useState(initialPins);

  useEffect(() => {
    if (map && initialPins !== pins) {
      // If there are new pins
      addPinsToMap(pins);
    }
  }, [pins]);

  return <></>;
};

export default PinLayer;
