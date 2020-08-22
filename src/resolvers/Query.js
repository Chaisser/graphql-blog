import userQuery from "./query/user";
import categoryQuery from "./query/category";
import postQuery from "./query/post";
import commentQuery from "./query/comment";

const Query = {
  ...userQuery,
  ...categoryQuery,
  ...postQuery,
  ...commentQuery,
};

export default Query;
