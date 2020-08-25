import userMutation from "./mutation/user";
import categoryMutation from "./mutation/category";
import postMutation from "./mutation/post";
import contentMutation from "./mutation/content";
import commentMutation from "./mutation/comment";
import photoMutation from "./mutation/photo";
const Mutation = {
  ...userMutation,
  ...categoryMutation,
  ...postMutation,
  ...contentMutation,
  ...commentMutation,
  ...photoMutation,
};

export default Mutation;
