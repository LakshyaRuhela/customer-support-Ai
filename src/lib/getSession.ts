import { cookies } from "next/headers";
import { scalekit } from "./scalekit";

export async function getSession() {
  //  get token from cookies
  const session = await cookies();
  const token = session.get("access_token")?.value;
  //   console.log(token);
  if (!token) {
    return null;
  }
  try {
    // verify token result get the curr user
    const result: any = await scalekit.validateToken(token!);
    // console.log(result);
    // get th euser ID from the scalekit token
    const user = await scalekit.user.getUser(result.sub);
    return user; // return user to get user by this function anywhwere
  } catch (err) {
    console.log(err);
    return null;
  }
}
