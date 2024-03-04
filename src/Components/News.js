import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {
  static defaultProps={
    country:'in',
    pageSize: 8,
    category:'general'
  }
  static propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string

  }

  constructor() {
    super();
    console.log("Hello I am a Constructor")
    this.state = {
      articles: [],
      loading: false,
      page: 1

    }

  }
 async updatenew(){
  const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=367da58aab024241a8ea44ddeeb16d53&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  this.setState({loading:true});
  let data = await fetch(url);
  
  let parseddata = await data.json();
  console.log(parseddata);
  this.setState({ articles: parseddata.articles , totalresult: parseddata.totalResults,loading:false})

 }
  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=367da58aab024241a8ea44ddeeb16d53&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    
    let parseddata = await data.json();
    console.log(parseddata);
    this.setState({ articles: parseddata.articles , totalresult: parseddata.totalResults,loading:false})
  }

  handleNextclick= async()=>{
    
  console.log("Next Click");
  // if(this.state.page+1 > Math.ceil(this.state.totalresult/this.props.pageSize)){
   
  // }else{
  //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=367da58aab024241a8ea44ddeeb16d53&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
  //   this.setState({loading:true});
  //   let data = await fetch(url);
    
  //   let parseddata = await data.json();
  //   console.log(parseddata);
   
  // this.setState({
  // page : this.state.page+1,
  // articles: parseddata.articles,
  // loading:false
  // })
  // }
this.setState({page:this.state.page+1});
 this.updatenew();


 }
  handlePreviousclick= async ()=>{
  console.log("Previous  Click");
  // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=367da58aab024241a8ea44ddeeb16d53&page=${this.state.page-1}&pagesize=${this.props.pageSize}`;
  // this.setState({loading:true});  
  // let data = await fetch(url);
  //   let parseddata = await data.json();
  //   console.log(parseddata);
  // this.setState({
  // page : this.state.page-1,
  // articles: parseddata.articles,
  // loading:false
  
  // })
  this.setState({page:this.state.page-1})
 this.updatenew();

 
 }

  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center' style={{margin:'35px 0px'}}>India News - Top Headlines </h1>
        {this.state.loading && <Spinner/>}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title ? element.title : ""} heading={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author}  date_published={element.publishedAt} sources={element.source.name}/>
            </div>
          })}
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-primary" onClick={this.handlePreviousclick}> &larr;Previous</button>
        <button disabled={this.state.page+1 > Math.ceil(this.state.totalresult/this.props.pageSize)} type="button" className="btn btn-primary" name='nextbtn' onClick={this.handleNextclick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
