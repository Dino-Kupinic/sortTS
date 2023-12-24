export class Settings {
    _sortDate;
    _sortSize;
    _sortAlphabet;
    _sortType;
    constructor(sortDate, sortSize, sortAlphabet, sortType) {
        this._sortDate = sortDate;
        this._sortSize = sortSize;
        this._sortAlphabet = sortAlphabet;
        this._sortType = sortType;
    }
    get sortDate() {
        return this._sortDate;
    }
    set sortDate(value) {
        this._sortDate = value;
    }
    get sortSize() {
        return this._sortSize;
    }
    set sortSize(value) {
        this._sortSize = value;
    }
    get sortAlphabet() {
        return this._sortAlphabet;
    }
    set sortAlphabet(value) {
        this._sortAlphabet = value;
    }
    get sortType() {
        return this._sortType;
    }
    set sortType(value) {
        this._sortType = value;
    }
}
export const SettingsDefaults = {
    sortType: true,
    sortDate: false,
    sortSize: false,
    sortAlphabet: false,
};
//# sourceMappingURL=settings.js.map