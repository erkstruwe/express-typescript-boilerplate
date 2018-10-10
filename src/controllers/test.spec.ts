import {testController} from "./test"

describe("test controller", () => {
    describe("testController function", () => {
        beforeEach(function() {
            this.req = {query: {}}
            this.res = jasmine.createSpyObj(["json"])
            this.next = jasmine.createSpy()
        })
        it("should send something", function() {
            testController(this.req, this.res, this.next)
            expect(this.res.json).toHaveBeenCalledWith({something: true})
        })
        it("should continue with error if error parameter is set", function() {
            this.req.query.error = true
            testController(this.req, this.res, this.next)
            expect(this.res.json).not.toHaveBeenCalled()
            expect(this.next.calls.count()).toBe(1)
            expect(this.next.calls.mostRecent().args[0] instanceof Error).toBe(true)
        })
    })
})
