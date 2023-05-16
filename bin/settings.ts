export class Settings {
    private _sortDate?: boolean;
    private _sortSize?: boolean;
    private _sortAlphabet?: boolean;

    constructor(sortDate: boolean, sortSize: boolean, sortAlphabet: boolean) {
        this._sortDate = sortDate;
        this._sortSize = sortSize;
        this._sortAlphabet = sortAlphabet;
    }

    get sortDate(): boolean {
        return <boolean>this._sortDate;
    }

    set sortDate(value: boolean) {
        this._sortDate = value;
    }

    get sortSize(): boolean {
        return <boolean>this._sortSize;
    }

    set sortSize(value: boolean) {
        this._sortSize = value;
    }

    get sortAlphabet(): boolean {
        return <boolean>this._sortAlphabet;
    }

    set sortAlphabet(value: boolean) {
        this._sortAlphabet = value;
    }
}

export const SettingsDefaults: Settings = {
    sortDate: false,
    sortSize: false,
    sortAlphabet: false
};