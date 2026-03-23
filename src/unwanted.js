
// Delete a user from the database
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  // console.log(userId);
  try {
    // const user = await User.findByIdAndDelete({_id: userId});
    const user = await User.findByIdAndDelete(userId);
    // console.log(user);
    if (!user) {
      res.status(404).send("User not Found.");
    } else {
      res.send("User deleted successfully.");
    }
  } catch (err) {
    res.status(400).send("Something went wrong.");
  }
});

// Update data of the user
app.patch("/user/:userId", async (req, res) => {
  // console.log("before req.params : ", req.params);
  const userId = req.params?.userId;
  // console.log("userId is :" + userId);
  const data = req.body;
  // console.log("data is : ", data);
  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k),
    );
    if (!isUpdateAllowed) {
      throw new Error("Updates not Allowed.");
    }
    // if(data?.skills.length > 10) {
    //   throw new Error("Skills are not more than 10.");
    // }
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    // console.log(user);
    if (!user) {
      res.status(404).send("User not Found.");
    } else {
      res.send("User updated successfully.");
    }
  } catch (err) {
    // console.log("ERROR IS "+ err);
    res.status(400).send("UPDATE FAILED:" + err.message);
  }
});