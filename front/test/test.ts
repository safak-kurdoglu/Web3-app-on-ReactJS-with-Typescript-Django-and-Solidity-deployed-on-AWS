const assert = require("assert");
const { isCollision } = require("../src/containers/game/isCollision.ts");

describe('Does the game work', () => {
    it('Confirm no collision', () => {
        const birdRect = {left: 50, top: 50, right: 70, bottom: 60}
        const pipeRect = {left: 50, top: 50, right: 70, bottom: 60}
        const actual = isCollision(birdRect, pipeRect)
        const expect  = true
        assert.equal(actual,expect)
    })

    it('Confirm collision', () => {
        const birdRect = {left: 50, top: 50, right: 70, bottom: 60}
        const pipeRect = {left: 20, top: 50, right: 40, bottom: 70}
        const actual = isCollision(birdRect, pipeRect)
        const expect  = false
        assert.equal(actual,expect)
    })

})