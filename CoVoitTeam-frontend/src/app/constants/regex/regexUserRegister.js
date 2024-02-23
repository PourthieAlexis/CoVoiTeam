export const USER_NAME =
  /^[a-zäâéèë]+[ \-\']?[[a-zäâéèë]+[ \-\']?]*[a-zäâéèë]+$/i;
export const USER_PHONE = /^0[6-7]([.]?[0-9]{2}){4}$/;
export const USER_PASSWORD =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{12,}$/;
export const ADDRESS_NUMBER = /^[0-9]{1,}$/;
export const ADDRESS_STREET =
  /^[a-zéèë]+[ \-\']?[[a-zéèë]+[ \-\']?]*[a-zéèë]+$/i;
export const ADDRESS_ZIPCODE = /^[0-9]{5}$/;
export const ADDRESS_CITY = /^[a-zéèë]+[ \-\']?[[a-zéèë]+[ \-\']?]*[a-zéèë]+$/i;
export const ADDRESS_COUNTRY =
  /^[a-zéèë]+[ \-\']?[[a-zéèë]+[ \-\']?]*[a-zéèë]+$/i;
