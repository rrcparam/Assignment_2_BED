import {
  createDocument,
  getDocumentById,
  updateDocument,
  deleteDocument,
} from "../api/v1/repositories/firestoreRepository";

jest.mock("../../config/firebaseConfig", () => ({
  db: {
    collection: jest.fn(() => ({
      add: jest.fn().mockResolvedValue({ id: "mock-id" }),
      doc: jest.fn(() => ({
        get: jest.fn().mockResolvedValue({ exists: true, data: () => ({ name: "Test" }) }),
        set: jest.fn().mockResolvedValue(undefined),
        update: jest.fn().mockResolvedValue(undefined),
        delete: jest.fn().mockResolvedValue(undefined),
      })),
      get: jest.fn().mockResolvedValue({
        docs: [{ id: "mock-id", data: () => ({ name: "Test" }) }],
      }),
    })),
  },
}));

describe("Firestore Repository (AAA Pattern)", () => {
  const collectionName = "branches";

  it("should create a document", async () => {

    // Arrange
    const newBranch = { name: "AAA Branch" };

    // Act
    const id = await createDocument(collectionName, newBranch);

    // Assert

    expect(id).toBe("mock-id");
  });


  it("should get a document by ID", async () => {
    // Arrange
    const id = "mock-id";

    // Act
    const result = await getDocumentById(collectionName, id);

    // Assert
    expect(result).toHaveProperty("name", "Test");
  });

  it("should update a document", async () => {

    // Arrange
    const id = "mock-id";
    const updateData = { name: "Updated Branch" };

    // Act
    const result = await updateDocument(collectionName, id, updateData);

    // Assert
    expect(result).toBe(true);
  });

  it("should delete a document", async () => {

    // Arrange
    const id = "mock-id";

    // Act
    const result = await deleteDocument(collectionName, id);

    // Assert
    
    expect(result).toBe(true);
  });
});
