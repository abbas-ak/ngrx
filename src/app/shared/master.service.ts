import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductModel } from '../model/product.model';
import { BlogModel } from './store/blog/blog.model';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http:HttpClient) { }

  getAll() {
    return this.http.get<ProductModel>('/api/products/');
  }

  haveaccess() {
    return true;
  }

  getAllBlogs():Observable<BlogModel[]> {
    console.log("master service");
    return this.http.get<BlogModel[]>('http://localhost:3000/Blogs');
  }

  createBlog(blogInput: BlogModel) {
    return this.http.post('http://localhost:3000/Blogs', blogInput).pipe(
      tap(() => {
        this.http.get<BlogModel>('http://localhost:3000/Blogs?_limit=1&_sort=id&_order=desc');
      })
    );
  }

  updateBlog(blogInput: BlogModel) {
    return this.http.put(`http://localhost:3000/Blogs/${blogInput.id}`, blogInput);
  }

  deleteBlog(blogId: number) {
    return this.http.delete(`http://localhost:3000/Blogs/${blogId}`);
  }

  
}
