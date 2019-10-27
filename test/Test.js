contract('TESTING', async (accounts) => {

    before(async() => {
      console.log(accounts[0])
    });

    describe("Test Describe", async() => {
      it("Test it", async () => {
        assert.equal(true, true, "did not pass")
      });
  });
});
