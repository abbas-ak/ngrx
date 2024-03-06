import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppStateModel } from '../../shared/store/global/app-state.model';
import { BlogModel } from '../../shared/store/blog/blog.model';
import { addBlog, updateBlog } from '../../shared/store/blog/blog.actions';
import { getBlogById } from '../../shared/store/blog/blog.selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-addblog',
  templateUrl: './addblog.component.html',
  styleUrl: './addblog.component.css'
})
export class AddblogComponent {
  pageTitle = '';
  editBlogId = 0;
  editData!:BlogModel;
  selectSubscription$!: Subscription;

  constructor(private dialogRef: MatDialogRef<AddblogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private builder: FormBuilder,
    private store: Store<AppStateModel>) {

  }

  blogForm = this.builder.group({
    id: this.builder.control(0),
    title: this.builder.control('', Validators.required),
    description: this.builder.control('', Validators.required)
  });

  ngOnInit() {
    console.log(this.data);
    this.pageTitle = this.data?.title;
    if(this.data?.isEdit) {
      this.editBlogId = this.data.blogId;
      this.selectSubscription$ = this.store.select(getBlogById(this.editBlogId)).subscribe(data => {
        //if(!data?.id) { return; }
        this.editData = data;
        this.blogForm.setValue({
          id: this.editData.id,
          title: this.editData.title,
          description: this.editData.description
        });
      });
    }
  }

  saveBlogs() {
    if(this.blogForm.valid) {
      const _blogInput: BlogModel = {
        id: 0,
        title: this.blogForm.value.title as string,
        description: this.blogForm.value.description as string
      };
      if(this.data.isEdit) {
        _blogInput.id = this.blogForm.value.id as number;
        this.store.dispatch(updateBlog({blogInput: _blogInput}));
      } else {
        this.store.dispatch(addBlog({blogInput: _blogInput}));
      }
      
      this.closePopup();
    }
  }

  closePopup() {
    this.dialogRef.close();
  }
  ngOnDestroy() {
    if(this.selectSubscription$) this.selectSubscription$.unsubscribe();
  }
}
