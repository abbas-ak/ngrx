import { createReducer, on } from "@ngrx/store";
import { BlogState } from "./blog.state";
import { addBlog, addBlogSuccess, deleteBlog, deleteBlogSuccess, loadBlog, loadBlogFail, loadBlogSuccess, updateBlog, updateBlogSuccess } from "./blog.actions";
import { BlogModel } from "./blog.model";

const _blogReducer = createReducer(BlogState, 
  on(loadBlog, (state) => {
    return {
      ...state
    };
  }),
  on(loadBlogSuccess, (state, action) => {
    console.log("action::", action.blogList);
    return {
      ...state,
      blogList: [...action.blogList],
      errorMessage: ''
    };
  }),
  on(loadBlogFail, (state, action) => {
    return {
      ...state,
      blogList: [],
      errorMessage: action.errorText
    };
  }),
  /* on(addBlog, (state, action) => {
    const _blog = { ...action.blogInput };
    _blog.id = state.blogList.length + 1;
    return {
      ...state,
      blogList: [...state.blogList, _blog]
    };
  }), */
  on(addBlogSuccess, (state, action) => {
    const _blog = { ...action.blogInput };
    return {
      ...state,
      blogList: [...state.blogList, _blog]
    };
  }),
  /* on(updateBlog, (state, action) => {
    const _blog = { ...action.blogInput };
    const updatedBlog = state.blogList.map(blog => {
      return _blog.id == blog.id?_blog:blog;
    });
    return {
      ...state,
      blogList: updatedBlog
    };
  }), */
  on(updateBlogSuccess, (state, action) => {
    const _blog = { ...action.blogInput };
    const updatedBlog = state.blogList.map(blog => {
      return _blog.id == blog.id?_blog:blog;
    });
    return {
      ...state,
      blogList: updatedBlog
    };
  }),
  /* on(deleteBlog, (state, action) => {
    const updatedBlog = state.blogList.filter((blog: BlogModel) => {
      return blog.id != action.id;
    });
    return {
      ...state,
      blogList: updatedBlog
    };
  }), */
  on(deleteBlogSuccess, (state, action) => {
    const updatedBlog = state.blogList.filter((blog: BlogModel) => {
      return blog.id != action.id;
    });
    return {
      ...state,
      blogList: updatedBlog
    };
  }),
)

export function blogReducer(state: any, action: any){
  return _blogReducer(state, action);
}