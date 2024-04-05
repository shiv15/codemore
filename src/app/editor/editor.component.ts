import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CodeJar } from 'codejar';
import { withLineNumbers } from 'codejar/linenumbers.js';
import * as Prism from 'prismjs';
import 'prismjs/components/prism-json';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements AfterViewInit {

  codeJar: CodeJar;

  @ViewChild('editor') editor: ElementRef;
  ngAfterViewInit() {
    const highlightMethod = (editor: HTMLElement) => {
      // Do something with code and set html.
      const highlighted = Prism.highlight(
        editor.textContent ?? "start",
        Prism.languages['json'],
        'json'
      );
      editor.innerHTML = highlighted;
    };

    this.codeJar = CodeJar(
      this.editor.nativeElement,
      withLineNumbers(highlightMethod),
      { tab: '\t' }
    );
    const testCode = "Here lies the code editor!";
    this.codeJar.updateCode(testCode);
  }

}
