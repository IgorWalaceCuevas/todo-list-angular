import { Component } from '@angular/core';
import { Todo } from 'src/models/todoModel';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent { 
  public mode : String = "List";
  //public todos : any[]; // undefined
  public todos : Todo[] = []; // []
  public title : String = "Lista de Tarefas";

  public form : FormGroup;

  //ctor
  constructor(private fb : FormBuilder) {    
    this.form = this.fb.group({
        title: ['', Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(60),
          Validators.required
        ])]
    });  
    this.Load();  
  }

  Add(){    
    const title = this.form.controls['title'].value;
    const id = this.todos.length + 1;
    this.todos.push(new Todo(id, title, false));
    this.Save();        
    this.Clear();
  }

  Clear(){
    this.form.reset();
  }

  Remove(todo : Todo){
    const index = this.todos.indexOf(todo);
    if(index !== -1){
        this.todos.splice(index, 1);
    }
    this.Save()
  }
  MarkAsDone(todo : Todo){
      todo.done = true;
      this.Save()
  }
  MarkAsUndone(todo : Todo){
    todo.done = false;
    this.Save()
  }

  Save(){
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos',data);
    this.mode = "List";
  }

  Load(){
    const data = localStorage.getItem('todos');
    if (data) {      
        this.todos = JSON.parse(data);
    }else{
      this.todos = [];
    }
  }
  ChangeMode(mode : String){
    this.mode = mode;
  }
}
