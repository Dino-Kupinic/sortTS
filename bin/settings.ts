export interface Settings {
    sortDate?: boolean;
    sortSize?: boolean;
    sortAlphabet?: boolean;
}

export const SettingsDefaults: Settings = {
    sortDate: false,
    sortSize: false,
    sortAlphabet: false
}