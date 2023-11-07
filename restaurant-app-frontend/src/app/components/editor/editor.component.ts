import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import Quill from 'quill';
import { PostService } from 'src/app/services/postService/post.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ContentService } from 'src/app/services/content/content.service';
import { SnackBarService } from 'src/app/services/snackBar/snack-bar.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements AfterViewInit {
  @ViewChild('editor', { static: true }) editorElement: ElementRef;
  private quill!: Quill;
  public isEditorVisible = true;

  constructor(
    private postService: PostService,
    private snackBar: SnackBarService,
    private dialogRef: MatDialogRef<EditorComponent>,
    private contentSharingService: ContentService
  ) {
    this.editorElement = {} as ElementRef;
  }

  ngAfterViewInit(): void {
    this.quill = new Quill(this.editorElement.nativeElement, {
      theme: 'snow',
    });
  }

  submitEditorContent() {
    const content = this.quill.root.innerHTML; // Get the HTML content from the editor
    this.postService.saveContent(content).subscribe((result) => {

      this.snackBar.openSuccessSnackbar(result.message, 'Close');
      this.contentSharingService.updateContent(content); // Update shared content
      setTimeout(() => {
        this.toggleEditorVisibility();
      }, 1000);
    });
    this.dialogRef.close();
  }

  toggleEditorVisibility() {
    this.isEditorVisible = false;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
