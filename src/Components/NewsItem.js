import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
    let {title,heading,imageUrl,newsUrl,author,date_published,sources}=this.props;

    return (
      <div className='my-3'>
       <div className="card" ><span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:'90%',  zindex:'1',fontSize:'14px'}}>
    {sources}
  </span>
        <img src={!imageUrl?"https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2024/02/isro-1708843771.jpg":imageUrl} className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{heading}</p>
          <p className="card-text"><small className="text-body-secondary">By {!author?"Unknown":author} on {new Date(date_published).toISOString()}</small></p>
    
          <a href={newsUrl} target="_blank" rel="noopener" className="btn btn-sm btn-dark">Read more</a>
      </div>
</div>
      </div>
    )
  }
}

export default NewsItem
