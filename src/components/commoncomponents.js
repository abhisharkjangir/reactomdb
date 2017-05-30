import React, {Component} from 'react';

class Header extends Component{
  render(){
    return (
      <div className="header">
        <ul>
          {this.props.menuItems.map(menu => <li key={menu.id}><a href={menu.link}>{menu.name}</a></li>)}
        </ul>
      </div>
    );
  }
}

class LeftPart extends Component {
  constructor(props) {
    super(props);
    this.state = {value: '',movies :[]};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
    this.props.searchFun(event.target.value);
  };

  render(){
    const style = {
      textAlign : "center",
      verticalAlign : "middle",
      display : "table-cell"
    }

    return(
      <div className="left-part">
        <div style={style}>
          <input className="input-box" name="Search" value={this.state.value} type="text" placeholder="E.g. Batman" onChange={this.handleChange} />
        </div>
      </div>
    )
  }
}
class RightPart extends Component {
  render(){
    const style = {
      card : {
        border : "1px solid #4d4d4d",
        width : '50%',
        display : "inline-block"
      },
      image: {
        display : "block",
        width : "100%",
        height : "auto"
      }
    }

    return(
      <div className="right-part">
        <div className="movie-listing">
          {/* {this.props.data.length > 0 ? 'Search result': 'No Data Found!' }
          {this.props.data.map(movie =>
            <div style={style.card}>
              {movie.Poster != 'N/A'?<img src={movie.Poster} style={style.image} /> : <img style={style.image} src="https://cdn.shopify.com/s/files/1/1086/5806/t/7/assets/noimage.jpg?15641361903102762456" />}
              <p>{movie.Title}</p>
              <p>{movie.Type}</p>
              <p>{movie.Year}</p>
            </div>
          )} */}

          <div className="card-wrapper">
          	<div className="card-columns">
              {this.props.data.map(movie =>
                <div key={movie._id} className="pin">
                  {movie.Poster != 'N/A'?<img src={movie.Poster} /> : <img src="https://cdn.shopify.com/s/files/1/1086/5806/t/7/assets/noimage.jpg?15641361903102762456" />}
                  <div className="card-detail">
                    <p>{movie.Title}</p>
                    <p><strong>Type:</strong> {movie.Type}</p>
                    <p><strong>Year:</strong> {movie.Year}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* <ul >
            {this.props.data.map(movie =>
              <li key={movie._id}>
                <div className="card">
                  {movie.Poster != 'N/A'?<img src={movie.Poster} /> : <img src="https://cdn.shopify.com/s/files/1/1086/5806/t/7/assets/noimage.jpg?15641361903102762456" /> }
                  <span>{movie.Title}</span><br/>
                  <span>Type : {movie.Type}</span><br/>
                  <span>Year : {movie.Year}</span><br/>
                </div>
              </li>
            )}
          </ul> */}
        </div>
      </div>
    )
  }
}

class Container extends Component {

  constructor() {
    super();
    this.state = {movies :[],searchTerm : ''};
    this.searchMovie = this.searchMovie.bind(this);
  }

  searchMovie = (term) => {
    this.setState({movies: []});
    let url = "http://localhost:9000/db/movie/search/" + term;
    fetch(url)
     .then(response => response.json())
     .then(x => {
       if (x.data.length > 0) {
         this.setState({movies: x.data});
       }else {
         this.setState({movies: []});
       }
     });
  }

  render(){
    return (
      <div className="row">
        <LeftPart searchTerm={this.state.searchTerm} searchFun={this.searchMovie}/>
        <RightPart data={this.state.movies}/>
      </div>
    )
  }
}

class InputBox extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
   this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert(this.state.value);
  }

  render() {
    return (
      <input className={this.props.inputClass} name={this.props.labelName} value={this.state.value} type="text" placeholder={this.props.placeholderText} onChange={this.handleChange} />
    );
  }
}

class Btn extends Component {
  render() {
    return (
      <button  className={this.props.btnClass} type="button" >{this.props.btnText}</button>
    );
  }
}

class Span extends Component {
  render(){
    return (
      <span>{this.props.spanText}</span>
    );
  }
}

export {Container,Header,InputBox, Btn, Span}
