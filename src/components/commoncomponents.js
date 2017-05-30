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
    this.state = {search: '',year :'',type:'',poster:''};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (stateKey) => (event) => {
    this.setState({
      [stateKey]: event.target.value
    },function(){
      let filter = {
        search : this.state.search,
        year : this.state.year,
        type:this.state.type,
        poster : this.state.poster
      };
      this.props.searchFun(filter);
    });
  };

  render(){
    const style = {
      textAlign : "center",
      verticalAlign : "middle",
      display : "table-cell"
    };
    const input = {marginBottom:"15px"};
    const yearList = [];
    const currentYear = new Date().getFullYear();
    for (var i = currentYear; i >= 1900; i--) {
      yearList.push(i);
    }
    return(
      <div style={this.props.leftPartStyle} className="left-part">
        <div style={style}>
          <h1>OMDB-Filter</h1>
          <input style={input} className="input-box" name="Search" value={this.state.search} type="text" placeholder="E.g. Batman" onChange={this.handleChange('search')} autoFocus="true" /><br/>
          <select placeholder="Select Type" onChange={this.handleChange('type')}>
            <option value="">Select Type</option>
            <option value="movie">Movie</option>
            <option value="series">Series</option>
          </select>
          <select placeholder="Select Year" onChange={this.handleChange('year')}>
            <option value="">Select Year</option>
            {yearList.map(yr => <option key={yr} value={yr}>{yr}</option>)}
          </select>
          <select placeholder="Poster" onChange={this.handleChange('poster')}>
            <option value="">Poster</option>
            <option value="a">Available</option>
            <option value="n">Not Available</option>
          </select>
        </div>
      </div>
    )
  }
}
class RightPart extends Component {
  constructor() {
    super();
    this.state = {search: '',year :'',type:'',poster:''};
    // this.getMovieDetail = this.getMovieDetail.bind(this);
  }

 getMovieDetail(imdbID){
   console.log(imdbID);
}

  render(){
    // const movie = {Title : "Test"};
    return(
      <div style={this.props.rightPartStyle} className="right-part">
        <div className="movie-listing">
          <div className="card-wrapper">
          	<div className="card-columns">
              {this.props.data.map(movie =>
                <div key={movie._id} className="pin">
                  {movie.Poster !== 'N/A'?<img src={movie.Poster} onClick={() => this.getMovieDetail(movie.imdbID)}  alt=''/> : <img src="https://cdn.shopify.com/s/files/1/1086/5806/t/7/assets/noimage.jpg?15641361903102762456" onClick={() => this.getMovieDetail(movie.imdbID)} alt='' />}
                  <div className="card-detail">
                    <p>{movie.Title}</p>
                    <p><strong>Type:</strong> {movie.Type}</p>
                    <p><strong>Year:</strong> {movie.Year}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* <DetailOverlay className="detail-overlay" movie={movie} style="display:none"/> */}
      </div>
    )
  }
}

class DetailOverlay extends Component {

  render(){
    return (
      <div >
        {this.props.movie.Title}
      </div>
    )
  }
}

class Container extends Component {

  constructor() {
    super();
    this.state = {movies :[],
      filer : {
        search : '',
        year : '',type:''
      },
      leftPartCss : {
        width: '100%',
        float : "left"
      },
      rightPartCss : {
      width: '0%',
      float : "right"
      }
    };
    this.searchMovie = this.searchMovie.bind(this);
  }

  searchMovie = (filter) => {
    let url = "http://192.168.30.62:9000/db/movie/search/" + filter.search;
    if (filter.type) {
      url = url + '?type=' + filter.type;
    }
    if (filter.year) {
      if (filter.type) {
        url = url + '&year=' + filter.year;
      }else {
        url = url + '?year=' + filter.year;
      }
    }
    if (filter.poster) {
      if (filter.type || filter.year) {
        url = url + '&poster=' + filter.poster;
      }else {
        url = url + '?poster=' + filter.poster;
      }
    }
    fetch(url)
     .then(response => response.json())
     .then(x => {
       if (x.data.length > 0) {
         this.setState({movies: x.data});
       }else {
         this.setState({movies: []});
       }
       if (this.state.movies.length > 0) {
         this.setState({leftPartCss : {
           transition : "width ease .2s",
           width: '50%',
           float : "left"
         },rightPartCss : {
           transition : "width ease .2s",
         width: '50%',
         float : "right"
         }});
       }else {
         this.setState({leftPartCss : {
           transition : "width ease .2s",
           width: '100%',
           float : "left"
         },rightPartCss : {
           transition : "width ease .2s",
         width: '0%',
         float : "right"
         }});
       }
     });

  };

  render(){
    return (
      <div className="row">
        <LeftPart leftPartStyle={this.state.leftPartCss} searchTerm={this.state.filer} searchFun={this.searchMovie}/>
        <RightPart rightPartStyle={this.state.rightPartCss} data={this.state.movies}/>
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
