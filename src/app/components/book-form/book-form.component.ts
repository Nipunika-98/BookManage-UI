import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormsModule,ReactiveFormsModule,Validators } from '@angular/forms';
import { ActivatedRoute,Router, RouterModule } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { CommonModule } from '@angular/common';
import { first } from 'rxjs';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.css',
  imports: [RouterModule, CommonModule, FormsModule,ReactiveFormsModule]
})
export class BookFormComponent implements OnInit { 
  bookForm: FormGroup;
  bookId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      isbn: ['', Validators.required],
      publicationDate: ['', Validators.required],
    });
  }

  // ngOnInit(): void {
  //   this.bookId = +this.route.snapshot.paramMap.get('id')!;
  //   if (this.bookId) {
  //     this.bookService.getBookById(this.bookId).subscribe((book) => {
  //       console.log(book);
  //       this.bookForm.patchValue(book);
  //     });
  //   }
  // }
  ngOnInit(): void {
    this.bookId = +this.route.snapshot.paramMap.get('id')!;
    if (this.bookId) {
      // console.log("book form oninit")
      this.bookService.getBookById(this.bookId).pipe(first()).subscribe((book) => {
        console.log(book);
        
        const formattedDate = this.formatDate(book.publicationDate);
        this.bookForm.patchValue({
          ...book,
          publicationDate: formattedDate, 
        });
      });
    }
  }
  
 
  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  

  onSubmit(): void {
    if (this.bookForm.valid) {
      const bookData: Book = { id: this.bookId || 0, ...this.bookForm.value };
      this.bookService.createEditBook(bookData).pipe(first()).subscribe(() => {
        // console.log("book form onsubmit")
        this.router.navigate(['/']);
      });
    }
  }
}