import { Button } from "@mui/material";
import { createContext, useEffect, useRef, useState } from "react";
import type { Book } from "../../redux/types";

interface UploadWidgetInterface {
  uwConfig: {
    cloudName: string;
    uploadPreset: string;
    multiple: boolean;
    folder: string;
    clientAllowedFormats: string[];
  };
  setState: (newData: Partial<Book>) => void;
}
const CloudinaryScriptContext = createContext<{ loaded: boolean } | null>(null);

function UploadWidget({ uwConfig, setState }: UploadWidgetInterface) {
  const [loaded, setLoaded] = useState<boolean>(false);
  const uploadButtonRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (!loaded) {
      const uwScript = document.getElementById("uw");
      if (!uwScript) {
        const script = document.createElement("script");
        script.setAttribute("async", "");
        script.setAttribute("id", "uw");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.addEventListener("load", () => setLoaded(true));
        document.body.appendChild(script);
      } else {
        setLoaded(true);
      }
    }
  }, [loaded]);

  const initializeCloudinaryWidget = () => {
    if (loaded && uploadButtonRef.current) {
      var myWidget = window.cloudinary.createUploadWidget(
        uwConfig,
        (error, result) => {
          if (!error && result && result.event === "success") {
            setState({ image: result.info.secure_url });
          }
        }
      );
      const button: HTMLButtonElement = uploadButtonRef.current;

      const handleClick = (): void => {
        myWidget.open();
      };

      button.addEventListener("click", handleClick);

      return () => {
        button.removeEventListener("click", handleClick);
      };
    }
  };

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      <Button
        ref={uploadButtonRef}
        className="cloudinary-button"
        onClick={initializeCloudinaryWidget}
      >
        Upload Image
      </Button>
    </CloudinaryScriptContext.Provider>
  );
}

export default UploadWidget;
export { CloudinaryScriptContext };
