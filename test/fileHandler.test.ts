import {getFileDate, getFileSizeInByte, getFileSizeInKiloByte, getFileType} from "../bin/fileHandler"
import {describe, test, expect} from "vitest"

describe("fileHandler", () => {
  // Test reading filetype

  test("exampleword.docx has docx filetype", async () => {
    expect(await getFileType(__dirname + "/files/exampleword.docx")).toBe("docx")
  })

  test("exampleword.pdf has pdf filetype", async () => {
    expect(await getFileType(__dirname + "/files/examplepdf.pdf")).toBe("pdf")
  })

  test("examplefile.txt has txt filetype", async () => {
    expect(await getFileType(__dirname + "/files/examplefolder/examplefile.txt")).toBe("txt")
  })

  test("rawfile has no filetype", async () => {
    expect(await getFileType(__dirname + "/files/rawfile")).toBe("")
  })

  test("examplefolder has no filetype", async () => {
    expect(await getFileType(__dirname + "/files/examplefolder")).toBe("")
  })

  // Test reading date

  test("exampleword.docx was modified on Friday", async () => {
    expect(await getFileDate(__dirname + "/files/exampleword.docx", "day")).toBe("Fri")
  })

  test("exampleword.pdf was modified in May", async () => {
    expect(await getFileDate(__dirname + "/files/examplepdf.pdf", "month")).toBe("May")
  })

  test("examplefile.txt was modified in 2023", async () => {
    expect(await getFileDate(__dirname + "/files/examplefolder/examplefile.txt", "year")).toBe("2023")
  })

  // Test reading size

  test("rawfile is 4 bytes", async () => {
    expect(await getFileSizeInByte(__dirname + "/files/rawfile")).toBe("4")
  })

  test("exampleword.docx is 11942 bytes", async () => {
    expect(await getFileSizeInByte(__dirname + "/files/exampleword.docx")).toBe("11942")
  })

  test("exampleword.docx is 11.942 kilobytes", async () => {
    expect(await getFileSizeInKiloByte(__dirname + "/files/exampleword.docx")).toBe("11.942")
  })

})

