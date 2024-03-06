import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { BlogModel, Blogs } from '../../shared/store/blog/blog.model';
import { getBlog, getBlogInfo } from '../../shared/store/blog/blog.selectors';
import { AppStateModel } from '../../shared/store/global/app-state.model';
import { MatDialog } from '@angular/material/dialog';
import { AddblogComponent } from '../addblog/addblog.component';
import { deleteBlog, loadBlog } from '../../shared/store/blog/blog.actions';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {
  blogList!: BlogModel[];
  blogInfo!: Blogs;

  constructor(private store: Store<AppStateModel>,
    private dialog: MatDialog) {

  }

  ngOnInit() {
    this.store.dispatch(loadBlog());
    this.store.select(getBlogInfo).subscribe(data => {
      this.blogInfo = data;
      console.log(this.blogInfo);
    });
  }

  AddBlog() {
    this.OpenPopup(0, "Add Blog");
  }

  editBlog(blogId: number) {
    this.OpenPopup(blogId, "Edit Blog", true);
  }

  deleteBlog(blogId: number) {
    if (confirm("Are you sure want to remove?")) {
      this.store.dispatch(deleteBlog({ id: blogId }));
    }
  }

  OpenPopup(blogId: number, title: any, isEdit: boolean = false) {
    this.dialog.open(AddblogComponent, {
      width: '40%',
      data: {
        title: title,
        blogId: blogId,
        isEdit: isEdit
      }
    });
  }
}
