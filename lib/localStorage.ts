const TOKEN_KEY = "user-token";

export const authStorage = {
  setToken(token: string) {
    if (typeof window === "undefined") return;
    localStorage.setItem(TOKEN_KEY, token);
  },

  getToken() {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN_KEY);
  },

  removeToken() {
    if (typeof window === "undefined") return;
    localStorage.removeItem(TOKEN_KEY);
  },
};

const SECTION_STORAGE_KEY = "draftSections";
export const sectionStorage = {
  setSections(data: any) {
    if (typeof window === "undefined") return;
    localStorage.setItem(SECTION_STORAGE_KEY, JSON.stringify(data));
  },

  getSections() {
    if (typeof window === "undefined") return null;
    const data = localStorage.getItem(SECTION_STORAGE_KEY);

    if (!data) return null;

    const parsedData = JSON.parse(data);

    return parsedData;
  },

  removeSections() {
    if (typeof window === "undefined") return;
    localStorage.removeItem(SECTION_STORAGE_KEY);
  },
};
