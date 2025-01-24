"use client";
import React, { useState, useEffect } from "react";
import { useUpload } from "../utilities/runtime-helpers";

function MainComponent() {
  const [currentPage, setCurrentPage] = useState("home");
  const [upload, { loading }] = useUpload();
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      return;
    }

    const { url, error: uploadError } = await upload({ file });
    if (uploadError) {
      setError(uploadError);
      return;
    }

    setImage(url);
  };

  useEffect(() => {
    const metaTags = [
      { name: "viewport", content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" },
      { name: "description", content: "Kaspi App - Your Digital Banking Solution" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "theme-color", content: "#FF0033" },
      { name: "apple-mobile-web-app-title", content: "Kaspi" },
      { name: "application-name", content: "Kaspi" },
      { name: "format-detection", content: "telephone=no" },
    ];

    metaTags.forEach(({ name, content }) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    });

    const manifestLink = document.querySelector('link[rel="manifest"]') || document.createElement("link");
    manifestLink.rel = "manifest";
    manifestLink.href = "/manifest.json";
    if (!manifestLink.parentNode) {
      document.head.appendChild(manifestLink);
    }

    return () => {
      metaTags.forEach(({ name }) => {
        const meta = document.querySelector(`meta[name="${name}"]`);
        if (meta) meta.remove();
      });

      const manifest = document.querySelector('link[rel="manifest"]');
      if (manifest) manifest.remove();
    };
  }, []);

  const ProjectXPage = () => (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="bg-white border-b">
        <div className="flex items-center px-4 py-4">
          <button
            type="button"
            onClick={() => setCurrentPage("home")}
            className="text-[#FF0033] flex items-center"
          >
            <i className="fas fa-chevron-left text-xl mr-2"></i>
            <p>&#x3C;</p>
          </button>
          <h1 className="text-center flex-1 text-lg">Удостоверение личности</h1>
        </div>
        <div className="flex border-t">
          <button type="button" className="flex-1 py-3 text-[#FF0033] border-b-2 border-[#FF0033]">
            Документ
          </button>
          <button type="button" className="flex-1 py-3 text-gray-400">
            Реквизиты
          </button>
        </div>
      </div>

      {image ? (
        <div className="relative flex-grow flex items-center justify-center bg-gray-100">
          <img
            src={image}
            alt="ID Document"
            className="max-w-full max-h-full w-auto h-auto object-contain"
          />
        </div>
      ) : (
        <div className="middle">
          <div className="img-upload" style={{ height: "50vh" }}>
            <div className="input-img">
              <input
                type="file"
                name="img-upl"
                id="idupload"
                className="input-file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <label htmlFor="idupload">
                <span>Загрузить</span>
              </label>
            </div>
          </div>
          <div className="p-4 space-y-3">
            <button
              type="button"
              className="w-full bg-[#0088CC] text-white py-4 rounded-lg font-medium flex items-center justify-center"
            >
              <i className="fas fa-camera mr-2"></i>
              Предъявить документ
            </button>
            <button
              type="button"
              className="w-full text-[#0088CC] py-4 rounded-lg font-medium flex items-center justify-center"
            >
              <i className="fas fa-arrow-up-from-bracket mr-2"></i>
              Отправить документ
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const HomePage = () => (
    <div className="min-h-screen bg-gray-100">
      <h1>Welcome to Kaspi.kz</h1>
      <button onClick={() => setCurrentPage("projectX")}>Go to ProjectX</button>
    </div>
  );

  return currentPage === "home" ? <HomePage /> : <ProjectXPage />;
}

export default MainComponent;
