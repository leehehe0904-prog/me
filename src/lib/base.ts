/** public/ 底下的靜態檔（例如 /play/arena/）不會自動加上 basePath，用這個補上 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const withBase = (path: string) => `${BASE_PATH}${path}`;
