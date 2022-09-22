import React, {useState} from 'react';
import axios from 'axios';
function AddModal ({func, update}) {
  const [name, setName] = useState('');
  const [url, setURL] = useState('');
  const [imageurl, setImageURL] = useState('');
  const [category, setCategory] = useState('Gaming');
  const style = {
    position: 'fixed',
    backgroundColor: '#e7e7e7',
    left: '38%',
    top: '25%',
    width: '385px',
    height: '385px',
    inlineSize: 'max-content',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
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

  return (

      <div className="Modal" style={style}>
      <label>Name</label>
      <input name="Name" id="Name" required type="text" onChange={(e) => setName(e.target.value)} style={inputStyle}/>
      <label>URL</label>
      <input name="URL" id="URL" required type="text" onChange={(e) => setURL(e.target.value)} style={inputStyle}/>
      <label>ImageURL</label>
      <input name="ImageURL" id="ImageURL" required type="text" style={inputStyle} onChange={(e) => setImageURL(e.target.value)}/>
      <label>Category</label>
  <select name="Category" id="Category" required style={{textAlign: 'center', ...inputStyle}} onChange={(e) => setCategory(e.target.value)}>
      <option value="Gaming">Gaming</option>
      <option value="Streaming">Streaming</option>
      <option value="Browsing">Browsing</option>
</select>
    <div className="buttons">
    <button style={buttonStyle} onClick={() => (axios.post('/Sites', {name, url, imageurl, category}), update({name, url, imageurl, category}))}>Add</button>
    <button style={buttonStyle} onClick={()=> func(false)}>Close</button>
    </div>
      </div>
  )

}

export default AddModal;
