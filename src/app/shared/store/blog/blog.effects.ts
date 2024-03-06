import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { MasterService } from "../../master.service";
import { LOAD_BLOG, addBlog, addBlogSuccess, deleteBlog, deleteBlogSuccess, loadBlogFail, loadBlogSuccess, updateBlog, updateBlogSuccess } from "./blog.actions";
import { EMPTY, catchError, exhaustMap, map, of } from "rxjs";
import { BlogModel } from "./blog.model";

@Injectable()
export class BlogEffects {
  constructor(private action$: Actions,
    private service: MasterService) {

  }

  _blog = createEffect(()=> 
    this.action$.pipe(
      ofType(LOAD_BLOG),
      exhaustMap((action) => {
        console.log("getAllBlogs2");
        return this.service.getAllBlogs().pipe (
          map((data) => {
            console.log("effects::", data);
            return loadBlogSuccess({blogList: data});
          }),
          //catchError(() => EMPTY)
          catchError((_error) => of(loadBlogFail({errorText: _error})))
        )
      })
    )
  );

  _addBlog = createEffect(() => 
      this.action$.pipe(
        ofType(addBlog),
        exhaustMap(actions => {
          return this.service.createBlog(actions.blogInput).pipe(
            map((data) => {
              return addBlogSuccess({blogInput: data as BlogModel})
            }),
            catchError((_error) => of(loadBlogFail({errorText: _error})))
          )
        })

      )
  )

  _updateBlog = createEffect(() => 
      this.action$.pipe(
        ofType(updateBlog),
        exhaustMap(actions => {
          return this.service.updateBlog(actions.blogInput).pipe(
            map((data) => {
              console.log("Update Blog Effect", actions.blogInput);
              return updateBlogSuccess({blogInput: actions.blogInput})
            }),
            catchError((_error) => of(loadBlogFail({errorText: _error})))
          )
        })

      )
  )

  _deleteBlog = createEffect(() => 
      this.action$.pipe(
        ofType(deleteBlog),
        exhaustMap(actions => {
          return this.service.deleteBlog(actions.id).pipe(
            map((data) => {
              return deleteBlogSuccess({id: actions.id})
            }),
            catchError((_error) => of(loadBlogFail({errorText: _error})))
          )
        })

      )
  )



}