export default class Coords {
    constructor(public lat: number, public lon: number) {
    }

    static get Empty() {
        return new Coords(0, 0)
    }
}
