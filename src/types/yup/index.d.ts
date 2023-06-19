declare module 'yup' {
  interface StringSchema {
    CPFCNPJ(cpfErrorMsg: string, cnpjErrorMsg: string): StringSchema;
    CEP(ceErrorMsg: string): StringSchema;
  }
}

// export const string: StringSchema
