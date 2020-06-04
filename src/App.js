import React, { Component } from 'react';
import './App.css';
import TodoItem from './components/TodoItem';
import checkAllImg from './images/check-complet.svg';
import logo from './images/logo.png';

class App extends Component {

  constructor() {
    let storeList;

    let localStore = localStorage.getItem('Data');
    if (localStore) {
      storeList = JSON.parse(localStorage.getItem('Data'));
    }else{
      storeList = [];
      localStorage.setItem('Data', JSON.stringify([]));
    }

    super();
    this.state = {
      newItems : '',
      currentFilter : 'all',
      todoList : storeList
    };

    this.completeAll = this.completeAll.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onFilter = this.onFilter.bind(this);
    this.onClear = this.onClear.bind(this);
  }

  onCompleteClick(item){
    return (event) => {
      const isComplete = item.isComplete;
      const { todoList } = this.state;
      const index = todoList.indexOf(item);

      this.setState({
        todoList: [
          ...todoList.slice(0, index),
          {
            ...item, isComplete : !isComplete
          },
          ...todoList.slice(index + 1)
        ]
      }, () => {
        localStorage.setItem('Data', JSON.stringify(this.state.todoList));
      })
      
    }
  }

  completeAll() {

    const { todoList } = this.state;
    let list = [];

    for (let i = 0; i < todoList.length; i++) {
      list.push({title : todoList[i].title, isComplete: true });
    }

    this.setState({
      todoList: list
    }, () => {
      localStorage.setItem('Data', JSON.stringify(this.state.todoList));
    })
  }

  onKeyUp(event) {
    const { todoList } = this.state;
    let text = event.target.value.trim();
    if (event.keyCode === 13 && text!== '') {
      this.setState({
        newItems: '',
        todoList: [
          {title: text},
          ...todoList
        ]
      }, function () {
        localStorage.setItem('Data', JSON.stringify(this.state.todoList));
      })
    }
    
  }

  onChange(event) {
    this.setState({
      newItems : event.target.value
    })
  }

  onFilter(event) {
    this.setState({
      currentFilter : event.target.name
    })
  }

  onRemove(item) {
    return(event) => {
      const { todoList } = this.state;
      const index = todoList.indexOf(item);

      console.log(index);
      
      this.setState({
        todoList: [
          ...todoList.slice(0, index),
          ...todoList.slice(index + 1)
        ]
      }, () => {
        localStorage.setItem('Data', JSON.stringify(this.state.todoList));
      })
    }
  }

  onClear(event) {
    this.setState({
      todoList: []
    }, () => {
      localStorage.setItem('Data', JSON.stringify(this.state.todoList));
    })
  }

  render() {

    const { todoList, newItems, currentFilter } = this.state;

    let filterTodo = todoList;

    if (currentFilter === 'active') {
      filterTodo = todoList.filter(list => !list.isComplete);
    }else if (currentFilter === 'completed'){
      filterTodo = todoList.filter(list => list.isComplete);
    }


    return (
      <div className="App">
        
        <div className="box">

          <div className="logo">
            <img src={logo} />
          </div>

          <div className="header">
            <img onClick={this.completeAll} src={checkAllImg} />
            <input value={newItems} onChange={this.onChange} onKeyUp={this.onKeyUp} type="text" name="todo" placeholder="Enter work ...."/>
          </div>

          <div className="body">
            {
              filterTodo.length > 0 && filterTodo.map(
                (item, index) => <TodoItem 
                  key={index} 
                  item={item}
                  onCompleteClick={this.onCompleteClick(item)}
                  onRemove={this.onRemove(item)} />
              )
            }
            {
              filterTodo.length === 0 && 'Nothing here'
            }
          </div>

          <div className="info">
            <span>{todoList.filter( obj => obj.isComplete).length} Completed</span>
            <button id={ (currentFilter === 'all') ? 'active-click' : ''} name="all" onClick={this.onFilter}>All</button>
            <button id={ (currentFilter === 'active') ? 'active-click' : ''} name="active" onClick={this.onFilter} >Active</button>
            <button id={ (currentFilter === 'completed') ? 'active-click' : ''} name="completed" onClick={this.onFilter} >Completed</button>
            <button onClick={this.onClear}>Clear</button>
          </div>
        </div>

      </div>
    );
  }
}

export default App;
