export class Settings {
    _sortDate;
    _sortSize;
    _sortAlphabet;
    constructor(sortDate, sortSize, sortAlphabet) {
        this._sortDate = sortDate;
        this._sortSize = sortSize;
        this._sortAlphabet = sortAlphabet;
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
}
export const SettingsDefaults = {
    sortDate: false,
    sortSize: false,
    sortAlphabet: false
};
//# sourceMappingURL=settings.js.map