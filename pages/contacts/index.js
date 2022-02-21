import { useEffect } from "react";
import { useStore } from "../../Store/useStore";
import Contacts from "./Contacts";

export default function HomeApp() {
  const setBlackLogo = useStore((state) => state.setBlackLogo);

  useEffect(() => {
    setBlackLogo(true);
  }, []);

  return (
    <div>
      <Contacts />
    </div>
  );
}
