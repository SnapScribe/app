import { shuffle, sample } from "../app/utils/helpers"

describe("helpers", () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  test("shuffle deterministically shuffles array", () => {
    const randomSpy = jest
      .spyOn(Math, "random")
      .mockReturnValueOnce(0.1)
      .mockReturnValueOnce(0.2)
      .mockReturnValueOnce(0.3)

    const arr = [1, 2, 3, 4]
    const result = shuffle(arr)

    expect(result).toEqual([2, 3, 4, 1])
    expect(arr).toEqual([1, 2, 3, 4])
    expect(randomSpy).toHaveBeenCalledTimes(3)
  })

  test("sample deterministically selects element", () => {
    jest.spyOn(Math, "random").mockReturnValue(0.75)
    const arr = ["a", "b", "c", "d"]
    expect(sample(arr)).toBe("d")
  })
})
