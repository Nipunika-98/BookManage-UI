import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-form',
  imports: [],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.css'
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

  ngOnInit(): void {
    this.bookId = +this.route.snapshot.paramMap.get('id')!;
    if (this.bookId) {
      this.bookService.getBookById(this.bookId).subscribe((book) => {
        this.bookForm.patchValue(book);
      });
    }
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      const bookData: Book = { id: this.bookId || 0, ...this.bookForm.value };
      this.bookService.createEditBook(bookData).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}