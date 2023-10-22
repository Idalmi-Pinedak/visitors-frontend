export const TOKEN_NAME = 'clinic_token';

export const STORE_REDIRECT_LOCAL_STORAGE_KEY = 'store_redirect';

export const DATE_DD_MM_YYYY_FORMAT = 'dd/MM/yyyy';

export const DATE_TIME_DD_MM_YYYY_HH_MM_SS_FORMAT = 'dd/MM/yyyy HH:mm:ss';
export const DATE_TIME_DD_MM_YYYY_HH_MM_FORMAT = 'dd/MM/yyyy HH:mm';

// numero de telefono de 8 caracteres
export const PHONE_NUMBER_PATTERN = '^[0-9]{8}$';

export const DPI_PATTERN = '^[0-9]{13}$';

export const MONTHS = new Map<number, string>([
  [1, 'Enero'],
  [2, 'Febrero'],
  [3, 'Marzo'],
  [4, 'Abril'],
  [5, 'Mayo'],
  [6, 'Junio'],
  [7, 'Julio'],
  [8, 'Agosto'],
  [9, 'Septiembre'],
  [10, 'Octubre'],
  [11, 'Nobiembre'],
  [12, 'Diciembre'],
]);

export function replaceSpecialCharacteres(str: string): string {
  if (!str) {
    return '';
  }

  return str
    .replace('á', 'a')
    .replace('é', 'e')
    .replace('í', 'i')
    .replace('ó', 'o')
    .replace('ú', 'u');
}

export function searchByLowerCaseText(text: string, search: string): boolean {
  if (!text || !search) {
    return false;
  }
  return replaceSpecialCharacteres(text)
    .toLowerCase()
    .indexOf(replaceSpecialCharacteres(search).toLowerCase()) > -1;
}
