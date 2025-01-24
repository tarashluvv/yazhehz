"use client";
import React, { useState, useEffect } from 'react';
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
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
      },
      {
        name: "description",
        content: "Kaspi App - Your Digital Banking Solution",
      },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      {
        name: "apple-mobile-web-app-status-bar-style",
        content: "black-translucent",
      },
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
  
  const HomePage = () => (
    <div className="min-h-screen bg-gray-100 pb-16">
      <div className="bg-gray-200 p-4 sticky top-0 z-10">
        <div className="relative">
          <input
            type="text"
            placeholder="Поиск по Kaspi.kz"
            className="w-full p-3 pr-10 rounded-lg border-none"
          />
          <i className="fas fa-search absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
        </div>
      </div>
      <div className="bg-[#FF0033] p-4 text-white flex items-center">
        <div className="flex-1">
          <h2 className="text-xl font-bold">РАССРОЧКА 0-0-24</h2>
          <p className="text-sm">на мебель для дома</p>
        </div>
        <img
          src="/sofa.jpg"
          alt="Sofa promotion"
          className="w-24 h-24 object-contain"
        />
      </div>

      <div className="grid grid-cols-4 gap-4 p-4 bg-white">
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center mb-2">
            <img
              src="https://ucarecdn.com/985bb33a-a472-413f-8a19-696ac8a49837/-/format/auto/"
              alt="Kaspi QR Icon"
              className="w-8 h-8"
            />
          </div>
          <span className="text-xs text-center">Kaspi QR</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center mb-2">
            <img
              src="https://ucarecdn.com/16f61c3f-914f-4cc9-8894-de496596422f/-/format/auto/"
              alt="My Bank Icon"
              className="w-8 h-8"
            />
          </div>
          <span className="text-xs text-center">Мой Банк</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center mb-2">
            <img
              src="https://ucarecdn.com/3c88555a-7c28-4465-b163-cf28d27715af/-/format/auto/"
              alt="Payments Icon"
              className="w-8 h-8"
            />
          </div>
          <span className="text-xs text-center">Платежи</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center mb-2">
            <img
              src="https://ucarecdn.com/d260245f-0c4e-480d-9e5d-055842566dee/-/format/auto/"
              alt="Transfers Icon"
              className="w-8 h-8"
            />
          </div>
          <span className="text-xs text-center">Переводы</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center mb-2">
            <img
              src="https://ucarecdn.com/06ddcd1e-6928-4e4b-a079-66f74c74e7d2/-/format/auto/"
              alt="Shopping Cart Icon"
              className="w-8 h-8"
            />
          </div>
          <span className="text-xs text-center">Магазин</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center mb-2">
            <img
              src="https://ucarecdn.com/de7b92c0-22f8-4a37-9617-aaf4434c38c1/-/format/auto/"
              alt="Travel Icon"
              className="w-8 h-8"
            />
          </div>
          <span className="text-xs text-center">Travel</span>
        </div>
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => setCurrentPage("projectX")}
        >
          <div className="flex items-center justify-center mb-2">
            <img
              src="https://ucarecdn.com/9ea85273-d094-4728-9e49-de6e84e8e91a/-/format/auto/"
              alt="Government Services Icon"
              className="w-8 h-8"
            />
          </div>
          <span className="text-xs text-center">Госуслуги</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center mb-2">
            <img
              src="https://ucarecdn.com/6d4b85ff-b4e1-48ee-aa83-60a7b8828169/-/format/auto/"
              alt="Announcements Icon"
              className="w-8 h-8"
            />
          </div>
          <span className="text-xs text-center">Объявления</span>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-white p-4 rounded-lg shadow-sm flex items-center">
          <img
            src="https://ucarecdn.com/cf016cf9-272c-4ceb-9f1c-b70160cbb4b3/-/format/auto/"
            alt="Magnum logo"
            className="w-12 h-12 object-contain mr-4"
          />
          <div>
            <h3 className="font-medium">Magnum</h3>
            <p className="text-sm text-gray-500">
              Продукты питания с бесплатной доставкой
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm flex items-center">
          <div className="flex items-center justify-center mr-4">
            <img
              src="https://ucarecdn.com/9c5b5936-7b8f-4d8e-982d-989d8c1da8dd/-/format/auto/"
              alt="Kaspi Red Logo"
              className="w-12 h-12 object-contain"
            />
          </div>
          <div>
            <h3 className="font-medium">Kaspi Red</h3>
            <p className="text-sm text-gray-500">Рассрочка 0%</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm flex items-center">
          <div className="flex items-center justify-center mr-4">
            <img
              src="https://ucarecdn.com/4c94a27f-304a-408f-a73e-02d1597c7654/-/format/auto/"
              alt="Kaspi Deposit Icon"
              className="w-12 h-12 object-contain"
            />
          </div>
          <div>
            <h3 className="font-medium">Kaspi Депозит</h3>
            <p className="text-sm text-gray-500">Эффективная ставка 20%</p>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-2">
        <button
          type="button"
          className="flex flex-col items-center text-[#FF0033]"
        >
          <img
            src="https://ucarecdn.com/406a5dc9-dd25-4a00-9827-d1f24333abde/-/format/auto/"
            alt="Home Icon"
            className="w-6 h-6"
          />
          <span className="text-xs mt-1">Главная</span>
        </button>
        <button
          type="button"
          className="flex flex-col items-center text-gray-400"
        >
          <img
            src="https://ucarecdn.com/db9a7e84-32f4-4790-b6e8-18b76d20b093/-/format/auto/"
            alt="Kaspi QR"
            className="w-6 h-6"
          />
          <span className="text-xs mt-1">Kaspi QR</span>
        </button>
        <button
          type="button"
          className="flex flex-col items-center text-gray-400"
        >
          <img
            src="https://ucarecdn.com/e9e85882-3aa2-430a-a4be-55db7ba91e3c/-/format/auto/"
            alt="Messages Icon"
            className="w-6 h-6"
          />
          <span className="text-xs mt-1">Сообщения</span>
        </button>
        <button
          type="button"
          className="flex flex-col items-center text-gray-400"
        >
          <img
            src="https://ucarecdn.com/667fc9a7-0db3-4eb1-8b04-d759710d79e5/-/format/auto/"
            alt="Services Icon"
            className="w-6 h-6"
          />
          <span className="text-xs mt-1">Сервисы</span>
        </button>
      </div>
    </div>
  );

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
            Назад
          </button>
          <h1 className="text-center flex-1 text-lg">Удостоверение личности</h1>
        </div>
        <div className="flex border-t">
          <button
            type="button"
            className="flex-1 py-3 text-[#FF0033] border-b-2 border-[#FF0033]"
          >
            Документ
          </button>
          <button type="button" className="flex-1 py-3 text-gray-400">
            Реквизиты
          </button>
        </div>
      </div>

      <main className="flex flex-col flex-grow">
        {image ? (
          <div className="relative flex-grow flex items-center justify-center bg-gray-100">
            <img
              src={image}
              alt="ID Document"
              className="max-w-full max-h-full w-auto h-auto object-contain"
            />
          </div>
        ) : (
          <div className="flex-grow flex items-center justify-center">
            <label className="cursor-pointer block text-center">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              <div className="text-gray-400">
                <i className="fas fa-camera text-4xl mb-2"></i>
                <p className="text-sm">Загрузите документ</p>
              </div>
            </label>
          </div>
        )}

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
      </main>
    </div>
  );

  return currentPage === "home" ? <HomePage /> : <ProjectXPage />;
}

export default MainComponent;