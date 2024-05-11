window.addEventListener('DOMContentLoaded', () => {
  const cookieStorage = {
    getItem: (key) => {
      const cookies = document.cookie
                        .split(';')
                        .map((cookie) => cookie.split('='))
                        .reduce((acc, [key, value]) => ({...acc, [key.trim()]: value}), {});
      
      return cookies[key];
    },
    setItem: (key, value) => {
      document.cookie = `${key}=${value};expires=${getExpiresDate()}`;
    }
  };

  const storageType = cookieStorage;
  const consentPropertyType = 'site_consent';

  const shouldShowPopup = () => !storageType.getItem(consentPropertyType);
  const saveToStorage = () => storageType.setItem(consentPropertyType, true);

  // Метод, который определяет дату окончания действия куки согласия на обработку данных
  const getExpiresDate = () => {
    const currentDate = new Date();
    const currentTime = currentDate.getTime();
    const dayMilliseconds = 1000*86400;
    // По дефолту предупреждение появится снова через 30 дней
    const expireTime = currentTime + dayMilliseconds*30;

    currentDate.setTime(expireTime);
    
    return currentDate;
  };

  const popup = document.querySelector('.cookie-container');
  const btn = document.querySelector('.btn_cookie');
  const socnetBtn = document.querySelector('.btn_socnet');

  if (shouldShowPopup()) {
    popup.classList.remove('popup_hidden');
    popup.classList.add('popup_active');
  }

  btn.addEventListener('click', () => {
    saveToStorage();

    popup.classList.remove('popup_active');
    popup.classList.add('popup_hidden');
  });

  // Метод для показа согласия при авторизации через соцсети. Нужно вызвать в момент открытия окна с соцсетями.
  //
  // const showSocnetConsent = () => {
  //   const popup = document.querySelector('.socnet-popup');

  //   addEventListener(popup);

  //   if (!storageType.getItem('socnet_consent')) {
  //     popup.classList.remove('popup_hidden');
  //     popup.classList.add('popup_active');
  //   }
  // }

  const addEventListener = (popup) => {
    socnetBtn.addEventListener('click', () => {
      storageType.setItem('socnet_consent', true);
  
      popup.classList.remove('popup_active');
      popup.classList.add('popup_hidden');
    });
  }
});
