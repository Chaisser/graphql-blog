import userMutation from "./mutation/user";
import categoryMutation from "./mutation/category";
import postMutation from "./mutation/post";
import contentMutation from "./mutation/content";
import commentMutation from "./mutation/comment";
const Mutation = {
  ...userMutation,
  ...categoryMutation,
  ...postMutation,
  ...contentMutation,
  ...commentMutation,
};

export default Mutation;
