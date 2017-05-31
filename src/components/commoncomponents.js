import React, {Component} from 'react';
import InfiniteScroll from 'react-infinite-scroller';

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
    this.state = {search: '',year :'',type:'',poster:'',view : {detail :false,list : true},movie :{}};
    this.closeDetailView = this.closeDetailView.bind(this);
  }

  getMovieDetail(movie){
    this.setState({movie : movie,view : {detail :true}},function () {

    });
  }

  closeDetailView(){
    this.setState({view : {detail :false}},function () {

    });
  };

  render(){
    return(
      <div style={this.props.rightPartStyle} className="right-part">
        <div className="movie-listing">
            <div className="card-wrapper">
              <div className="card-columns">
                {this.props.data.map(movie =>
                  <div key={movie._id} className="pin">
                    {movie.Poster !== 'N/A'?<img src={movie.Poster} onClick={() => this.getMovieDetail(movie)}  alt=''/> : <img src="https://cdn.shopify.com/s/files/1/1086/5806/t/7/assets/noimage.jpg?15641361903102762456" onClick={() => this.getMovieDetail(movie)} alt='' />}
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
        {this.state.view.detail?<DetailOverlay  movie={this.state.movie} closeFun={this.closeDetailView} /> :''}
      </div>
    )
  }
}

class DetailOverlay extends Component {

  render(){
    const movie = this.props.movie;
    const style = {
      left : {float : "left",width:'50%'},
      right : {float : "right",width:'50%'},
      img : {display : 'block',margin : 'auto'}
    };
    return (
      <div className="detail-overlay">
        <div style={style.left}>
          {movie.Poster !== 'N/A'? <img src={movie.Poster} style={style.img}/> : <img src="https://cdn.shopify.com/s/files/1/1086/5806/t/7/assets/noimage.jpg?15641361903102762456" style={style.img}/> }
        </div>
        <div style={style.right}>

          <h1>{movie.Title}</h1><br/>
          <p>Released on : {movie.Released} | Dur : {movie.Runtime} | Language : {movie.Language} | Country : {movie.Country} </p>
          <p>Awards : {movie.Awards} | Metascore : {movie.Metascore} | IMDBRating : {movie.imdbRating} | IMDBVotes : {movie.imdbVotes} </p>
          <p>DVD : {movie.DVD} | BoxOffice : {movie.BoxOffice} | Production : {movie.Production} | Website : {movie.Website} </p>
          <p><strong>Genre - </strong> {movie.Genre}</p>
          <p><strong>Director - </strong> {movie.Director}</p>
          <p><strong>Writer - </strong> {movie.Writer}</p>
          <p><strong>Actors - </strong> {movie.Actors}</p>
          <p><strong>Plot - </strong> {movie.Plot}</p>

        </div>
        <span className="close-detail-view-btn" onClick={this.props.closeFun} >Close </span>
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
        year : '',
        type:'',
        poster : '',
        hasMore : false
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
    this.setState({filter : filter});

    let url = "https://omdbclone.herokuapp.com/db/movie/search/" + filter.search;

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

    if(filter.type || filter.year || filter.poster){
      url = url + '&from=0' + filter.poster + '&limit=50';
    }else {
      url = url + '?from=0' + filter.poster + '&limit=50';
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
