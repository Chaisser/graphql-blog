import userQuery from "./query/user";
import categoryQuery from "./query/category";
import postQuery from "./query/post";
import commentQuery from "./query/comment";
import contentQuery from "./query/content";
const Query = {
  ...userQuery,
  ...categoryQuery,
  ...postQuery,
  ...contentQuery,
  ...commentQuery,
};

export default Query;
