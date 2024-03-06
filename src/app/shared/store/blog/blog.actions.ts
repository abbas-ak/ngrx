import { createAction, props } from "@ngrx/store";
import { BlogModel } from "./blog.model";

export const LOAD_BLOG_SUCCESS = '[blog page] load blog success';
export const LOAD_BLOG_FAIL = '[blog page] load blog fail';
export const LOAD_BLOG = '[blog page] load blog';

export const ADD_BLOG = '[blog page] add blog';
export const ADD_BLOG_SUCCESS = '[blog page] add blog success';

export const UPDATE_BLOG = '[blog page] update blog';
export const UPDATE_BLOG_SUCCESS = '[blog page] update blog success';
export const DELETE_BLOG = '[blog page] delete blog';
export const DELETE_BLOG_SUCCESS = '[blog page] delete blog success';

export const loadBlog = createAction(LOAD_BLOG);
export const loadBlogSuccess = createAction(LOAD_BLOG_SUCCESS, props<{blogList: BlogModel[]}>());
export const loadBlogFail = createAction(LOAD_BLOG_FAIL, props<{errorText: string}>());

export const addBlog = createAction(ADD_BLOG, props<{blogInput: BlogModel}>());
export const addBlogSuccess = createAction(ADD_BLOG_SUCCESS, props<{blogInput: BlogModel}>());

export const updateBlog = createAction(UPDATE_BLOG, props<{blogInput: BlogModel}>());
export const updateBlogSuccess = createAction(UPDATE_BLOG_SUCCESS, props<{blogInput: BlogModel}>());

export const deleteBlog = createAction(DELETE_BLOG, props<{id: number}>());
export const deleteBlogSuccess = createAction(DELETE_BLOG_SUCCESS, props<{id: number}>());