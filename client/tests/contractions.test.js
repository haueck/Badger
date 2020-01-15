import contractions from "../components/contractions"
import { mount } from "@vue/test-utils"

describe("Contractions", () => {

    it("should correctly expand \"She can't have it.\"", () => {
      const expanded = mount(contractions).vm.expand("She can't have it.")
      expect(expanded.length).toBe(1)
      expect(expanded).toContain("she cannot have it.")
    })

    it("should correctly expand \"I'm leaving.\"", () => {
      const expanded = mount(contractions).vm.expand("I'm leaving.")
      expect(expanded.length).toBe(1)
      expect(expanded).toContain("i am leaving.")
    })

    it("should correctly expand \"She won't\"", () => {
      const expanded = mount(contractions).vm.expand("She won't")
      expect(expanded.length).toBe(1)
      expect(expanded).toContain("she will not")
    })

    it("should correctly expand \"I shouldn't've done it.\"", () => {
      const expanded = mount(contractions).vm.expand("I shouldn't've done it.")
      expect(expanded.length).toBe(1)
      expect(expanded).toContain("i should not have done it.")
    })

    it("should correctly expand \"y'all'll've y'all y'all'll\"", () => {
      const expanded = mount(contractions).vm.expand("y'all'll've y'all y'all'll")
      expect(expanded.length).toBe(1)
      expect(expanded).toContain("you all will have you all you all will")
    })

    it("should correctly expand \"I hope there's more food\"", () => {
      const expanded = mount(contractions).vm.expand("I hope there's more food")
      expect(expanded.length).toBe(2)
      expect(expanded).toContain("i hope there is more food")
      expect(expanded).toContain("i hope there has more food")
    })

    it("should correctly expand \"He'll or he won't\"", () => {
      const expanded = mount(contractions).vm.expand("He'll or he won't")
      expect(expanded.length).toBe(2)
      expect(expanded).toContain("he will or he will not")
      expect(expanded).toContain("he shall or he will not")
    })

    it("should correctly expand \"How's she doing? She's doing well.\"", () => {
      const expanded = mount(contractions).vm.expand("How's she doing? She's doing well.")
      expect(expanded.length).toBe(6)
      expect(expanded).toContain("how is she doing? she is doing well.")
      expect(expanded).toContain("how has she doing? she is doing well.")
      expect(expanded).toContain("how does she doing? she is doing well.")
      expect(expanded).toContain("how is she doing? she has doing well.")
      expect(expanded).toContain("how has she doing? she has doing well.")
      expect(expanded).toContain("how does she doing? she has doing well.")
    })

  })
