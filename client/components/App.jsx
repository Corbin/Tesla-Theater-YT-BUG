import React, {useEffect, useState} from 'react';
import AddModal from './AddModal.jsx';
import axios from 'axios';
function App () {
  const [data, setData] = useState(undefined);
  const [fullScreenTrue, setFullscreen] = useState(false);
  const [Update, setUpdatedState] = useState({});
  const [Type, setViewType] = useState('Home');

  useEffect(() => {
    axios.get('/Sites')
    .then(({data}) => setData(data))
  }, [fullScreenTrue, Update]);

  console.log(fullScreenTrue)
  const [modalVisible, setModalVisible] = useState(false);
  const ItemStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    placeContent: 'center flex-start',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  }

  const ModalStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  }
  const ImgStyle = {
    maxWidth: '300px',
    maxHeight: '160px'
  }
  return (
    <>
    <div className="navBar">
    <ul className="navigation" style={
      {
        listStyleType: 'none',
        padding: '0px',
        overflow: 'hidden',
        backgroundColor: 'rgb(51, 51, 51)',
        display: 'flex',
        flexDirection: 'row',
        color: 'white',
        alignItems: 'center',
        justifyContent: 'space-around'
      }
    }>
      <li style={{display: 'flex', flexDirection: 'd'}}>
        <p>Fullscreen?</p>
        <input type="checkbox" id="fullScreen" name="fullScreen" value="FullScreen" onChange={(e) => setFullscreen(e.target.checked)}/>
      </li>
      <li onClick={() => setViewType('Home')}>Home</li>
      <li onClick={()=> setViewType('Gaming')}>Gaming</li>
      <li onClick={()=> setViewType('Streaming')}>Streaming</li>
      <li onClick={()=> setViewType('Browsing')}>Browsing</li>
    </ul>
    </div>
    <div className="Container">
      {modalVisible && <AddModal func={setModalVisible} update={setUpdatedState}></AddModal>}
      <div className="Items" style={ItemStyle}>
      <div className="Add Item" onClick={() => setModalVisible(true)}>
      </div>

      {data && data.map(data => {
        let goodToGo = false;
        if(Type === 'Streaming'){
          if(data.category === 'Streaming') {
            goodToGo = true;
          } else {
            goodToGo = false;
          }
        } else if (Type === 'Gaming') {
          if(data.category === 'Gaming'){
            goodToGo = true;
          } else {
            goodToGo = false;
          }
        }
        else if(Type === 'Browsing'){
          if(data.category === 'Browsing') {
            goodToGo = true;
          } else {
            goodToGo = false;
          }
        }
        else if (Type === 'Home') {
          goodToGo = true;
        }
      if(goodToGo){
        return <a href={fullScreenTrue ? "https://www.youtube.com/redirect?q=" + data.url : data.url} id={data.name}>
      <figure>
        <img style={ImgStyle} src={data.imageurl}></img>
      </figure>
    </a>
      }
      })}
	  {/* <a href="https://hbomax.com/">
	    <figure>
	      <img style={ImgStyle} src="https://www.abettertheater.com/hbomax.gif"/>
	    </figure>
	  </a>
	  <a href="http://youtube.com">
    <figure>
	      <img style={ImgStyle} src="https://www.abettertheater.com/youtube.jpg"/>
	    </figure>
	  </a>
	  <a href="http://www.hulu.com/">
    <figure>
	      <img style={ImgStyle} src="https://www.abettertheater.com/hulu.jpg"/>
	    </figure>
	  </a>
	  <a href="https://netflix.com/">
    <figure>
	      <img style={ImgStyle} src="https://www.abettertheater.com/netflix.jpg"/>
	    </figure>
	  </a>
	  <a href="http://www.twitch.com">
    <figure>
	      <img style={ImgStyle} src="https://www.abettertheater.com/twitch.gif"/>
	    </figure>
	  </a>
	  <a href="http://www.disneyplus.com">
    <figure>
	      <img style={ImgStyle} src="https://www.abettertheater.com/disney.jpg"/>
	    </figure>
	  </a>

    <a href="https://stadia.google.com/u/1/library">
      <figure>
        <img style={ImgStyle} src="https://help.bungie.net/hc/article_attachments/360069178592/Stadia.jpg"></img>
      </figure>
    </a>

    <a href="https://play.rainway.com/">
      <figure>
        <img style={ImgStyle} src="https://i.imgur.com/IoXJ9Ct.png"></img>
      </figure>
    </a>

    <a href="https://www.xbox.com/en-US/play/">
      <figure>
        <img style={ImgStyle} src="https://i.imgur.com/3o9PhVb.png"></img>
      </figure>
    </a>



    <a href="https://google.com">
      <figure>
        <img style={ImgStyle} src="https://i.imgur.com/kawIwuv.png"></img>
      </figure>
    </a>

    <a href="https://raptus.site">
      <figure>
        <img style={ImgStyle} src="https://i.imgur.com/sqTuUKh.png"></img>
      </figure>
    </a> */}






      </div>



    </div>
  </>
  )
}
export default App