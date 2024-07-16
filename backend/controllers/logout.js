const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ msg: "Logged out successfully" });
      } catch (error) {
        console.error("Error logging out:", error);
        res.status(500).send("Server Error");
      }
}

export default logout;