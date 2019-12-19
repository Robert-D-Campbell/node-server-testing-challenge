const Users = require("./usersModel.js");
const db = require("../data/dbConfig.js");

describe("users model", function() {
  beforeEach(async () => {
    await db("users").truncate();
  });

  describe("insert()", function() {
    it("should insert the user to the database", async function() {
      await Users.insert({ name: "Gillfoyl" });
      const users = await db("users");
      expect(users).toHaveLength(1);
    });
    it("should insert two different users to the database", async function() {
      await Users.insert({ name: "Steven" });
      await Users.insert({ name: "Leonard" });

      const multiUsers = await db("users");
      expect(multiUsers).toHaveLength(2);
      expect(multiUsers[1].name).toBe("Leonard");
    });
  });
});

describe("users model", function() {
  beforeEach(async () => {
    await db("users").truncate();
  });

  describe("remove()", function() {
    it("should remove a user form the database", async function() {
      await Users.insert({ name: "Trump" });
      await Users.remove(1);

      const users = await db("users");
      expect(users).toHaveLength(0);
    });

    it("should not remove user that doesnt exist", async function() {
      await Users.insert({ name: "Bill" });
      await Users.insert({ name: "Bob" });
      await Users.remove(3);

      const multiUsers = await db("users");
      expect(multiUsers).toHaveLength(2);
    });
  });
});
