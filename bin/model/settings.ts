export class Settings {
    private _sortDate?: boolean;
    private _sortSize?: boolean;
    private _sortAlphabet?: boolean;
    private _sortType?: boolean;

    constructor(sortDate: boolean, sortSize: boolean, sortAlphabet: boolean, sortType: boolean) {
        this._sortDate = sortDate;
        this._sortSize = sortSize;
        this._sortAlphabet = sortAlphabet;
        this._sortType = sortType;
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

    get sortType(): boolean {
        return <boolean>this._sortType;
    }

    set sortType(value: boolean) {
        this._sortType = value;
    }
}

export const SettingsDefaults: Settings = {
    sortType: true,
    sortDate: false,
    sortSize: false,
    sortAlphabet: false
};
