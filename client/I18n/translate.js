let translations = null;

const translate = {
  configure: locale => {
    translations = require(`./${locale}`);
  },
  t: key => {
    if(translations && translations[key]){
      return translations[key];
    }else {
      return key;
    }
  }
};

export const Configure = translate.configure;
export const Translate = translate.t;