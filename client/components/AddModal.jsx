import React, {useState} from 'react';
import axios from 'axios';
import SerpApi from 'google-search-results-nodejs';
function AddModal ({func, update}) {
  const [name, setName] = useState('');
  const [url, setURL] = useState('');
  const [imageurl, setImageURL] = useState('');
  const [category, setCategory] = useState('Streaming');
  const [images, setImages] = useState({});
  const [imageSearchEnabled, setSearchActive] = useState(true);

  const style = {
    position: 'fixed',
    backgroundColor: 'rgb(231, 231, 231)',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '385px',
    minHeight: '385px',
    maxHeight: '512px',
    inlineSize: 'max-content',
    display: 'flex',
    flexDirection: 'column',
    placeContent: 'center',
    alignItems: 'center'
  };
  const inputStyle = {
    width: '350px',
    margin: '10px'
  }
  const buttonStyle = {
    width: '170px',
    height: '30px',
    margin: '0px 5px'
  }

  const panelBtnStyle = {
    padding: '10px',
    marginRight: '10px',
    marginLeft: '10px'
  }

  const urlCheck = (input) => {
    let url = input;
    if (!url.includes('http://')) {
      url = 'http://' + input;
      if (!url.includes('www.')) {
        url = 'http://www.' + input;
      }
    } else {
      if (!url.includes('www.')) {
        url = 'http://www.' + input.split('http://')[1];
      }
    }
    setImageURL(url);
  }

  const executeImgSearch = (query) => {
    //CORS Bypass
    const config = {
      headers: {
        Authorization: process.env.AUTHORIZATION,
        'Target-URL': 'https://serpapi.com/search',
      },
      params: {
        q: query,
        tbm: 'isch',
        ijn: 0,
        num: 100,
        api_key: process.env.API_KEY
      }

    }
    axios.get('http://localhost:3000', config)
    .then(({data}) => setImages(data))
    .catch(error => console.log(error));

  }

  return (
      <div className="Modal" style={style}>
      <label>Name</label>
      <input name="Name" id="Name" placeholder="Enter the name of the service" required type="text" onChange={(e) => setName(e.target.value)} style={inputStyle}/>
      <label>URL</label>
      <input name="URL" id="URL" placeholder="E.g. www.hulu.com, http://hulu.com, hulu.com" required type="text" onChange={(e) => setURL(e.target.value)} style={inputStyle}/>
      <label>{imageSearchEnabled ? 'Thumbnail Search Query' : 'ImageURL'}</label>
      {imageSearchEnabled ?
        <>
        <div className="search-panel">
            <input name="ImageURL" id="ImageURL" required="" type="text" placeholder="Enter image query, e.g. Hulu Logo" onChange={(e) => setImageURL(e.target.value)}/>
            <button style={panelBtnStyle} onClick={() => executeImgSearch(imageurl)}>Search</button>
        </div>
        <div className="search-results">
            { Object.keys(images).length > 0 && images.images_results.map(image => <img className="search-result-image" onClick={(e) => {
                setImageURL(image.original);
                [...document.getElementsByClassName('search-result-image checked')].forEach(checkedImage => checkedImage.className = 'search-result-image');
                e.target.className += " checked";
                }}key={image.position} src={image.original}/>)}
          </div>
        </>
      : <input name="ImageURL" id="ImageURL" placeholder="Enter image's url, e.g. https://i.imgur.com/image.png" required type="text" style={inputStyle} onChange={(e) => urlCheck(e.target.value)}/>
      }
<p style={{
    fontSize: '13px',
    color: '#056cf7',
    textDecoration: 'underline',
    cursor: 'pointer',
}}
 onClick={() => setSearchActive(!imageSearchEnabled)}>{imageSearchEnabled ? 'Manually Enter Image URL' : 'Search for an image instead'}</p>
<fieldset onChange={(e) => setCategory(e.target.value)}>
    <legend>Select a Category:</legend>
      <input type="radio" id="Streaming" name="Category" value="Streaming" defaultChecked/>
      <label htmlFor="Streaming">Streaming</label>
      <input type="radio" id="Gaming" name="Category" value="Gaming"/>
      <label htmlFor="Gaming">Gaming</label>
      <input type="radio" id="Browsing" name="Category" value="Browsing"/>
      <label htmlFor="Browsing">Browsing</label>
</fieldset>
    <div className="buttons">
    <button style={buttonStyle} onClick={() => (axios.post('/Sites', {name, url, imageurl, category}), update({name, url, imageurl, category}))}>Add</button>
    <button style={buttonStyle} onClick={()=> func(false)}>Close</button>
    </div>
      </div>
  )

}

export default AddModal;

