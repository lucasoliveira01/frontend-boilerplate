declare module '*.jpg';
declare module '*.png';
declare module '*.jpeg';
declare module '*.webp';
declare module '*.gif';
declare module '*.svg';
declare module 'yup' {
  interface StringSchema {
    CPFCNPJ(cpfErrorMsg: string, cnpjErrorMsg: string): StringSchema;
    CEP(ceErrorMsg: string): StringSchema;
  }
}
