import conf from "../conf/conf";

export class AuthService {
  async createAccount({ username, password }) {
    try {
      await fetch(conf.backendUrl, {
        method: "POST",
        body: JSON.stringify({
          username,
          password,
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.message === "Success") {
            alert("You are logged in");
            console.log("redirect to dashboard");
          } else {
            alert("Please check your login information");
          }
        });
    } catch (error) {
      throw error;
    }
  }
}
