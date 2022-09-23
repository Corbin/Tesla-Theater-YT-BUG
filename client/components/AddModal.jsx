import React, {useState} from 'react';
import axios from 'axios';
function AddModal ({func, update}) {
  const [name, setName] = useState('');
  const [url, setURL] = useState('');
  const [imageurl, setImageURL] = useState('');
  const [category, setCategory] = useState('Streaming');
  const style = {
    position: 'fixed',
    backgroundColor: 'rgb(231, 231, 231)',
    left: '38%',
    top: '25%',
    width: '385px',
    height: '351px',
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

  return (
      <div className="Modal" style={style}>
      <label>Name</label>
      <input name="Name" id="Name" required type="text" onChange={(e) => setName(e.target.value)} style={inputStyle}/>
      <label>URL</label>
      <input name="URL" id="URL" required type="text" onChange={(e) => setURL(e.target.value)} style={inputStyle}/>
      <label>ImageURL</label>
      <input name="ImageURL" id="ImageURL" required type="text" style={inputStyle} onChange={(e) => setImageURL(e.target.value)}/>
  {/* <select name="Category" id="Category" required style={{textAlign: 'center', ...inputStyle}} onChange={(e) => setCategory(e.target.value)}>
      <option value="Gaming">Gaming</option>
      <option value="Streaming">Streaming</option>
      <option value="Browsing">Browsing</option>
</select> */}
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
