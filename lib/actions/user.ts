import User from "../models/Users";
import { connectToDB } from "../mongodb/mongoose";

export const createUser = async (
  id: string,
  first_name: string,
  last_name: string,
  image_url: string,
  email_addresses: { email_address: string }[],
) => {
  try {
    await connectToDB();

    const user = await User.findOneAndUpdate(
      { clerkId: id },
      {
        $set: {
          firstName: first_name,
          lastName: last_name,
          email: email_addresses[0]?.email_address,
          profilePhoto: image_url,
        },
      },
      {
        upsert: true,
        new: true,
      }
    );

    return user;
  } catch (error) {
    console.error("Error creating/updating user:", error);
  }
};

export const deleteUser = async (id: string) => {
  try {
    await connectToDB();
    await User.findOneAndDelete({ clerkId: id });
    console.log(`User with Clerk ID ${id} deleted successfully.`);
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};
